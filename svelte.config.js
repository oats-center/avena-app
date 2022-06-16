import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { isoImport } from 'vite-plugin-iso-import';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ postss: true }),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [isoImport()]
		}
	}
};

export default config;
