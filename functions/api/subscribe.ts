/**
 * Cloudflare Pages Function — POST /api/subscribe
 *
 * Validates the email and forwards it to a private webhook (newsletter or
 * mailing-list automation). The webhook URL is never committed: set
 * SUBSCRIBE_WEBHOOK_URL in the Cloudflare Pages environment, and the UI
 * shows its honest fallback when it is missing.
 */

interface SubscribePayload {
  email?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function onRequestPost(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  let payload: SubscribePayload
  try {
    payload = (await context.request.json()) as SubscribePayload
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const email = str(payload.email)
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'A valid email address is required.' }, 400)
  }

  const webhook = context.env.SUBSCRIBE_WEBHOOK_URL
  if (!webhook) {
    return json({ error: 'not_configured' }, 503)
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'mavenmg-site' }),
    })
    if (!res.ok) {
      return json({ error: `delivery_failed_${res.status}` }, 502)
    }
    return json({ ok: true }, 200)
  } catch {
    return json({ error: 'delivery_unreachable' }, 502)
  }
}
