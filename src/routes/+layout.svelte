<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { SvelteToast } from '$lib/toast/';
	import posthog from 'posthog-js';
	export let data;
	onMount(async () => {
		posthog.init(data.phAPI, {
    		api_host: data.phHost,
    		capture_pageview:false,
			enable_recording_console_log:true,
			persistence: "localStorage+cookie",
			autocapture: {
				element_allowlist: ['a']
			},
			session_recording: {
				maskAllInputs: false,
				recordCanvas: true
			}
	})});
</script>
<SvelteToast/>
<Header></Header>
<slot />
<Footer></Footer>
<style lang=scss global>
	@import '../app.scss';
</style>
