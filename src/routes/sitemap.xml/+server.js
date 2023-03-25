import { STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';

const strapiQuery = 'blogs?fields[0]=slug&fields[1]=date'

export async function GET() {
    const res = await fetch(`${STRAPI_URL}${strapiQuery}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_AUTH}`
        }
    });
    const json = await res.json();
    const posts = json.data.slice(0,3).map((blog) => ({
        slug: blog.attributes.slug,
        date: blog.attributes.date
    }));
    let postsSitemap = '';
    for (const post of posts) {
        postsSitemap += `
            <url>
                <loc>https://scalewhale.com/${post.slug}</loc>
                <lastmod>${post.date}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>`;
    }
    return new Response(
        `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https:/scalewhale.com</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https:/scalewhale.com/guides</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https:/scalewhale.com/ads</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https:/scalewhale.com/analytics</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https:/scalewhale.com/ops</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https:/scalewhale.com/tech</loc>
                <lastmod>2023-03-25</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            ${postsSitemap}
        </urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}
