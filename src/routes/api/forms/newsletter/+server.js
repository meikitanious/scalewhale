import { SLACK_NEWSLETTER_KEY, SLACK_URL, STRAPI_URL, STRAPI_AUTH  } from '$env/static/private';

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
/* Payload Generator */

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
    payload.blocks.push({
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*Email* :email:\n${slackData.email}`
        }
    });
    return JSON.stringify(payload);
  };

/**Form Validation*/

const isBlacklisted = async (ip_address, domain) => {
  const ipResponse = await fetch(`${STRAPI_URL}ip-blacklists?filters[ip_address][$eq]=${ip_address}`);
  const ipData = await ipResponse.json();
  const domainResponse = await fetch(`${STRAPI_URL}domain-blacklists?filters[domain][$eq]=${domain}`);
  const domainData = await domainResponse.json();
  return (ipData && ipData.data) || (domainData && domainData.data) || false;
};
const addToBlacklist = async (ip_address, domain) => {
  await Promise.all([
    fetch(`${STRAPI_URL}ip-blacklists`, {
      ...strapiRequest(),
      body: strapiPayload(ip_address)
    }),
    fetch(`${STRAPI_URL}domain-blacklists`, {
      ...strapiRequest(),
      body: strapiPayload(domain)
    })
  ]);
};
  
export async function POST({ request, getClientAddress }) {
    const formData = await request.formData();
    const ip_address = getClientAddress();
    const honeypot = String(formData.get('url'));
    const email = String(formData.get('email'));
    const domain = email.split('@')[1];
    const data = {email};

    let responseStatus;

   if (await isBlacklisted(ip_address, domain)) {
      responseStatus = 202
    } else if (honeypot) {
      await addToBlacklist(ip_address, domain);
      responseStatus = 202
    } else {
      console.log("Sent successfully!", data);
      /**Strapi Webhook */
      await fetch(`${STRAPI_URL}newsletter-signups`, {
        ...strapiRequest(),
        body: strapiPayload(data)
      });
      /**Slack Webhook */
      await fetch(`${SLACK_URL}${SLACK_NEWSLETTER_KEY}`, {
        ...slackRequest,
        body: slackPayload(data)
      });
      responseStatus = 200
    };
    let responseBody;
    if (responseStatus === 200){
      responseBody = JSON.stringify({success: true, data: data});
    } else {
      responseBody = 'Successful!';
    }
    return new Response(responseBody, {status: responseStatus});
}