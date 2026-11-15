"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { SpamGuardFields } from "@/components/spam-guard-fields"
import { trackFunnel } from "@/lib/funnel"
import { NAME_CHECK_EMAIL_INTENT, isValidEmail, leadForName, writeNameCheckLead } from "@/lib/name-check-lead"
import Link from "next/link"
import { Search, Loader2, ShieldCheck, AlertTriangle, ArrowRight, Globe, Youtube } from "lucide-react"

type GooglePresence = { checked: boolean; recognizedEntity: boolean | null; topResults: number }

type WebPresence = {
  domain: { slug: string; taken: boolean | null }
  instagram: { taken: boolean | null }
  youtube: { taken: boolean | null }
  google: GooglePresence | null
}

type Result = {
  name: string
  status: "conflict" | "clear" | "weak"
  message: string
  detail: string
  source: "live" | "preliminary"
  disclaimer: string
  webPresence?: WebPresence
}

const SCAN_STEPS = [
  "Searching the EU trademark register (EUIPO)…",
  "Checking known brands worldwide…",
  "AI is checking confusingly similar names…",
  "Compiling your result…",
]

export function InstantTrademarkCheck() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pendingName, setPendingName] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSending, setEmailSending] = useState(false)
  const hpRef = useRef<HTMLInputElement>(null)
  const startedAtRef = useRef(Date.now())

  async function runCheck(overrideName?: string) {
    const q = (overrideName ?? name).trim()
    if (!q || loading) return
    setLoading(true); setResult(null); setError(null); setStep(0); setPendingName(null)
    const stepTimer = setInterval(() => setStep((s) => Math.min(s + 1, SCAN_STEPS.length - 1)), 650)
    const started = Date.now()
    try {
      const res = await fetch("/api/trademark-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: q }),
      })
      const data = await res.json()
      // keep the scan visible for a beat so it feels real
      const elapsed = Date.now() - started
      await new Promise((r) => setTimeout(r, Math.max(0, 2200 - elapsed)))
      if (!res.ok) setError(data?.error || "Something went wrong.")
      else setResult(data)
    } catch {
      setError("Network error — please try again.")
    } finally {
      clearInterval(stepTimer)
      setLoading(false)
    }
  }

  const conflict = result?.status === "conflict"
  const runCheckRef = useRef(runCheck)
  runCheckRef.current = runCheck

  function requestCheck(overrideName?: string) {
    const q = (overrideName ?? name).trim().slice(0, 80)
    if (!q || loading || emailSending) return
    setName(q)
    setResult(null)
    setError(null)
    if (leadForName(q)) {
      void runCheckRef.current(q)
      return
    }
    setPendingName(q)
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const q = (pendingName || name).trim().slice(0, 80)
    const trimmed = email.trim()
    if (!q) return
    if (!isValidEmail(trimmed)) {
      setEmailError("Enter a valid email address.")
      return
    }
    setEmailSending(true)
    setEmailError("")
    const elapsed = Date.now() - startedAtRef.current
    if (elapsed < 3000) {
      await new Promise((resolve) => setTimeout(resolve, 3000 - elapsed))
    }
    const body = new FormData()
    body.append("formType", "free-search")
    body.append("intent", NAME_CHECK_EMAIL_INTENT)
    body.append("trademarkName", q)
    body.append("email", trimmed)
    body.append("referrer", document.referrer.slice(0, 500))
    body.append("sourcePath", "/")
    body.append("landingPage", "/#instant-check")
    body.append("submittedAt", new Date().toISOString())
    body.append("hp", hpRef.current?.value || "")
    body.append("startedAt", String(startedAtRef.current))
    body.append("searchId", crypto.randomUUID())
    try {
      const response = await fetch("/api/submit-free-search", { method: "POST", body })
      const payload = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        setEmailError(payload?.error || "We couldn't save your email. Please try again.")
        setEmailSending(false)
        return
      }
    } catch {
      setEmailError("We couldn't save your email. Please try again.")
      setEmailSending(false)
      return
    }
    writeNameCheckLead({ email: trimmed, name: q, audience: "", at: new Date().toISOString() })
    trackFunnel("name_check_email_submitted")
    setEmailSending(false)
    await runCheckRef.current(q)
  }

  // Older homepage search handed the name here. Keep the scroll, but do not scan
  // until an email for that name has been saved.
  useEffect(() => {
    const handler = (e: Event) => {
      const value = String((e as CustomEvent).detail ?? "").trim().slice(0, 80)
      const el = document.getElementById("instant-check")
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 40
        window.scrollTo({ top, behavior: "smooth" })
      }
      if (!value) return
      setName(value)
      setResult(null)
      setError(null)
      if (leadForName(value)) void runCheckRef.current(value)
      else setPendingName(value)
    }
    window.addEventListener("jp:instant-check", handler)
    return () => window.removeEventListener("jp:instant-check", handler)
  }, [])

  return (
    <section id="instant-check" className="py-10 md:py-28 bg-[#F7F5F1]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-4 md:mb-10">
          <p className="label-caps text-accent mb-5">Instant check</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-primary mb-4">
            Is your name already taken?
          </h2>
          <p className="text-gray-500 font-light">Add your email first. The preliminary scan runs after that.</p>
        </div>

        <div className="bg-white rounded-full shadow-xl p-1.5 flex flex-col sm:flex-row gap-1.5">
          <div className="flex-1 flex items-center px-5 py-3">
            <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && requestCheck()}
              placeholder="Type any name, brand, or handle"
              className="flex-1 bg-transparent outline-none text-base text-primary placeholder:text-gray-400 min-w-0"
              maxLength={80}
            />
          </div>
          <button
            onClick={() => requestCheck()}
            disabled={loading || emailSending || !name.trim()}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-50 rounded-full transition-all whitespace-nowrap"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check now"}
          </button>
        </div>

        {pendingName && !loading && !result && (
          <form onSubmit={submitEmail} className="relative mt-4 md:mt-6 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 text-left">
            <SpamGuardFields startedAt={startedAtRef.current} hpRef={hpRef} />
            <p className="text-sm text-gray-600 mb-3">We'll send your result to this email.</p>
            <p className="text-sm font-medium text-primary mb-4">{pendingName}</p>
            <label htmlFor="instant-check-email" className="block text-sm font-medium text-primary">
              Email
              <input
                id="instant-check-email"
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
                placeholder="you@email.com"
                className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-primary outline-none focus:border-accent"
              />
            </label>
            {emailError ? <p role="alert" className="text-sm text-red-700 mt-3">{emailError}</p> : null}
            <button
              type="submit"
              disabled={emailSending}
              className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-60 rounded-full"
            >
              {emailSending ? "Sending…" : "Show my result"}
            </button>
          </form>
        )}

        {loading && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-accent animate-spin flex-shrink-0" />
            <span className="text-gray-700 text-sm transition-all">{SCAN_STEPS[step]}</span>
          </div>
        )}

        {error && <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

        {result && !loading && (
          <div
            className={`mt-6 rounded-2xl border p-6 shadow-sm ${
              conflict ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  conflict ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {conflict ? (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                ) : (
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${conflict ? "text-red-800" : "text-green-800"}`}>
                  {result.message}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{result.detail}</p>

                {result.webPresence && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {([
                      { key: "domain", label: `${result.webPresence.domain.slug}.com`, icon: Globe, taken: result.webPresence.domain.taken },
                      { key: "youtube", label: "YouTube", icon: Youtube, taken: result.webPresence.youtube.taken },
                    ] as const).map(({ key, label, icon: Icon, taken }) => (
                      <span
                        key={key}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          taken === null
                            ? "bg-gray-100 text-gray-400"
                            : taken
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {label}
                        <span className="font-semibold">
                          {taken === null ? "· unknown" : taken ? "· taken" : "· available"}
                        </span>
                      </span>
                    ))}
                    {result.webPresence.google?.checked && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          result.webPresence.google.recognizedEntity
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Search className="h-3 w-3" />
                        Google
                        <span className="font-semibold">
                          {result.webPresence.google.recognizedEntity
                            ? "· recognized brand"
                            : "· no strong presence"}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {conflict ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/free-search/details?q=${encodeURIComponent(result.name)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all"
                    >
                      See which classes are still open for you
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/free-search/details?q=${encodeURIComponent(result.name)}&intent=defend`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 hover:border-primary text-primary text-sm font-semibold rounded-full transition-all"
                    >
                      That&apos;s my name — help me fight it
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/free-search/details?q=${encodeURIComponent(result.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all"
                  >
                    Lock it in before someone else does — free search
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                <p className="text-xs text-gray-500 mt-4">{result.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && !pendingName && (
          <p className="text-center text-xs text-gray-400 mt-4">
            The preliminary scan runs only after your email is saved.
          </p>
        )}
      </div>
    </section>
  )
}
