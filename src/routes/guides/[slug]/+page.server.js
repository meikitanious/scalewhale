import { STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';
export const prerender = false;
import { redirect } from '@sveltejs/kit';
const strapiQuerySEO = 'guide?populate[social_image][populate]=[*]';
export async function load({ params }) {
    if (params === 1 ) {
        throw redirect(301, '/guides')
    } else {
    const res = await fetch(`${STRAPI_URL}blogs?pagination[page]=${params.slug}&pagination[pageSize]=6&fields[0]=title&fields[1]=slug&fields[2]=likes&fields[3]=date&populate[tags][fields][0]=tagName&populate[author][fields][0]=fname&populate[author][fields][1]=lname&populate[author][populate]=pfp&sort[0]=date%3Adesc`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_AUTH}`
          }
    });
    const json = await res.json();
    const pageCount = json.meta.pagination.pageCount;
    const pageNum = json.meta.pagination.page;
    if (pageCount < pageNum){
        throw redirect (302, '/guides')
    }
    const summaries = json.data.map((post) => ({
      blog:{
          slug: post.attributes.slug,
          title: post.attributes.title,
          likes: post.attributes.likes,
          date: post.attributes.date,
      },
      tags: post.attributes.tags.data.map(tag => tag.attributes.tagName),
      author:{
          fn: post.attributes.author.data.attributes.fname,
          ln: post.attributes.author.data.attributes.lname, 
          pfp:{
              alt:post.attributes.author.data.attributes.pfp.data.attributes.alternativeText,
              src:{
                  tn: post.attributes.author.data.attributes.pfp.data.attributes.formats.thumbnail.url.replace(/^(.*?)(\.[^.]*$|$)/gi, `/cdn-cgi/image/width=450,onerror=redirect,format=auto,fit=auto$2`),
                  sm: post.attributes.author.data.attributes.pfp.data.attributes.formats.small.url.replace(/^(.*?)(\.[^.]*$|$)/gi, `/cdn-cgi/image/width=450,onerror=redirect,format=auto,fit=auto$2`),
                  md: post.attributes.author.data.attributes.pfp.data.attributes.formats.medium.url.replace(/^(.*?)(\.[^.]*$|$)/gi, `/cdn-cgi/image/width=450,onerror=redirect,format=auto,fit=auto$2`),
                  lg: post.attributes.author.data.attributes.pfp.data.attributes.formats.large.url.replace(/^(.*?)(\.[^.]*$|$)/gi, `/cdn-cgi/image/width=450,onerror=redirect,format=auto,fit=auto$2`),
              }
          }
      }
    }));
    const resSEO = await fetch(`${STRAPI_URL}${strapiQuerySEO}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_AUTH}`
        }
      });
        const jsonSEO = await resSEO.json();
        const cornerstone = {
            seo: {
              title: jsonSEO.data.attributes.seo_title,
              desc: jsonSEO.data.attributes.seo_desc,
              kw: jsonSEO.data.attributes.seo_keywords,
            },
            social: {
              title: jsonSEO.data.attributes.social_title,
              desc: jsonSEO.data.attributes.social_desc,
              image: jsonSEO.data.attributes.social_image.data.attributes.formats.medium.url,
            },
          };
    return { summaries, pageCount, pageNum, cornerstone};
  }
}
  