import { SLACK_LEAD_KEY, SLACK_NEWSLETTER_KEY, SLACK_URL, STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';

const strapiQuery = 'blogs?fields[0]=title&fields[1]=slug&fields[2]=likes&fields[3]=date&populate[tags][fields][0]=tagName&populate[author][fields][0]=fname&populate[author][fields][1]=lname&populate[author][populate]=pfp&sort[0]=date%3Adesc';

export async function load() {
  const res = await fetch(`${STRAPI_URL}${strapiQuery}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_AUTH}`
    }
  });
  const json = await res.json();
  const summaries = json.data.slice(0,3).map((post) => ({
    date: post.attributes.date,
    blog:{
        slug: post.attributes.slug,
        title: post.attributes.title,
        likes: post.attributes.likes,
    },
    tags: post.attributes.tags.data.map(tag => tag.attributes.tagName),
    author:{
        fn: post.attributes.author.data.attributes.fname,
        ln: post.attributes.author.data.attributes.lname, 
        pfp:{
            alt:post.attributes.author.data.attributes.pfp.data.attributes.alternativeText,
            src:{
                tn: post.attributes.author.data.attributes.pfp.data.attributes.formats.thumbnail.url,
                sm: post.attributes.author.data.attributes.pfp.data.attributes.formats.small.url,
                md: post.attributes.author.data.attributes.pfp.data.attributes.formats.medium.url,
                lg: post.attributes.author.data.attributes.pfp.data.attributes.formats.large.url,
            }
        }
    }
  }));
  return { summaries };
};
/* Header Generator */
const strapiRequest = () => {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_AUTH}`
    };
  return {
    method: 'POST',
    headers: headers,
  }
};
const slackRequest = {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json'
  },
};

/* Payload Generators */
const strapiPayload = (strapiData) => {
  const payload = {
    data: strapiData
  };
  return JSON.stringify(payload);
};
const slackPayload = (slackData) => {
  const payload = {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "New Submission"
        }
      },
      {
        "type": "divider"
      }
    ]
  };

  if (slackData.Name) {
    payload.blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Name* :adult:\n${slackData.Name}`
      }
    });

    payload.blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Company* :office:\n${slackData.Company}`
      }
    });

    payload.blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Query* :question:\n${slackData.Query}`
      }
    });
    payload.blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Email* :email:\n${slackData.Email}`
      }
    });
  } else { payload.blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `*Email* :email:\n${slackData.email}`
    }
  });
}
  return JSON.stringify(payload);
};

/**Form Validation*/

const isBlacklisted = async (ip_address, domain) => {
  const ipResponse = await fetch(`${strapiURL}ip-blacklists?filters[ip_address][$eq]=${ip_address}`);
  const ipData = await ipResponse.json();
  const domainResponse = await fetch(`${strapiURL}domain-blacklists?filters[domain][$eq]=${domain}`);
  const domainData = await domainResponse.json();

  return ipData.data.length > 0 || domainData.data.length > 0;
};

const addToBlacklist = async (ip_address, domain) => {
  await Promise.all([
    fetch(`${strapiURL}ip-blacklists`, {
      ...strapiRequest(),
      body: strapiPayload(ip_address)
    }),
    fetch(`${strapiURL}domain-blacklists`, {
      ...strapiRequest(),
      body: strapiPayload(domain)
    })
  ]);
};

export const actions = {
  contact: async ({ request, getClientAddress }) => { 
    const formData = await request.formData();
    const ip_address = getClientAddress();
    const honeypot = String(formData.get('url'));
    const Name = String(formData.get('name'));
    const Email = String(formData.get('email'));
    const Company = String(formData.get('company'));
    const Query = String(formData.get('query'));
    const domain = Email.split('@')[1];

    const data = {Name, Email, Company, Query};

    if (await isBlacklisted(ip_address, domain)) {
      console.log("Blacklisted");
    } else if (honeypot) {
      await addToBlacklist(ip_address, domain);
      console.log("Add to Blacklist")
    } else {
      console.log("Sent successfully!", data);
     /**Strapi Webhook */
     await fetch(`${strapiURL}lead-forms`, {
      ...strapiRequest(),
      body: strapiPayload(data)
    });
    /**Slack Webhook */
    await fetch(`${SLACK_URL}${SLACK_LEAD_KEY}`, {
      ...slackRequest,
      body: slackPayload(data)
    });
    }
  },
  newsletter: async ({ request, getClientAddress }) => { 
    const formData = await request.formData();
    const ip_address = getClientAddress();
    const honeypot = String(formData.get('url'));
    const email = String(formData.get('email'));
    const domain = email.split('@')[1];
    const data = {email};

    if (await isBlacklisted(ip_address, domain)) {
      console.log("Blacklisted");
    } else if (honeypot) {
      await addToBlacklist(ip_address, domain);
      console.log("Add to Blacklist")
    } else {
      console.log("Sent successfully!", data);
      /**Strapi Webhook */
      await fetch(`${strapiURL}newsletter-signups`, {
        ...strapiRequest(),
        body: strapiPayload(data)
      });
      /**Slack Webhook */
      await fetch(`${SLACK_URL}${SLACK_NEWSLETTER_KEY}`, {
        ...slackRequest,
        body: slackPayload(data)
      });
    }
  }
}