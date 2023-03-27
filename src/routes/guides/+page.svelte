<script>
export let data
import posthog from 'posthog-js';
import { onMount } from 'svelte';

onMount( () => {
    posthog.capture('$pageview', {
        Title: 'Guides',
        Category: 'Category',
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
        <meta property="og:url" content="https://scalewhale.com/privacy"/>
        <meta property="og:image" content={data.cornerstone.social.image}/>
        <meta property="og:description" content={data.cornerstone.social.desc} />
</svelte:head>

<main class="guides-page">
    <div class="full-width"><h1>Our Guides</h1></div>
    <div class="card-wrapper">
        <ul class="cards">
        {#each data.summaries as {blog, date, tags, author}}
        <li class="card">
            <a class="border" href="/post/{blog.slug}">
                <div class="card-tags">
                    {#each tags.sort() as tag}
                        {#if tag === "Automation"  || tag === "First-party"}
                        <span class="pink accent">{tag}</span>
                        {:else if tag === "Creative"}
                        <span class="red accent">{tag}</span>
                        {:else if tag === "Paid Media" || tag === "GTM"}
                        <span class="orange accent">{tag}</span>
                        {:else}
                        <span class="green accent">{tag}</span>
                        {/if}
                    {/each}
                    </div>
                <span class="h3size">{blog.title}</span>
                <div class="card-footer">
                    <span class="card-footer-author">
                        <img class="card-footer-author-thumbnail" alt={author.pfp.alt} src={author.pfp.src.sm}>
                        <span class="card-footer-author-name">{author.fn + " " + author.ln}</span>
                    </span>
                    <span class="card-footer-date"><time datetime="{date}">{date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0].substring(2)}</time></span>
                </div>
            </a>
        </li>
        {/each}
    </ul>
</div>
</main>
{#if data.pageCount > 1}
<aside class="guide-nav">
    <nav>
        <ul><li><a href="/guides/2"><img alt="Arrow pointing right" src="/ar.svg"></a></li></ul>
    </nav>
</aside>
{/if}
