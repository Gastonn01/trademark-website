"use client"

import Script from "next/script"

const CALENDLY_URL = "https://calendly.com/justprotected/30min"

export function CalendlyWidget() {
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
