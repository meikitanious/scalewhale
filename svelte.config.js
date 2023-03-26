import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import { imagetools } from 'vite-imagetools'

function applyImageTools() {
	return imagetools({
	  include: '**/*.png',
	  defaultDirectives: new URLSearchParams('w=450&webp'),
	  exclude: '/src/routes/post/**'
	});
  }

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
	],
	plugins: [
		applyImageTools()
	]
};
export default config;
