import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "FAQs | Lumina Gen",
	description:
		"Answers to common questions about Lumina Gen image restyling, privacy, credits, styles, and exports.",
};

const faqs = [
	{
		question: "What does Lumina Gen do?",
		answer: "Lumina Gen transforms an uploaded image into a polished restyled output using curated visual presets. It is built for high-fidelity transformations that keep the subject and composition recognizable.",
	},
	{
		question: "Do I need to write prompts?",
		answer: "No. The studio is preset-led, so you can choose a style and generate without building a prompt from scratch.",
	},
	{
		question: "What image types can I upload?",
		answer: "Lumina Gen accepts JPEG, PNG, and WebP source images. Clear photos with visible subjects and good lighting usually produce the best results.",
	},
	{
		question: "Are my uploads private?",
		answer: "Your uploads and generated results are handled for your account workflow and are not published publicly by default. See the Privacy page for more detail on how data is handled.",
	},
	{
		question: "Can I use generated images commercially?",
		answer: "Commercial use depends on your plan, source image rights, and any third-party rights in the original image. Make sure you have permission to use the source material you upload.",
	},
	{
		question: "Why did a generation fail?",
		answer: "Failures can happen when an upload is unsupported, the image is too large or unclear, a generation provider is temporarily unavailable, or the request cannot be processed safely. Trying a clearer image often helps.",
	},
	{
		question: "Can I change plans later?",
		answer: "Yes. You can upgrade, downgrade, or manage billing from your account when plan management is available.",
	},
	{
		question: "Where do I find my previous generations?",
		answer: "Open the Studio to review saved generation history and preview previous outputs connected to your account.",
	},
] as const;

export default function FAQsPage() {
	return (
		<main className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
			<section className="section-shell px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-6 border-b border-border/60 pb-10 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl">
							<Link
								href="/"
								className="caps-sm text-sm font-semibold uppercase text-primary transition-colors hover:text-primary/80"
							>
								Lumina Gen
							</Link>
							<h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
								Frequently Asked Questions
							</h1>
							<p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
								Quick answers for creating, saving, and managing
								AI image restyles in Lumina Gen.
							</p>
						</div>
						<Button asChild className="w-full rounded-full sm:w-auto">
							<Link href="/studio" prefetch={false}>
								Start Creating
							</Link>
						</Button>
					</div>

					<div className="mt-10 grid gap-4">
						{faqs.map((faq) => (
							<article
								key={faq.question}
								className="rounded-[1.5rem] border border-border/60 bg-card/60 p-6"
							>
								<h2 className="text-lg font-semibold tracking-tight text-foreground">
									{faq.question}
								</h2>
								<p className="mt-3 text-sm leading-7 text-muted-foreground">
									{faq.answer}
								</p>
							</article>
						))}
					</div>

					<div className="mt-10 flex flex-col gap-3 rounded-[1.5rem] border border-border/60 bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-sm leading-7 text-muted-foreground">
							Still looking for something? The studio is the best
							place to test an image and see how the workflow
							feels.
						</p>
						<Button
							asChild
							variant="outline"
							className="w-full rounded-full sm:w-auto"
						>
							<Link href="/privacy">Privacy Details</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
