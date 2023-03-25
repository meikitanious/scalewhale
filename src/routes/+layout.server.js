import { POSTHOG_API, POSTHOG_HOST  } from '$env/static/private';

export async function load() {
    const phAPI = POSTHOG_API;
    const phHost = POSTHOG_HOST;
    return {phAPI, phHost}
}