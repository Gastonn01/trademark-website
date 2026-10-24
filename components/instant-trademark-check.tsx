"use client"

import { useEffect, useRef, useState } from "react"
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
  const [reportEmail, setReportEmail] = useState("")
  const [reportSending, setReportSending] = useState(false)
  const [reportSent, setReportSent] = useState(false)

  // One-field lead: reuses the existing free-search submission pipeline
  // (Resend email to the team + Supabase), tagged as "instant-report".
  async function sendReport() {
    if (!result || !reportEmail.trim() || reportSending) return
    setReportSending(true)
    try {
      const fd = new FormData()
      fd.append("formType", "free-search")
      fd.append("intent", "instant-report")
      fd.append("trademarkName", result.name)
      fd.append("email", reportEmail.trim())
      fd.append("instantVerdict", result.status)
      fd.append("instantMessage", result.message)
      fd.append("instantDetail", result.detail)
      await fetch("/api/submit-free-search", { method: "POST", body: fd })
      setReportSent(true)
    } catch {
      setReportSent(true) // the API is fire-and-forget; don't block the visitor
    } finally {
      setReportSending(false)
    }
  }

  async function runCheck(overrideName?: string) {
    const q = (overrideName ?? name).trim()
    if (!q || loading) return
    setLoading(true); setResult(null); setError(null); setStep(0); setReportSent(false)
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

  // The hero search bar hands off here: scroll into view and run the scan.
  useEffect(() => {
    const handler = (e: Event) => {
      const value = String((e as CustomEvent).detail ?? "").trim()
      const el = document.getElementById("instant-check")
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 40
        window.scrollTo({ top, behavior: "smooth" })
      }
      if (value) {
        setName(value)
        runCheckRef.current(value)
      }
    }
    window.addEventListener("jp:instant-check", handler)
    return () => window.removeEventListener("jp:instant-check", handler)
  }, [])

  return (
    <section id="instant-check" className="py-20 md:py-28 bg-[#F7F5F1]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <p className="label-caps text-accent mb-5">Instant check</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-primary mb-4">
            Is your name already taken?
          </h2>
          <p className="text-gray-500 font-light">Run an instant preliminary trademark scan. Free, no sign-up.</p>
        </div>

        <div className="bg-white rounded-full shadow-xl p-1.5 flex flex-col sm:flex-row gap-1.5">
          <div className="flex-1 flex items-center px-5 py-3">
            <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runCheck()}
              placeholder="Type any name, brand, or handle"
              className="flex-1 bg-transparent outline-none text-primary placeholder:text-gray-400 min-w-0"
              maxLength={80}
            />
          </div>
          <button
            onClick={() => runCheck()}
            disabled={loading || !name.trim()}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-50 rounded-full transition-all whitespace-nowrap"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check now"}
          </button>
        </div>

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
                      href={`/free-search?q=${encodeURIComponent(result.name)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all"
                    >
                      See which classes are still open for you
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/free-search?q=${encodeURIComponent(result.name)}&intent=defend`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 hover:border-primary text-primary text-sm font-semibold rounded-full transition-all"
                    >
                      That&apos;s my name — help me fight it
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/free-search?q=${encodeURIComponent(result.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all"
                  >
                    Lock it in before someone else does — free search
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                {/* Light lead capture: one field for visitors who won't do the full form */}
                {!reportSent ? (
                  <form
                    className="mt-5 pt-4 border-t border-gray-200/70"
                    onSubmit={(e) => {
                      e.preventDefault()
                      sendReport()
                    }}
                  >
                    <p className="text-xs font-semibold text-primary mb-2">
                      Or get the full report by email — free
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={reportEmail}
                        onChange={(e) => setReportEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="flex-1 px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full outline-none focus:border-accent min-w-0"
                      />
                      <button
                        type="submit"
                        disabled={reportSending || !reportEmail.trim()}
                        className="px-5 py-2.5 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-50 rounded-full transition-all whitespace-nowrap"
                      >
                        {reportSending ? "Sending…" : "Email my report"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-5 pt-4 border-t border-gray-200/70 text-sm text-green-700 font-medium">
                    ✓ Done — our attorneys will email your full report shortly.
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-4">{result.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Try a famous brand to see how it works — then try your own name.
          </p>
        )}
      </div>
    </section>
  )
}
