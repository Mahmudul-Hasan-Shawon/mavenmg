/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Validates the inquiry and forwards it to a private webhook (e.g. Zapier,
 * Make, or a Slack incoming webhook). The webhook URL is never committed:
 * set CONTACT_WEBHOOK_URL in the Cloudflare Pages environment, and the UI
 * shows its honest fallback when it is missing.
 */

interface ContactPayload {
  name?: unknown
  email?: unknown
  message?: unknown
  phone?: unknown
  company?: unknown
  service?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export async function onRequestPost(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  let payload: ContactPayload
  try {
    payload = (await context.request.json()) as ContactPayload
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const name = str(payload.name)
  const email = str(payload.email)
  const message = str(payload.message)

  if (!name || !EMAIL_RE.test(email) || !message) {
    return json({ error: 'Name, a valid email address, and a message are required.' }, 400)
  }

  const webhook = context.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    return json({ error: 'not_configured' }, 503)
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        phone: str(payload.phone),
        company: str(payload.company),
        service: str(payload.service),
      }),
    })
    if (!res.ok) {
      return json({ error: `delivery_failed_${res.status}` }, 502)
    }
    return json({ ok: true }, 200)
  } catch {
    return json({ error: 'delivery_unreachable' }, 502)
  }
}
