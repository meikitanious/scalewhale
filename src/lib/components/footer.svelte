<script> 
import { toast } from '$lib/toast';
import posthog from 'posthog-js';
import { page } from '$app/stores';
let newsletterSubmits = 0;

async function newsletterPost(formData) {
    try {
        const response = await fetch('/api/forms/newsletter', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            newsletterSubmits = 1;
            toast.pop();
            toast.push(`✅ Thanks for signing up!`);
            const responseData = await response.json();
            const userData = responseData.data;
            posthog.identify(userData.email);
            posthog.people.set({Email: userData.email});
            posthog.capture('Newsletter Signup', {
                Location: page.path,
            })
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
        toast.push(`Server Error - Email hello@scalewhale.com instead`, {
                theme: {
                    '--toastBackground': '#FFDEDE',
                }
            })
        posthog.capture('Form Error',{
            Location: 'Homepage',
            Status: error
        })
    }
};

async function newsletterSubmit() {
    const formData = new FormData(this);
    if (newsletterSubmits === 0){
        newsletterPost(formData)
    } else {
        const submitAgain = confirm('Do you want to submit again?');
        if (submitAgain) {
            newsletterSubmits = 0;
            newsletterPost(formData);
        } else {
            this.reset();
        }
    }
}
 </script>

<footer class="footer">
    <hr style="width:100%">
    <div class="footer-divider">
        <div class="footer-left">
            <a href="/">
                <img class="footer-nav-logo" alt="Scalewhale Logo" src="/logos/scalewhale.svg"/>
            </a>
            <h3>Connect with us online</h3>
            <ul class="footer-social-links">
                <a class="footer-social-linkedin" href="https://linkedin.com/in/meikitanious">
                    <img alt="LinkedIn Icon" src="/logos/social/linkedin.svg"/>
                </a>
                <a class="footer-social-discord" href="https://discord.gg/SUqq7rmVSR">
                    <img alt="Discord Icon" src="/logos/social/discord.svg"/>
                </a>
                <a class="footer-social-reddit" href="https://www.reddit.com/user/miketanious">
                    <img alt="Reddit Icon" src="/logos/social/reddit.svg"/>
                </a>
                <a class="footer-social-whatsapp" href="https://api.whatsapp.com/send?phone=19736077181">
                    <img alt="WhatsApp Icon" src="/logos/social/whatsapp.svg"/>
                </a>
            </ul>
        </div>
        <hr style="width:80%;" class="sep2">
        <div class="footer-right">
            <ul class="footer-nav-links">
                <li><a href="/#services">Services</a></li>
                <li><a href="/#clients">Clients</a></li>
                <li><a href="/guides">Guides</a></li>
            </ul>
            <a class="footer-nav-cta" href="/#contact">Let's Chat</a>
        </div>
    </div>
    <div class="footer-newsletter">
        <h3 class="footer-newsletter-heading">Get WhaleMail</h3>
        <p class="footer-newsletter-description">Bi-weekly newsletter with our guides, events, and updates.</p>
        <form method="post" id="newsletter" action="" on:submit|preventDefault={newsletterSubmit}>
            <input tabindex="-1" type="text" name="url" id="url" autocomplete="off">
            <input type ="email" name="email" id="email" placeholder="Business Email" required>
            <button formmethod="post" type="submit" name="submit" id="submit" on:submit|preventDefault={newsletterSubmit} required>
                <img alt="Submit" src="/icons/arrowright.svg">
            </button> 
        </form>
    </div>
    <div class="footer-bottom">
        <p class="footer-madewithsvelte">Made with <span color="red">&hearts;</span> Using <a href="https://kit.svelte.dev"><span class="svelte-color" style="color:#FF3E00">Svelte</span></a></p>
        <a href="/privacy" class="footer-privacy">Privacy Policy</a>
    </div>
    <div class="footer-copyright">
        <p>&copy; 2023 Attribution LLC. All rights reserved.</p>
        <div></div>
    </div>
</footer>