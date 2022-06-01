// import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";
import typescript from '@rollup/plugin-typescript';


// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter()
// 	}
// };

const config = {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
}

export default config


