"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { FUNNEL_PATH, trackFunnel } from "@/lib/funnel"

const CALENDLY_URL = "https://calendly.com/justprotected/30min"

export function CalendlyWidget() {
  const router = useRouter()

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return
      if (event.data?.event !== "calendly.event_scheduled") return
      trackFunnel("book_a_call_scheduled")
      router.push(FUNNEL_PATH.bookACallScheduled)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [router])

  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=0a1a36`}
        style={{ minWidth: "320px", height: "750px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  )
}
