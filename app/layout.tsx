import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, IBM_Plex_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { clerkModalAppearance } from "@/lib/clerk-modal-appearence";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
	variable: "--font-serif",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Lumina Gen — AI Image Styling",
	description:
		"Lumina Gen transforms your photos into stunning artistic styles using Stability AI SD3. From Pixar 3D and Anime Cel to Clay Render and Marble Sculpture — upload once, pick a style, and get a gallery-ready result in seconds. Powered by Stable Diffusion 3, Next.js, and ImageKit.",
	keywords: [
		"AI image styling",
		"AI photo transformation",
		"Stability AI",
		"Stable Diffusion 3",
		"SD3",
		"image style transfer",
		"AI art generator",
		"photo to anime",
		"photo to 3D",
		"clay render",
		"Pixar style AI",
		"anime filter",
		"marble sculpture AI",
		"voxel art generator",
		"AI image editor",
		"Next.js AI app",
		"ImageKit",
		"Lumina Gen",
		"generative AI",
		"image restyling",
	],
	authors: [{ name: "Lumina Gen" }],
	creator: "Lumina Gen",
	openGraph: {
		title: "Lumina Gen — AI Image Styling",
		description:
			"Transform your photos into stunning artistic styles using Stability AI SD3. Anime, 3D, Clay, Marble and more.",
		type: "website",
		locale: "en_US",
		siteName: "Lumina Gen",
	},
	twitter: {
		card: "summary_large_image",
		title: "Lumina Gen — AI Image Styling",
		description:
			"Upload a photo, pick a style, get a gallery-ready AI result. Powered by Stability AI SD3.",
		creator: "@luminagen",
	},
	icons: {
		icon: [
			{ url: "/logo.png", type: "image/png" },
		],
		shortcut: "/logo.png",
		apple: "/logo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${plusJakartaSans.variable} ${lora.variable} ${ibmPlexMono.variable} antialiased`}
			>
				<ClerkProvider appearance={clerkModalAppearance}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
						disableTransitionOnChange
					>
						<ThemeToggleButton />
						{children}
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}