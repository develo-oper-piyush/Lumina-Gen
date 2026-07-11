/**
 * Stability AI image generation models supported by Lumina Gen.
 * These use the v2beta Stable Image API (image-to-image mode).
 */
export const stabilityImageModels = [
	"sd3-large-turbo",
	"sd3-large",
	"sd3-medium",
] as const;

export type StabilityImageModel = (typeof stabilityImageModels)[number];

export const stabilityImageModelLabels: Record<StabilityImageModel, string> = {
	"sd3-large-turbo": "SD3 Large Turbo (Fast)",
	"sd3-large": "SD3 Large (Best Quality)",
	"sd3-medium": "SD3 Medium (Balanced)",
};
