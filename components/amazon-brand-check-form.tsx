"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { trackLeadSubmission } from "@/components/gtm-tracker"
import { isAnalyticsExcluded } from "@/lib/analytics-preference"

export function AmazonBrandCheckForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = useState("")
  const requestId = useRef<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    requestId.current ||= crypto.randomUUID()
    data.set("searchId", requestId.current)
    data.set("formType", "free-search")
    data.set("intent", "amazon-brand-registry")
    data.set("trademarkType", "word")
    data.set("campaign", "amazon-launch")
    data.set("landingPage", "/for-amazon-sellers")
    data.set("countries", JSON.stringify([data.get("country")]))
    if (!isAnalyticsExcluded()) {
      const params = new URLSearchParams(window.location.search)
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
        const value = params.get(key)
        if (value) data.set(key, value.slice(0, 200))
      }
    }
    setStatus("sending")
    setError("")
    try {
      const response = await fetch("/api/submit-free-search", { method: "POST", body: data })
      if (!response.ok) throw new Error("We couldn't save your request. Please try again.")
      trackLeadSubmission("amazon_launch")
      setStatus("done")
    } catch {
      setError("We couldn't confirm your request. Please try again or use our contact page.")
      setStatus("idle")
    }
  }

  if (status === "done") return <div role="status" className="rounded-2xl border border-accent bg-white p-8 text-primary"><h3 className="font-serif text-3xl mb-4">Your request is saved.</h3><p>Our team will review your brand name, products, and target country, then email you the next steps. This is a request for a preliminary review, not an instant clearance result.</p></div>

  const field = "mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-primary"
  return <form onSubmit={submit} className="rounded-2xl bg-white p-6 md:p-9 shadow-lg text-primary">
    <h3 className="font-serif text-3xl mb-2">Start with your brand name.</h3>
    <p className="text-sm text-gray-600 mb-6">Request a free preliminary review. No payment details needed.</p>
    <div className="grid gap-5">
      <label className="text-sm font-medium">Your brand name<input name="trademarkName" required maxLength={80} autoComplete="organization" placeholder="The name on your products or packaging" className={field} /></label>
      <label className="text-sm font-medium">What will you sell?<textarea name="goodsAndServices" required minLength={5} maxLength={1500} placeholder="For example: reusable water bottles and insulated travel mugs" rows={3} className={field} /><span className="block mt-1 text-xs text-gray-500">Use your own words. We’ll help identify the relevant trademark classes.</span></label>
      <label className="text-sm font-medium">Where do you need trademark protection?<select name="country" required defaultValue="" className={field}><option value="" disabled>Select a market</option>{["United States", "United Kingdom", "European Union", "Canada", "Australia", "Other / not sure"].map(country => <option key={country}>{country}</option>)}</select></label>
      <label className="text-sm font-medium">Your email<input name="email" type="email" required maxLength={254} autoComplete="email" className={field} placeholder="you@yourbrand.com" /></label>
      <div aria-hidden="true" className="absolute -left-[10000px]"><label>Leave empty<input name="hp" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-xs text-gray-600"><input type="checkbox" name="acceptTerms" value="true" required className="mt-1" /><span>I agree to the <Link href="/terms" className="underline">terms</Link> and <Link href="/privacy" className="underline">privacy policy</Link> and would like Just Protected to contact me about this request.</span></label>
      {error && <p role="alert" className="text-sm text-red-700">{error} <Link href="/contact" className="underline">Contact us</Link></p>}
      <button disabled={status === "sending"} className="rounded-full bg-primary px-6 py-4 text-white font-semibold disabled:opacity-60">{status === "sending" ? "Saving your request…" : "Request my free brand review"}</button>
      <p className="text-xs text-gray-500">No newsletter signup. Any filing service is quoted separately before you decide.</p>
    </div>
  </form>
}
