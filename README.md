[![Scalewhale Hero Image](https://github.com/meikitanious/scalewhale/blob/main/readme/screenshot.png)(https://scalewhale.com?utm_source=github&utm_medium=organic&utm_campaign=readme)]

# Welcome to Scalewhale!

The official Scalewhale website! At Scalewhale, we believe growth marketing is best facilitated with technical expertise, automation, operations, and analytics. 

For guides on cool hacks, visit our [guides section here.](https://scalewhale.com/guides?utm_source=github&utm_medium=organic&utm_campaign=readme). 

This project is proudly created using [SvelteKit!](https://kit.svelte.dev). If you want to duplicate this repo to use as a starter for your portfolio/agency/blog site, here's some cool features:

## SEO Friendly

### Dynamic Sitemap Generation

We implemented sitemaps to automatically add in new posts from our CMS, making managing submissions easy!

### Smart Prerendering   

Speed is important for SEO, but we don't want to lose some cool SvelteKit features by using the static adapter. Rather than serving the whole website as static, this repo chooses to prerender content by directory.

## Built-in Form Handling Logic

### Anti-spam 

Hate Captcha? I do too. This repo uses a honeypot method to automatically blacklist spam, without giving an indication of an error to bots. In case there's a false positive, we warn the user with a toast message. 

### Send Submissions to Slack

Sending form submissions to the CMS is great for record-keeping; but if you want to immediately be informed, no worries. We set it up so that all submissions get pushed to Slack so that you're alerted in real-time.

## Great UX 

### Extremely Responsive
By using REM, smart breakpoints, % values, flex box, etc. -- we have a website that looks good on most device sizes!

## Swipable Toasts
We found an awesome repo called [svelte-toast](https://github.com/zerodevx/svelte-toast.git) created by [Jason Lee](https://github.com/zerodevx). 

I wanted to make his project more responsive, so I copied the svelte-toast files into my component folder and configured it to work with another great repo called [svelte-gestures](https://github.com/Rezi/svelte-gestures) by [Tomas Rezac](https://github.com/Rezi). 

The result? Users can now effectively swipe away toast notifications on mobile. But, if you wanted different functionality (e.g. DoubleTap), it should work with that too!

### Minimal Clientside Javascript

I wanted to make sure I used as little JavaScript as possible to keep this lean. Even the hamburger menu is pure HTML/CSS!

## Privacy-Focused Analytics

Analytics for this project is implemented using [Posthog](https://github.com/PostHog/posthog), which gives me great data for marketing without sacrificing user privacy the way Google Analytics does.

I've also gone ahead and implemented support for Cloudflare Zaraz; a much more privacy focused and cleaner alternative to Google Tag Manager.

# Future Improvements / Features

As a marketer, I'm grateful Svelte gave me a framework that made the process of coding my first website enjoyable. That said, I have a lot of room for optimization so here are things I'm actively working on:

## Accessibility
While I feel like the website is relatively accessible, our current honeypot method doesn't include the aria-hidden tag which might make it detectable by screen reader. In a future update, we're going to try ways of injecting this with JavaScript to maintain it's bot-efficacy while improving screen-reading functionality.

I'm currently testing Cloudflare's Captcha solution to see it as an alternative.

## CMS-Level Prerendering Choices

I want to make some of my future guides interactive, without overly complicating the project. I plan on configuring CMS routing logic that will detect whether a post should be rendered statically or dynamically based on a field, and then place it in a subdirectory where prerender = false.

## CSS Optimization 

I should've used tailwind, I know, but I really wanted to learn CSS for this project - plus I love some of the QOL SCSS features. That being said, there's a metric ton of redundant CSS here - so plenty of room for me to optimize.

In a future update, I might introduce minification as well.

## RSS, Google News, & AMP Support

I want to make my blog easier to find, so I do plan on integrating those features relatively soon.

## Typescript Migration

I know Typescript is the way to go, but I haven't learned it yet. Eventually I'll overhaul this project and have it written in TypeScript to bring it up to modern standards.

# Svelte Build Commands

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
