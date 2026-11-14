"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { FunnelThankYou } from "@/components/funnel-thank-you"

function Body() {
  const spanish = useSearchParams().get("lang") === "es"
  if (spanish) {
    return (
      <FunnelThankYou
        kicker="Escaneo de clones"
        title="Solicitud recibida."
        body="Vamos a correr tu escaneo y enviarte el informe por email en un máximo de 72 horas. Revisá tu casilla: te llega una confirmación."
        homeLabel="Volver a Just Protected"
      />
    )
  }
  return (
    <FunnelThankYou
      kicker="Brand clone scan"
      title="Request received."
      body="We'll run your scan and send the report to your email within 72 hours. Check your inbox for a confirmation."
    />
  )
}

export function CloneScanThankYou() {
  return (
    <Suspense
      fallback={
        <FunnelThankYou
          kicker="Brand clone scan"
          title="Request received."
          body="We'll run your scan and send the report to your email within 72 hours. Check your inbox for a confirmation."
        />
      }
    >
      <Body />
    </Suspense>
  )
}
