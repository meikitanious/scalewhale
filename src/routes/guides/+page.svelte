<script>
export let data
</script>

<main class="guides-page">
    <div class="full-width"><h1>Our Guides</h1></div>
    <div class="card-wrapper">
        <ul class="cards">
        {#each data.summaries as {blog, date, tags, author}}
        <li class="card">
            <a class="border" href="/post/{blog.slug}">
                <div class="card-tags">
                {#each tags.sort() as tag}
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
