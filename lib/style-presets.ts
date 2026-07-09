export type StylePreset = {
	slug: string;
	label: string;
	description: string;
	thumbnailPath: string;
	thumbnailAlt: string;
	prompt: string;
};

export const stylePresets: StylePreset[] = [
	{
		slug: "storybook-3d",
		label: "Storybook 3D",
		description:
			"Soft cinematic lighting with polished 3D storybook detail.",
		thumbnailPath: "/storybook-example.png",
		thumbnailAlt: "Storybook 3D preset example",
		prompt: "premium 3D storybook illustration, Pixar-DreamWorks style animated film render, soft volumetric cinematic lighting, warm golden-hour rim light, tactile fabric and skin subsurface scattering, painterly background bokeh, rounded stylized proportions, polished PBR materials, high detail 3D render, octane render quality. Preserve the exact subject identity, facial structure, pose, framing, outfit, and scene layout from the source image — restyle only the rendering, lighting, and material treatment, do not alter composition or add/remove objects.",
	},
	{
		slug: "anime-cel",
		label: "Anime Cel",
		description:
			"Clean cel shading with expressive color and crisp outlines.",
		thumbnailPath: "/anime-cel-example.png",
		thumbnailAlt: "Anime cel preset example",
		prompt: "high-end anime cel-shaded illustration, Kyoto Animation / Makoto Shinkai style, crisp clean line art, flat-to-gradient cel shading with hard shadow edges, vibrant saturated color palette, glossy anime eyes, detailed hair strand shading, studio key-visual quality, sharp vector-clean outlines. Preserve the exact subject identity, pose, composition, outfit details, and background structure from the source image — restyle only linework, shading, and color treatment, do not alter composition or add/remove objects.",
	},
	{
		slug: "clay-render",
		label: "Clay Render",
		description:
			"Handcrafted clay texture with sculpted forms and warm depth.",
		thumbnailPath: "/clay-render-example.png",
		thumbnailAlt: "Clay render preset example",
		prompt: "handcrafted claymation stop-motion render, Aardman-style sculpted clay texture, visible fingerprint and tool-mark imperfections, soft rounded matte forms, warm studio three-point lighting, shallow depth of field, subtle specular highlights on smooth clay surface, macro miniature-set photography look. Preserve the subject identity, silhouette, pose, framing, and key scene details from the source image — restyle only surface material and lighting, do not alter composition or add/remove objects.",
	},
	{
		slug: "pixart",
		label: "Pixart",
		description:
			"Bright, expressive family-animation styling with polished 3D charm.",
		thumbnailPath: "/pixart-example.png",
		thumbnailAlt: "Pixart preset example",
		prompt: "premium family-animation 3D character render, bright expressive Pixar-style stylization, large charming eyes, soft rounded shapes, warm bounce lighting, polished subsurface-scattering skin, saturated cheerful color grading, high-detail animated-film render quality, cinematic depth of field. Preserve the exact subject identity, expression, pose, framing, outfit details, and background structure from the source image — restyle only rendering and materials, do not alter composition or add/remove objects.",
	},
	{
		slug: "voxel-block",
		label: "Voxel Block",
		description:
			"Chunky block-built styling with playful forms and pixel-crafted depth.",
		thumbnailPath: "/voxel-block-example.png",
		thumbnailAlt: "Voxel block preset example",
		prompt: "voxel block-art render, Minecraft-style cubic geometry, chunky low-poly voxel construction, pixel-crafted surface textures, bright saturated game-engine lighting, sharp ambient occlusion between blocks, isometric-friendly clean shading, playful blocky simplification of forms. Preserve the subject identity, pose, framing, outfit details, and major scene structure from the source image — restyle only the geometry and surface treatment into voxels, do not alter composition or add/remove objects.",
	},
	{
		slug: "marble-sculpture",
		label: "Marble Sculpture",
		description:
			"Elegant carved-stone portraiture with refined texture and museum lighting.",
		thumbnailPath: "/marble-sculpture-example.png",
		thumbnailAlt: "Marble sculpture preset example",
		prompt: "classical white marble sculpture, museum-quality carved stone portrait, fine chisel-tool detail, subtle natural grey veining through polished stone, soft directional gallery spotlighting, smooth polished highlights with matte recessed shadows, Renaissance sculptural realism, monochrome stone material only. Preserve the subject identity, pose, framing, and major scene relationships from the source image — restyle only the material into carved marble, do not alter composition or add/remove objects.",
	},
];

export function getStylePreset(slug: string) {
	return stylePresets.find((preset) => preset.slug === slug);
}
