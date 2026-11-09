import { Resend } from "resend"
import Stripe from "stripe"

/**
 * Clients are created on first use so `next build` can import route modules
 * when preview environments do not have API keys. Request-time behaviour is unchanged:
 * a missing key still throws when a route actually sends mail or talks to Stripe.
 */
function lazy<T extends object>(create: () => T): T {
  let client: T | null = null
  return new Proxy({} as T, {
    get(_target, prop) {
      if (!client) client = create()
      const value = Reflect.get(client, prop, client)
      return typeof value === "function" ? value.bind(client) : value
    },
  })
}

export const resend = lazy(() => {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('Missing API key. Pass it to the constructor `new Resend("re_123")`')
  }
  return new Resend(key)
})

export function stripeClient(apiVersion: "2024-06-20" | "2023-08-16") {
  return lazy(() => {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set")
    }
    return new Stripe(key, { apiVersion })
  })
}
