import { auth } from "@clerk/nextjs/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

import * as Sentry from "@sentry/nextjs";

// This method will help us get the token, expire, signature details and then they will be used to upload images using this endpoint
export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	Sentry.logger.info("imagekit.upload_auth_issued");

	const { token, expire, signature } = getUploadAuthParams({
		privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_PRIVATE_KEY!,
		publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
	});

	return NextResponse.json({
		token,
		expire,
		signature,
		publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
	});
}
