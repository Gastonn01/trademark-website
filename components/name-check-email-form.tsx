"use client"

import { useRef, useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SpamGuardFields } from "@/components/spam-guard-fields"
import { isAudience, trackFunnel } from "@/lib/funnel"
import {
  NAME_CHECK_EMAIL_INTENT,
  isValidEmail,
  nameCheckDetailsHref,
  nameCheckSearch,
  writeNameCheckLead,
} from "@/lib/name-check-lead"

export function NameCheckEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const name = (searchParams.get("q") || "").slice(0, 80)
  const audienceParam = searchParams.get("audience")
  const audience = isAudience(audienceParam) ? audienceParam : ""
  const from = searchParams.get("from")
  const lang = searchParams.get("lang") === "es" ? "es" : "en"
  const es = lang === "es"
  const startedAtRef = useRef(Date.now())
  const hpRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!name) {
      setError(es ? "Falta el nombre que hay que revisar." : "The name to check is missing.")
      return
    }
    if (!isValidEmail(trimmed)) {
      setError(es ? "Introduce un email válido." : "Enter a valid email address.")
      return
    }
    setSending(true)
    setError("")
    const elapsed = Date.now() - startedAtRef.current
    if (elapsed < 3000) {
      await new Promise((resolve) => setTimeout(resolve, 3000 - elapsed))
    }
    const body = new FormData()
    body.append("formType", "free-search")
    body.append("intent", NAME_CHECK_EMAIL_INTENT)
    body.append("trademarkName", name)
    body.append("email", trimmed)
    if (audience) body.append("audience", audience)
    body.append("referrer", document.referrer.slice(0, 500))
    if (from) body.append("sourcePath", from.slice(0, 200))
    body.append("landingPage", "/free-search/email")
    body.append("submittedAt", new Date().toISOString())
    body.append("hp", hpRef.current?.value || "")
    body.append("startedAt", String(startedAtRef.current))
    body.append("searchId", crypto.randomUUID())
    try {
      const response = await fetch("/api/submit-free-search", { method: "POST", body })
      const payload = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        setError(payload?.error || (es ? "No pudimos guardar el email. Inténtalo de nuevo." : "We couldn't save your email. Please try again."))
        setSending(false)
        return
      }
    } catch {
      setError(es ? "No pudimos guardar el email. Inténtalo de nuevo." : "We couldn't save your email. Please try again.")
      setSending(false)
      return
    }
    writeNameCheckLead({ email: trimmed, name, audience: audience || "", at: new Date().toISOString() })
    trackFunnel("name_check_email_submitted")
    router.push(nameCheckDetailsHref({ q: name, audience, from, lang }))
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-16 max-w-xl">
      <p className="label-caps text-accent mb-3">{es ? "Chequeo de nombre gratis" : "Free name check"}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-3">
        {es ? "¿Dónde enviamos el resultado?" : "Where should we send the result?"}
      </h1>
      <p className="text-gray-600 leading-relaxed mb-6">
        {es ? "Te enviaremos el resultado a este email." : "We'll send your result to this email."}
      </p>
      <form onSubmit={submit} className="relative space-y-4">
        <SpamGuardFields startedAt={startedAtRef.current} hpRef={hpRef} />
        <label className="block text-sm font-medium text-primary" htmlFor="name-check-name">
          {es ? "Nombre o marca" : "Name or brand"}
          <input
            id="name-check-name"
            value={name}
            readOnly
            className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-primary"
          />
        </label>
        <label htmlFor="name-check-email" className="block text-sm font-medium text-primary">
          {es ? "Email" : "Email"}
          <input
            id="name-check-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={es ? "tu@email.com" : "you@email.com"}
            className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-primary outline-none focus:border-accent"
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-red-700 mt-3">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={sending}
          className="mt-5 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-60 rounded-full"
        >
          {sending ? (es ? "Enviando…" : "Sending…") : es ? "Enviar el resultado" : "Send my result"}
        </button>
      </form>
      {!name ? (
        <p className="text-sm text-gray-500 mt-4">
          <a className="underline" href={`/free-search/started${nameCheckSearch({ from, lang })}`}>
            {es ? "Volver a indicar el nombre" : "Go back and enter a name"}
          </a>
        </p>
      ) : null}
    </section>
  )
}
