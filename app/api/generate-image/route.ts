import {
	countGenerationsSince,
	createGeneration,
	utcMonthStart,
} from "@/db/generations";
import { getMonthlyGenerationLimit } from "@/lib/generation-quota";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import * as Sentry from "@sentry/nextjs";
import { ACCEPTED_SOURCE_IMAGE_MIME_TYPES } from "@/lib/constants";
import { getStylePreset } from "@/lib/style-presets";
import { uploadBufferToImageKit } from "@/lib/imagekit";

export const runtime = "nodejs";

const STABILITY_API_BASE = "https://api.stability.ai";

type GenerateImageRequest = {
	sourceImageUrl?: string;
	sourceMimeType?: string;
	originalFileName?: string;
	styleSlug?: string;
	model?: string;
};

export async function POST(request: Request) {
	const { userId, has } = await auth();

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const apiKey = process.env.STABILITY_API_KEY;
	if (!apiKey) {
		return NextResponse.json(
			{ error: "Missing STABILITY_API_KEY." },
			{ status: 500 },
		);
	}

	const monthlyLimit = getMonthlyGenerationLimit(has);
	const usedThisMonth = await countGenerationsSince(userId, utcMonthStart());

	if (usedThisMonth >= monthlyLimit) {
		Sentry.logger.warn("generation.quota_exceeded", {
			limit: monthlyLimit,
			used: usedThisMonth,
		});

		return NextResponse.json(
			{
				error: `Monthly generation limit reached (${monthlyLimit} images). Upgrade your plan or try again next month.`,
				code: "QUOTA_EXCEEDED" as const,
				limit: monthlyLimit,
				used: usedThisMonth,
			},
			{ status: 429 },
		);
	}

	const body = (await request.json()) as GenerateImageRequest;

	const {
		model,
		originalFileName,
		sourceImageUrl,
		sourceMimeType,
		styleSlug,
	} = body;

	if (!sourceImageUrl) {
		return NextResponse.json(
			{ error: "Please upload an image first." },
			{ status: 400 },
		);
	}

	if (
		typeof sourceMimeType !== "string" ||
		!ACCEPTED_SOURCE_IMAGE_MIME_TYPES.has(sourceMimeType)
	) {
		return NextResponse.json(
			{ error: "Only JPG, PNG, and WEBP files are supported." },
			{ status: 400 },
		);
	}

	if (typeof styleSlug !== "string") {
		return NextResponse.json(
			{ error: "Please choose a style." },
			{ status: 400 },
		);
	}

	if (!model) {
		return NextResponse.json(
			{ error: "Please choose a model." },
			{ status: 400 },
		);
	}

	const preset = getStylePreset(styleSlug);
	if (!preset) {
		return NextResponse.json(
			{ error: "Unknown style preset." },
			{ status: 400 },
		);
	}

	// Fetch the source image
	const imageResponse = await fetch(sourceImageUrl);
	if (!imageResponse.ok) {
		return NextResponse.json(
			{ error: "Could not fetch the uploaded source image." },
			{ status: 404 },
		);
	}

	const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

	const prompt = [
		preset.prompt,
		"Do not add extra people, extra limbs, duplicate subjects, or change the overall camera angle.",
	].join("\n\n");

	try {
		const imageBase64 = await Sentry.startSpan(
			{
				name: `stability image-to-image ${model}`,
				op: "gen_ai.request",
				attributes: {
					"gen_ai.request.model": model,
					"gen_ai.operation.name": "request",
					"gen_ai.request.messages": JSON.stringify([
						{ role: "user", content: prompt },
						{
							role: "user",
							content: "[source image attachment omitted]",
						},
					]),
				},
			},
			async (span) => {
				// Build multipart/form-data for Stability AI v2beta SD3 image-to-image
				const formData = new FormData();
				formData.append("mode", "image-to-image");
				formData.append("model", model);
				formData.append("prompt", prompt);
				formData.append("strength", "0.75"); // how strongly to restyle (0=original, 1=full restyle)
				formData.append("output_format", "png");

				// Attach the source image as a Blob
				const imageBlob = new Blob([imageBuffer], {
					type: sourceMimeType,
				});
				formData.append("image", imageBlob, "source.png");

				const stabilityResponse = await fetch(
					`${STABILITY_API_BASE}/v2beta/stable-image/generate/sd3`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${apiKey}`,
							Accept: "application/json",
						},
						body: formData,
					},
				);

				if (!stabilityResponse.ok) {
					const errText = await stabilityResponse.text();
					throw new Error(
						`Stability AI error ${stabilityResponse.status}: ${errText}`,
					);
				}

				const stabilityData = (await stabilityResponse.json()) as {
					image: string;
					finish_reason?: string;
					seed?: number;
				};

				if (!stabilityData.image) {
					throw new Error(
						"Stability AI did not return an image in the response.",
					);
				}

				span.setAttribute(
					"gen_ai.response.text",
					JSON.stringify([
						"[image/png generated; pixel data not sent to Sentry]",
					]),
				);

				return stabilityData.image; // base64 string
			},
		);

		const resultBuffer = Buffer.from(imageBase64, "base64");

		const { url: resultImageUrl } = await uploadBufferToImageKit({
			buffer: resultBuffer,
			fileName: `${preset.slug}-result.png`,
			folder: `/users/${userId}/results`,
			mimeType: "image/png",
		});

		const savedGeneration = await createGeneration({
			clerkUserId: userId,
			originalFileName:
				typeof originalFileName === "string" ? originalFileName : null,
			sourceImageUrl,
			resultImageUrl,
			styleSlug: preset.slug,
			styleLabel: preset.label,
			model,
			promptUsed: prompt,
		});

		Sentry.logger.info("generation.completed", {
			generationId: savedGeneration.id,
			styleSlug: preset.slug,
			model,
		});

		return NextResponse.json({
			imageBase64,
			mimeType: "image/png",
			promptUsed: prompt,
			style: { slug: preset.slug, label: preset.label },
			model,
			savedGeneration,
		});
	} catch (error) {
		console.error("generate-image route failed", error);

		if (error instanceof Error) {
			return NextResponse.json(
				{
					error:
						error.message ||
						"Image generation failed. Please try again.",
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ error: "Image generation failed. Please try again." },
			{ status: 500 },
		);
	}
}
