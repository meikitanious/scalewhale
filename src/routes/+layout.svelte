<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>
<Header></Header>
<slot />
<Footer></Footer>
<style lang=scss global>
	@import '../app.scss'
</style>
