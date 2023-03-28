import { STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';
export const prerender = true;
export async function load({ params }) {
    const res = await fetch(`${STRAPI_URL}blogs?filters[slug][$eq]=${params.slug}&populate[author][populate]=pfp&populate[featured_image][populate]=[*]&populate=tags`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_AUTH}`
          }
    });
    const json = await res.json();
    const blog = await json.data.map((post) => ({
        article:{
            slug: post.attributes.slug,
            title: post.attributes.title,
            desc: post.attributes.desc,
            likes: post.attributes.likes,
            date: post.attributes.date,
            content: post.attributes.content
            .replace(/<h2(?:\s+class=".*?")?>(.*?)<\/h2>/gi, '<div class="full-width"><h2>$1</h2></div>')
            .replace(/<p>(\s*<img.*?>\s*)<\/p>/gi, '$1')
            .replace(/<a\s+(?!href=["']https?:\/\/(www\.)?scalewhale.com(\/.*)?#).*?href=(["'])(.*?)\3.*?>/gi, '<a target="_blank" href="$4">'),
            featimg:{
                alt:post.attributes.featured_image.data.attributes.alternativeText,
                src:{
                    sm:post.attributes.featured_image.data.attributes.formats.small.url,
                    md:post.attributes.featured_image.data.attributes.formats.medium.url,
                    lg:post.attributes.featured_image.data.attributes.formats.large.url,
                }
            } 
        },
        seo:{
            title: post.attributes.seo_title,
            desc: post.attributes.seo_desc,
            kw: post.attributes.seo_keywords,

        },
        social:{
            title: post.attributes.social_title,
            desc: post.attributes.social_desc,
            image: post.attributes.social_image,
        },
        tags: post.attributes.tags.data.map(tag => tag.attributes.tagName),
        author:{
            fn: post.attributes.author.data.attributes.fname,
            ln: post.attributes.author.data.attributes.lname,
            title: post.attributes.author.data.attributes.title,
            bio: post.attributes.author.data.attributes.bio,
            company: post.attributes.author.data.attributes.company,
            li: post.attributes.author.data.attributes.li,
            pfp:{
                alt:post.attributes.author.data.attributes.pfp.data.attributes.alternativeText,
                src:{
                    tm: post.attributes.author.data.attributes.pfp.data.attributes.formats.thumbnail.url,
                    sm: post.attributes.author.data.attributes.pfp.data.attributes.formats.small.url,
                    md: post.attributes.author.data.attributes.pfp.data.attributes.formats.medium.url,
                    lg: post.attributes.author.data.attributes.pfp.data.attributes.formats.large.url
                }
            }
        }
      }));

   return { blog };
}

