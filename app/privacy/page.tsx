import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Privacy | Lumina Gen",
	description:
		"Learn how Lumina Gen handles uploads, generated images, account data, and privacy choices.",
};

const privacySections = [
	{
		title: "What We Collect",
		body: "Lumina Gen collects the information needed to run the product: account details from sign in, images you upload for restyling, generated outputs, usage events, and payment or plan data handled by our billing provider.",
	},
	{
		title: "How Images Are Used",
		body: "Uploaded images are processed only to create the requested generation, show your history, and help keep the studio reliable. Your images are not sold, and they are not used in public marketing without your permission.",
	},
	{
		title: "Storage And Retention",
		body: "Generated images and related metadata may be stored so you can review your history and continue your workflow. You can remove saved results from your account when available, and we keep operational records only as long as needed for service, security, legal, and billing purposes.",
	},
	{
		title: "Service Providers",
		body: "We use trusted providers for authentication, payment, hosting, storage, analytics, error monitoring, and AI image generation. These providers process data on our behalf so the application can function.",
	},
	{
		title: "Security",
		body: "We use reasonable technical and organizational safeguards to protect account and image data. No online service can guarantee perfect security, so keep your account credentials private and contact us if you notice suspicious activity.",
	},
	{
		title: "Your Choices",
		body: "You can manage your account, plan, and saved outputs through the application. For privacy requests such as access, deletion, or correction, contact the Lumina Gen team with the email connected to your account.",
	},
] as const;

export default function PrivacyPage() {
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
								Privacy Policy
							</h1>
							<p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
								We designed Lumina Gen around a simple promise:
								your creative work should stay focused, private,
								and under your control.
							</p>
						</div>
						<Button asChild className="w-full rounded-full sm:w-auto">
							<Link href="/studio" prefetch={false}>
								Open Studio
							</Link>
						</Button>
					</div>

					<div className="mt-10 grid gap-5 md:grid-cols-2">
						{privacySections.map((section) => (
							<article
								key={section.title}
								className="rounded-[1.5rem] border border-border/60 bg-card/60 p-6"
							>
								<h2 className="text-xl font-semibold tracking-tight text-foreground">
									{section.title}
								</h2>
								<p className="mt-3 text-sm leading-7 text-muted-foreground">
									{section.body}
								</p>
							</article>
						))}
					</div>

					<div className="mt-10 rounded-[1.5rem] border border-border/60 bg-secondary/40 p-6">
						<p className="text-sm leading-7 text-muted-foreground">
							This page is a product-facing privacy summary and
							should be reviewed by your legal counsel before
							being treated as a formal legal policy.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
