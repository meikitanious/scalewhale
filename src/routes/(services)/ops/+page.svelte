<script>
    export let data;
    import posthog from 'posthog-js';
    import { onMount } from 'svelte';

onMount( () => {
    posthog.capture('$pageview', {
        Title: 'Operations & Automation',
        Category: 'Cornerstone',
    });
});
</script>
<svelte:head>
    <!--SEO Meta Data-->
    <title>{data.cornerstone.seo.title}</title>
    <meta name="description" content={data.cornerstone.seo.desc}>
    <meta name="keywords" content={data.cornerstone.seo.kw}>
    <!--Social Meta Data-->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:title" content={data.cornerstone.social.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://scalewhale.com/ops"/>
    <meta property="og:image" content={data.cornerstone.social.image}/>
    <meta property="og:description" content={data.cornerstone.social.desc} />
</svelte:head>
<article class="cornerstone">
    <header class="cornerstone-header">
        <div class="header-content">
            <h1>Operations & Automation</h1>
        </div>
    </header>
    <section class="cornerstone-content">{@html data.cornerstone.content}</section>
</article>