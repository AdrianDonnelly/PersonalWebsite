import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
		  allow: [
			'/home/adrian/Documents/Projects/JsSrc',
			'/home/adrian/Documents/Projects/PersonalWebsite/PersonalWebsite' // existing allowed paths
		  ]
		}
	  }
});
