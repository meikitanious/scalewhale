<script>
export let data;
import Matrix from "$lib/components/matrix.svelte";
import { toast } from '$lib/toast';
import posthog from 'posthog-js';
import { onMount } from 'svelte';

onMount( () => {
    posthog.capture('$pageview', {
        Title: 'Homepage',
        Category: 'Cornerstone',
    });
});

let contactSubmits = 0;

async function contactPost(formData) {
    try {
        const response = await fetch('/api/forms/contact', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            contactSubmits = 1;
            toast.pop();
            toast.push(`✅ Thanks! We'll get back to you ASAP.`)
            const responseData = await response.json();
            const userData = responseData.data;
            posthog.identify(userData.Email);
            posthog.people.set({Email: userData.Email});
            posthog.people.set({FullName: userData.Name});
            posthog.group('company',userData.domain, {
                name: userData.Company
            })
            posthog.capture('Lead Submission', {
                Location: 'Homepage',
                Query: userData.Query
            });
            zaraz.set('Email',userData.Email);
            zaraz.track('Form Submission');
            /* Analytics will fire on this response */
        } else if (response.created) {
            toast.pop();
            toast.push(`🛑 Our server detected you as a bot. If this was an error, email hello@scalewhale.com instead.`, {
                theme: {
                    '--toastBackground': '#FFDEDE',
                }});
            posthog.capture('Bot Detected')
            /* Analytics will not fire on this response */
        } else {
            console.error('Form submission failed:', response.statusText);
            toast.push(`🛑 Server Error - Email hello@scalewhale.com instead`, {
                theme: {
                    '--toastBackground': '#FFDEDE',
                }
            });
            posthog.capture('Form Error',{
                Status: response.statusText
            })
        }
    }
    catch (error) {
        console.error('Form submission failed:', error);
        toast.push(`🛑 Server Error - Email hello@scalewhale.com instead`, {
                theme: {
                    '--toastBackground': '#FFDEDE',
                }
            });
        posthog.capture('Form Error',{
                Location: 'Homepage',
                Status: error
        })
    }
};

async function contactSubmit() {
    const formData = new FormData(this);
    if (contactSubmits === 0){
       contactPost(formData)
    } else {
        const submitAgain = confirm('Do you want to submit again?');
        if (submitAgain) {
            contactSubmits = 0;
            contactPost(formData);
        } else {
            this.reset();
        }
    }
}
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
    <meta property="og:url" content="https://scalewhale.com"/>
    <meta property="og:image" content={data.cornerstone.social.image}/>
    <meta property="og:description" content={data.cornerstone.social.desc} />
</svelte:head>
<main class="homepage">
    <section id="hero">
        <Matrix size = 15></Matrix>
        <div class="hero-grid">
            <div id="herocontent">
                <h1>Every whale is <br>made of billions <br>of data points</h1>
                <h3>Accelerate your growth<br> with our data focused<br> performance marketing</h3>
                <a class="h3size grow" href="/#contact">Unlock Your Growth</a>
            </div>
            <img src="https://images.scalewhale.com/datawhale.webp" alt="datawhale">
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
                            <img class="card-footer-author-thumbnail" alt={author.pfp.alt} src={author.pfp.src.tn}>
                            <span class="card-footer-author-name">{author.fn + " " + author.ln}</span>
                        </span>
                        <span class="card-footer-date"><time datetime="{date}">{date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0].substring(2)}</time></span>
                    </div>
                </a>
            </li>
            {/each}
        </ul>
        <a class="cta grow h3size" href="/guides">More Guides</a>
    </section>
    <h2>Clients</h2>
    <section id="clients">
        <div class="grid-div">
        <div class="testimonial">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video controls disablePictureInPicture controlsList="nodownload noplaybackrate" poster="https://images.scalewhale.com/jsnow-thumbnail.webp" class="testimonial-video">
                <source src="https://images.scalewhale.com/jsnow.mp4" type='video/mp4;'/>
            </video>
            <div class="testimonial-caption">
                <h3>Jeff Snow</h3>
                <span class="h4size">
                    <p>Director of Growth &#64;</p>
                    <img class="caption-logo-nzxt" src="/logos/clients/nzxt.svg" alt="NZXT"/>
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
        <form method="POST" id="contact" action="" on:submit|preventDefault={contactSubmit}>
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
                <button formmethod="post" type="submit" name="submit" id="submit" class=" h3size grow" required on:submit|preventDefault={contactSubmit}>Unlock Your Growth</button> 
            </div>
        </form>
        <h3>Or email</h3>
        <p class="h3size"><span class="spm-confusion" aria-hidden="true">donotspamme</span> hello<!-- sdfjsdhfkjypcs -->@<!-- sdfjsdhfkjypcs -->scalew<!-- sdfjsdhfkjypcs -->hale<!-- sdfjsdhfkjypcs -->.<!-- sdfjsdhfkjypcs -->com</p>
    </div>
    </section>
</main>