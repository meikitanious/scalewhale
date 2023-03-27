<script>
    export let data;
    let article, tags, author, seo, social;
    if (data && data.blog && data.blog[0]){
        ({article, tags, author, seo, social} = data.blog[0])
    }
    import posthog from 'posthog-js';
    import { onMount } from 'svelte';

    onMount( () => {
        posthog.capture('$pageview', {
            Title: seo.title,
            Category: 'Blog Post',
            Tags: JSON.stringify(tags)
        });
});
</script>
<svelte:head>
    <!--SEO Meta Data-->
    <title>{seo.title}</title>
    <meta name="description" content={seo.desc}>
    <meta name="keywords" content={seo.kw}>
    <meta name="author" content={author.fn + author.ln}>
    <!--Social Meta Data-->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:title" content={social.title} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={"https://scalewhale.com/post/" + article.slug} />
    <meta property="og:image" content={social.image}/>
    <meta property="og:description" content={social.desc} />
    <meta property="og:article:author" content={author.fn + author.ln} />
    <meta property="og:article:section" content="Growth Marketing" />
</svelte:head>
<article class="post">
    <header class="post-header">
        <div class="header-content">
            <div class="card-tags">
                {#each tags as tag}
                    {#if tag === "Automation"}
                    <span class="pink accent">{tag}</span>
                    {:else if tag === "Creative"}
                    <span class="red accent">{tag}</span>
                    {:else if tag === "Paid Media"}
                    <span class="orange accent">{tag}</span>
                    {:else}
                    <span class="green accent">{tag}</span>
                    {/if}
                {/each}
            </div>
            <h1>{article.title}</h1>
            <h4>{article.desc}</h4>
            <span class="card-footer-date">
                Last updated 
                <time datetime="{article.date}">
                    {article.date.split("-")[1] + "/" + article.date.split("-")[2] + "/" + article.date.split("-")[0].substring(2)}
                </time>
            </span>
        </div>
    </header>
    <section class="post-content">{@html article.content}</section>
    <footer class="post-footer">
        <h2>About the Author</h2>
        <hr>
        <div class="post-author-data">
            <div class="author-data-header">
                <div class="post-author-thumbnail">
                    <img src={author.pfp.src.md} alt={author.pfp.alt} />
                </div>
                <div class="post-author-details">
                    <h3 class="post-author-name">
                        {author.fn + " " + author.ln + " "} 
                        <a class="author-linkedin" href={author.li}>
                            <img alt ="LinkedIn Icon" src="/logos/social/linkedin.svg">
                        </a>
                    </h3>
                    <p>{author.title + " @ " + author.company}</p>
                </div>
            </div>
            <div class="author-data-bio">
                <p>{author.bio}</p>
            </div>
        </div>
    </footer>
</article>