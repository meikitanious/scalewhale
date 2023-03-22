import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import { sitemapWrapAdapter } from 'sveltekit-static-sitemap';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		/*prerender:{
			origin: "https://scalewhale.com/"
		},*/
		adapter: sitemapWrapAdapter(
			adapter({
				routes: {
					exclude: ['<all>']
				}}), 
			{
				defaults: {
					lastmod: new Date().toISOString(),
					priority: 0.7,
					chengefreq: "weekly",
				},
				pages: {
					"/": {
						priority: 1,
					},
					"/ads":{
						priority: 0.8,
					},
					"/analytics":{
						priority: 0.8,
					},
					"/ops":{
						priority: 0.8,
					},
					"/tech":{
						priority: 0.8,
					},
					"/privacy":{
						priority: 0.1,
					},
				}
			})
	},
	preprocess: [
		preprocess({
			preserve: ['ld+json'],
		})
	]
};
export default config;
