"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { grantConsent } from "@/components/gtm-tracker"

const STORAGE_KEY = "jp-cookie-consent"

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const decision = localStorage.getItem(STORAGE_KEY)
    if (!decision) {
      setVisible(true)
    } else if (decision === "accepted") {
      grantConsent()
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted")
    grantConsent()
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#B8862E]/30 bg-[#0A1A36] px-6 py-5 text-[#f2efe6] shadow-[0_-4px_20px_rgba(0,0,0,0.25)] sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#f2efe6]/85">
          We use cookies to understand how visitors use this site and improve it. You can accept
          or reject analytics cookies — this won't affect your ability to run a Brand Clone Scan.
          See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-[#B8862E]">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            onClick={reject}
            variant="ghost"
            className="text-[#f2efe6]/70 hover:bg-white/10 hover:text-[#f2efe6]"
          >
            Reject
          </Button>
          <Button onClick={accept} className="bg-[#B8862E] text-[#0A1A36] hover:bg-[#B8862E]/90">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
