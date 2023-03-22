<script>
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

<footer class="footer">
    <hr style="width:100%">
    <div class="footer-divider">
        <div class="footer-left">
            <a href="/">
                <img class="footer-nav-logo" href="logo" alt="Scalewhale Logo" src="/logos/scalewhale.svg"/>
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
        <form action="?/newsletter" method="post" id="newsletter" on:submit={handleFormSubmit}>
            <input tabindex="-1" type="text" name="url" id="url" autocomplete="off">
            <input type ="email" name="email" id="email" placeholder="Business Email" required>
            <button formaction="?/newsletter" formmethod="post" type="submit" name="submit" id="submit" required>
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