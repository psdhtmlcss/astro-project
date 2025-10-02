import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const excludesPatterns = [
	'**/[!_]*.{md,mdx}',      // Файлы с одинарным подчеркиванием
	'**/[!__]*.{md,mdx}',     // Файлы с двойным подчеркиванием
];

const excludesPaths = [
	'**/_*',      // Папки с одинарным подчеркиванием
	'**/__*',     // Папки с двойным подчеркиванием
];

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ 
		base: './src/content/blog',
		pattern: excludesPatterns,
		exclude: excludesPaths
	} as any),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heading: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			externalUrl: z.string().optional(),
			modalUrl: z.string().optional(),
			slug: z.string().optional()
		}),
});

export const collections = { blog };
