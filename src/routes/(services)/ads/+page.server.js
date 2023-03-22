import { STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';
const strapiQuery = 'ad?populate[social_image][populate]=[*]';
export const prerender = true;
export async function load() {
  const res = await fetch(`${STRAPI_URL}${strapiQuery}`, {
    headers: {
        'Authorization': `Bearer ${STRAPI_AUTH}`
      }
});
    const json = await res.json();
    const cornerstone = {
        content: json.data.attributes.content.replace(/<h2(?:\s+class=".*?")?>(.*?)<\/h2>/gi, '<div class="full-width"><h2>$1</h2></div>').replace(/<p>(\s*<img.*?>\s*)<\/p>/gi, '$1'),
        seo: {
          title: json.data.attributes.seo_title,
          desc: json.data.attributes.seo_desc,
          kw: json.data.attributes.seo_keywords,
        },
        social: {
          title: json.data.attributes.social_title,
          desc: json.data.attributes.social_desc,
          image: json.data.attributes.social_image.data.attributes.formats.medium.url,
        },
      };
      return { cornerstone };
    }