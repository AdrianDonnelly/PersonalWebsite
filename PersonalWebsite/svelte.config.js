import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: staticAdapter({
			pages: 'build', // Directory to output static files
			assets: 'build', // Directory to output static assets
			fallback: null, // Set to '200.html' if you need a fallback for SPA
			strict: true // Ensure all routes are prerendered
		  }),
		  paths: {
			base: '/PersonalWebsite', // Use the appropriate base path if deploying to a subdirectory
		  },
	}
};

export default config;
