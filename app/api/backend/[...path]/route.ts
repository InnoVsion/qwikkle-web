export const runtime = 'nodejs';

function getApiBaseUrl(): string {
  const v =
    process.env.QWIKKLE_API_URL ??
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL;
  if (!v) {
    throw new Error('Missing QWIKKLE_API_URL (or API_URL / NEXT_PUBLIC_API_URL)');
  }
  return v.replace(/\/+$/, '');
}

async function handler(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;

  const apiBase = getApiBaseUrl();
  const url = new URL(req.url);
  const upstreamUrl = `${apiBase}/${path.join('/')}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
    redirect: 'manual',
  });

  const resHeaders = new Headers(upstreamRes.headers);

  const setCookie = upstreamRes.headers.getSetCookie?.() ?? [];
  resHeaders.delete('set-cookie');

  const body = upstreamRes.body;
  const nextRes = new Response(body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: resHeaders,
  });

  for (const c of setCookie) {
    nextRes.headers.append('set-cookie', c);
  }

  return nextRes;
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE, handler as OPTIONS };

