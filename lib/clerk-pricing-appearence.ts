import { dark } from "@clerk/themes";

/**
 * Dark + brand colors for `<PricingTable />` and billing checkout.
 * Uses Clerk's prebuilt `dark` theme, then overrides variables to match
 * the designbyte emerald theme (see `app/globals.css`).
 *
 * @see https://clerk.com/docs/guides/customizing-clerk/appearance-prop/themes
 * @see https://clerk.com/docs/guides/customizing-clerk/appearance-prop/variables
 */
export const clerkPricingAppearance = {
	theme: dark,
	variables: {
		// Emerald/mint primary — matches --primary in globals.css
		colorPrimary: "oklch(0.8545 0.1675 159.6564)",
		colorPrimaryForeground: "oklch(0 0 0)",
		// Pure-black dark background — matches --background dark
		colorBackground: "oklch(0.1448 0 0)",
		colorForeground: "oklch(0.9551 0 0)",
		// Input surface — matches --input dark
		colorInput: "oklch(0.3523 0 0)",
		colorInputForeground: "oklch(0.9551 0 0)",
		// Neutral muted tone
		colorNeutral: "oklch(0.6731 0 0)",
	},
};
