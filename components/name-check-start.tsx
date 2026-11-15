"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Building2, Mic, Trophy, Tv } from "lucide-react"
import { isAudience, trackFunnel, type Audience } from "@/lib/funnel"
import { leadForName, nameCheckDetailsHref, nameCheckEmailHref } from "@/lib/name-check-lead"

const audiences: { id: Audience; title: string; titleEs: string; subtitle: string; subtitleEs: string; icon: typeof Trophy }[] = [
  { id: "athlete", title: "Athlete", titleEs: "Deportista", subtitle: "Sports, NIL, and appearances", subtitleEs: "Deporte, imagen y apariciones", icon: Trophy },
  { id: "creator", title: "Creator", titleEs: "Creador", subtitle: "Content, handles, and a brand", subtitleEs: "Contenido, usuario y marca", icon: Tv },
  { id: "musician", title: "Musician", titleEs: "Músico", subtitle: "Artist name, band, or stage name", subtitleEs: "Nombre artístico o banda", icon: Mic },
  { id: "business", title: "Business", titleEs: "Negocio", subtitle: "Company, product, or brand", subtitleEs: "Empresa, producto o marca", icon: Building2 },
]

export function NameCheckStart() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") || "").slice(0, 80)
  const audienceParam = searchParams.get("audience")
  const from = searchParams.get("from")
  const lang = searchParams.get("lang") === "es" ? "es" : "en"
  const [name, setName] = useState(q)
  const [audience, setAudience] = useState<Audience | "">(isAudience(audienceParam) ? audienceParam : "")
  const [ready, setReady] = useState(false)
  const es = lang === "es"

  useEffect(() => {
    trackFunnel("name_check_started")
  }, [])

  useEffect(() => {
    const current = (q || name).trim()
    if (current && leadForName(current)) {
      router.replace(nameCheckDetailsHref({ q: current, audience, from, lang }))
      return
    }
    setReady(true)
  }, [audience, from, lang, name, q, router])

  function continueToEmail() {
    const trimmed = name.trim().slice(0, 80)
    if (!trimmed || !audience) return
    router.push(nameCheckEmailHref({ q: trimmed, audience, from, lang }))
  }

  if (!ready) {
    return (
      <section className="container mx-auto px-4 py-10 max-w-xl">
        <p className="label-caps text-accent mb-3">{es ? "Chequeo de nombre gratis" : "Free name check"}</p>
        <h1 className="font-serif text-4xl text-primary tracking-tight">{es ? "Preparando tu chequeo" : "Preparing your check"}</h1>
      </section>
    )
  }

  const knownAudience = isAudience(audienceParam)

  return (
    <section className="container mx-auto px-4 py-8 md:py-16 max-w-xl">
      <p className="label-caps text-accent mb-3">{es ? "Chequeo de nombre gratis" : "Free name check"}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-3">
        {name.trim()
          ? es
            ? `Vamos a revisar “${name.trim()}”`
            : `We'll check “${name.trim()}”`
          : es
            ? "¿Qué nombre revisamos?"
            : "Which name should we check?"}
      </h1>
      <p className="text-gray-600 leading-relaxed mb-6">
        {es
          ? "El siguiente paso es un email para enviarte el resultado. Es un punto de partida, no una autorización legal."
          : "Next we’ll ask for an email so we can send the result. A starting point, not a legal clearance."}
      </p>

      {!q && (
        <label className="block text-sm font-medium text-primary mb-5">
          {es ? "Nombre o marca" : "Name or brand"}
          <input
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, 80))}
            maxLength={80}
            autoComplete="off"
            className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-base text-primary outline-none focus:border-accent"
          />
        </label>
      )}

      {knownAudience ? (
        <p className="text-sm text-gray-500 mb-6">
          {es ? "Perfil" : "Profile"}: {audiences.find((item) => item.id === audience)?.[es ? "titleEs" : "title"]}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {audiences.map((item) => {
            const Icon = item.icon
            const active = audience === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAudience(item.id)}
                className={`bg-white border rounded-2xl p-4 text-left ${active ? "border-accent ring-1 ring-accent" : "border-gray-200"}`}
              >
                <Icon className={`h-5 w-5 mb-2 ${active ? "text-accent" : "text-gray-400"}`} aria-hidden="true" />
                <div className="font-semibold text-primary">{es ? item.titleEs : item.title}</div>
                <div className="text-sm text-gray-500 mt-1">{es ? item.subtitleEs : item.subtitle}</div>
              </button>
            )
          })}
        </div>
      )}

      <button
        type="button"
        onClick={continueToEmail}
        disabled={!name.trim() || !audience}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 disabled:opacity-50 rounded-full"
      >
        {es ? "Continuar" : "Continue"}
      </button>
    </section>
  )
}
