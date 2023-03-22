<script> 
import Matrix from "$lib/components/matrix.svelte";
export let data;
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const fallbackDestination = form.id;
  fetch(`/api/forms/fallback/${fallbackDestination}`, {
    method: 'POST',
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      // Handle successful response here
      console.log('Form submitted successfully.');
    } else if (response.status === 405) {
      // Handle 405 error here
      console.error('Form submission failed with error 405 Method Not Allowed.');
    } else {
      // Handle other errors here
      console.error(`Form submission failed with error ${response.status}.`);
    }
  }).catch(error => {
    // Handle fetch error here
    console.error(error.message);
  });
}
</script>

<main class="homepage">
    <section id="hero">
        <Matrix size = 15></Matrix>
        <div class="hero-grid">
            <div id="herocontent">
                <h1>Every whale is <br>made of billions <br>of data points</h1>
                <h3>Accelerate your growth<br> with our data focused<br> performance marketing</h3>
                <a class="h3size grow" href="/#contact">Unlock Your Growth</a>
            </div>
            <img src="/images/datawhale.png" alt="datawhale">
        </div>
    </section>
    <h2>Services</h2>
<section id="services">
    <ul><div class="col1">
            <li><a class="h3size border grow" href='/ads'>Paid Media & PPC</a></li>
            <li><a class="h3size border grow" href='/ops'>Ops & Automation</a></li>
        </div>
        <div class="col2">
            <li><a class="h3size border grow" href='/analytics'>Marketing Analytics</a></li>
            <li><a class="h3size border grow" href='/tech'>Technical Marketing</a></li>
        </div></ul>
</section>
    <h2>Guides</h2>
    <section class="homepage-section" id="guides">
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
        <a class="cta grow h3size" href="/guides">See More</a>
    </section>
    <h2>Clients</h2>
    <section id="clients">
        <div class="grid-div">
        <div class="testimonial">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video controls disablePictureInPicture controlsList="nodownload noplaybackrate" class="testimonial-video">
                <source src="https://images.scalewhale.com/jsnow.mp4" type='video/mp4;'/>
            </video>
            <div class="testimonial-caption">
                <h3>Jeff Snow</h3>
                <span class="h4size">
                    <p>Director of Growth &#64;</p>
                    <img class="caption-logo-nzxt" src="logos/clients/nzxt.svg" alt="NZXT"/>
                </span>
            </div>
        </div>
        <div class="gridcontainer">
        <h3>We're proud to <br>have worked with:</h3>
        <div class="logos">
            <a href="https://bloomreach.com">
                <img id="bloomreach" src="/logos/clients/bloomreach.svg" alt="Bloomreach Logo">
            </a>
            <a href="https://nzxt.com">
                <img id="nzxt" src="/logos/clients/nzxt.svg" alt="NZXT logo">
            </a>
            <a href="https://fellowproducts.com">
                <img id="fellow" src="/logos/clients/fellow.svg" alt="Fellow Products Logo">
            </a>
            <a href="https://cushion.ai">
                <img id="cushion" src="/logos/clients/cushion.svg" alt="Cushion Logo">
            </a>
            <a href="https://irl.com">
                <img id="irl" src="/logos/clients/irl.svg" alt="IRL logo">
            </a>
            <a href="https://kyla.com">
                <img id="kyla" src="/logos/clients/kyla.svg" alt="Kyla logo">
            </a>
            <a href="https://outco.io">
                <img id="outco" src="/logos/clients/outco.svg" alt="Outco Logo">
            </a>
        </div>
    </div>
    </div>
    </section>
    <h2>Contact</h2>
    <section id="contact">
        <div class="contact-container">
        <form method="POST" id="contact" action="?/contact" on:submit={handleFormSubmit}>
            <input tabindex="-1" type="text" name="url" id="url" autocomplete="off">
            <div class="contact-line">
                <input type ="text" name="name" id="name" placeholder="Name" autocomplete="name" pattern="^[a-zA-Z]+([ -][a-zA-Z]+)?([ .-][a-zA-Z]+)?$" required>
                <input type ="text" name="company" id="company" placeholder="Company Name" required>
            </div>
            <div class="contact-line">
                <input type ="email" name="email" id="email" placeholder="Business Email" required>
            </div>
            <div class="contact-line">
                <textarea rows="5" name="query" id="query" minlength="10" placeholder="What do you want to talk about?" autocorrect="off"></textarea>
            </div>
            <div class="contact-line">
                <button formmethod="post" type="submit" name="submit" id="submit" class=" h3size grow" formaction="?/contact" required>Unlock Your Growth</button> 
            </div>
        </form>
        <h3>Or email</h3>
        <p class="h3size"><span class="spm-confusion" aria-hidden="true">donotspamme</span> hello<!-- sdfjsdhfkjypcs -->@<!-- sdfjsdhfkjypcs -->scalew<!-- sdfjsdhfkjypcs -->hale<!-- sdfjsdhfkjypcs -->.<!-- sdfjsdhfkjypcs -->com</p>
    </div>
    </section>
</main>