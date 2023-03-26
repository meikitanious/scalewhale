import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		/*prerender:{
			origin: "https://scalewhale.com/"
		},*/
		adapter: adapter({
					routes: {
						exclude: ['<all>']
				}}), 
	},
	preprocess: [
		preprocess({
			preserve: ['ld+json'],
		})
	]
};
export default config;
