import StudioWorkbench from "@/components/studio/workbench";
import { Button } from "@/components/ui/button";
import { listUserGenerationSummaries } from "@/db/generations";
import {
	getGenerationQuotaSnapshot,
	MONTHLY_GENERATION_LIMITS,
} from "@/lib/generation-quota";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function StudioPage() {
	let userId: string | null = null;
	let initialHistory: Awaited<ReturnType<typeof listUserGenerationSummaries>> = [];
	let initialQuota: Awaited<ReturnType<typeof getGenerationQuotaSnapshot>> = {
		limit: MONTHLY_GENERATION_LIMITS.free,
		used: 0,
		remaining: MONTHLY_GENERATION_LIMITS.free,
	} as Awaited<ReturnType<typeof getGenerationQuotaSnapshot>>;
	let setupError: string | null = null;

	try {
		const authResult = await auth();
		userId = authResult.userId;
		const { has } = authResult;

		if (userId) {
			[initialHistory, initialQuota] = await Promise.all([
				listUserGenerationSummaries(userId),
				getGenerationQuotaSnapshot(has, userId),
			]);
		}
	} catch (err) {
		console.error("[StudioPage] Setup error:", err);
		setupError =
			err instanceof Error ? err.message : "Studio failed to load.";
	}

	return (
		<main className="studio-shell min-h-screen px-4 py-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-[1440px]">
				<header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
					<Link href="/" className="flex min-w-0 items-center gap-3">
						<span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-visible">
							<Image
								src="/logo.png"
								alt="Lumina Gen"
								width={56}
								height={56}
								className="mt-1 mr-1 max-h-none max-w-none origin-left scale-[1.2] object-cover"
								priority
							/>
						</span>

						<p className="text-3xl font-mono text-primary uppercase font-semibold tracking-wide sm:text-[2.15rem]">
							Lumina Gen
						</p>
					</Link>

					<div className="flex items-center gap-3 self-end sm:self-auto">
						<Button
							variant="outline"
							type="button"
							tabIndex={-1}
							className="studio-pill-strong pointer-events-none rounded-full px-4 py-2 text-sm"
						>
							Studio
						</Button>

						<div className="studio-pill-strong flex items-center justify-center rounded-full border p-1">
							<UserButton />
						</div>
					</div>
				</header>

				{setupError && (
					<div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						<strong>Studio setup error:</strong> {setupError}
						<span className="ml-2 opacity-70">— Check your Vercel environment variables (DATABASE_URL, etc.)</span>
					</div>
				)}

				<StudioWorkbench
					clerkUserId={userId ?? ""}
					initialHistory={initialHistory}
					initialQuota={initialQuota}
				/>
			</div>
		</main>
	);
}

export default StudioPage;
