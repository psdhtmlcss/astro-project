// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	vite: {
		resolve: {
			alias: {
				'@src': fileURLToPath(new URL('./src', import.meta.url)),
				'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
				'@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
				'@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
				'@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
			},
		},
	},
});
