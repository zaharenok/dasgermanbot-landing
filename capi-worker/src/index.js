const META_API_VERSION = 'v18.0';


export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const token = env.META_CAPI_TOKEN;
    if (!token) {
      return new Response('CAPI token not configured', { status: 500 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const pixelId = env.META_PIXEL_ID || '1445746883270633';

    const capiPayload = {
      data: [
        {
          event_name: body.event_name || 'Lead',
          event_time: body.event_time || Math.floor(Date.now() / 1000),
          event_id: body.event_id || undefined,
          event_source_url: body.event_source_url || 'https://dasgermanbot.com/go',
          action_source: 'website',
          user_data: {
            fbp: body.fbp || undefined,
            fbc: body.fbc || undefined,
            client_ip_address: request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For'),
            client_user_agent: request.headers.get('User-Agent'),
          },
          custom_data: body.custom_data || undefined,
        },
      ],
    };

    // Remove undefined keys so Meta doesn't reject
    capiPayload.data[0] = JSON.parse(JSON.stringify(capiPayload.data[0]));

    const url = `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${token}`;

    const metaRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
    });

    const metaJson = await metaRes.json();

    return new Response(JSON.stringify(metaJson), {
      status: metaRes.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
