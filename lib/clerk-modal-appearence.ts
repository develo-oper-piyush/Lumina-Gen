import { dark } from "@clerk/themes";

/**
 * Dark theme for Clerk modals (sign-in, sign-up) that matches the app's color palette.
 * Uses Clerk's prebuilt `dark` theme as a base, then overrides variables to match
 * the designbyte emerald theme from `app/globals.css`.
 *
 * @see https://clerk.com/docs/guides/customizing-clerk/appearance-prop/themes
 * @see https://clerk.com/docs/guides/customizing-clerk/appearance-prop/variables
 */

// Emerald primary — oklch(0.8545 0.1675 159.6564)
const PRIMARY = "oklch(0.8545 0.1675 159.6564)";
const PRIMARY_FG = "oklch(0 0 0)";
const BG = "oklch(0.1448 0 0)";      // --card dark (slightly lighter than pure black)
const FG = "oklch(0.9551 0 0)";      // --foreground dark
const CARD = "oklch(0.1448 0 0)";    // --card dark
const INPUT = "oklch(0.3523 0 0)";   // --input dark
const BORDER = "oklch(0.2138 0.0019 286.2347)"; // --border dark
const MUTED = "oklch(0.2653 0.0037 286.1465)";  // --muted dark
const MUTED_FG = "oklch(0.6731 0 0)";           // --muted-foreground dark
const SECONDARY = "oklch(0.4700 0.0900 160.0079)"; // --secondary dark (green tint)
const ACCENT = "oklch(0.3004 0.0609 159.8938)";    // --accent dark

export const clerkModalAppearance = {
	theme: dark,
	variables: {
		// Primary brand color — emerald green
		colorPrimary: PRIMARY,
		colorPrimaryForeground: PRIMARY_FG,

		// Background and foreground
		colorBackground: BG,
		colorForeground: FG,

		// Card surface
		colorCard: CARD,
		colorCardForeground: FG,

		// Input fields
		colorInput: INPUT,
		colorInputForeground: FG,

		// Secondary
		colorSecondary: SECONDARY,
		colorSecondaryForeground: FG,

		// Muted
		colorMuted: MUTED,
		colorMutedForeground: MUTED_FG,

		// Accent
		colorAccent: ACCENT,
		colorAccentForeground: FG,

		// Borders and ring
		colorBorder: BORDER,
		colorRing: PRIMARY,

		// Typography — Plus Jakarta Sans to match theme
		fontFamily:
			"'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

		// Border radius — matches --radius: 1.4rem
		borderRadius: "1rem",
		borderRadiusSmall: "0.6rem",
		borderRadiusLarge: "1.4rem",
	},
	elements: {
		formButtonPrimary: {
			backgroundColor: PRIMARY,
			color: PRIMARY_FG,
			"&:hover": {
				backgroundColor: "oklch(0.78 0.1675 159.6564)",
			},
			"&:active": {
				backgroundColor: "oklch(0.72 0.1675 159.6564)",
			},
		},
		formButtonReset: {
			backgroundColor: SECONDARY,
			color: FG,
			borderColor: BORDER,
			"&:hover": {
				backgroundColor: "oklch(0.52 0.09 160)",
			},
		},
		card: {
			backgroundColor: CARD,
			borderColor: BORDER,
		},
		headerTitle: {
			color: FG,
			fontFamily:
				"'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
		},
		headerSubtitle: {
			color: MUTED_FG,
		},
		socialButtonsBlockButton: {
			backgroundColor: SECONDARY,
			color: FG,
			borderColor: BORDER,
			"&:hover": {
				backgroundColor: "oklch(0.52 0.09 160)",
			},
		},
		formFieldInput: {
			backgroundColor: INPUT,
			color: FG,
			borderColor: BORDER,
			"&:focus": {
				borderColor: PRIMARY,
				boxShadow: `0 0 0 1px ${PRIMARY}`,
			},
		},
		footerActionLink: {
			color: PRIMARY,
			"&:hover": {
				color: "oklch(0.78 0.1675 159.6564)",
			},
		},
	},
};