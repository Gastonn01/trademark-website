"use client"

import { useId, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { nameCheckStartedHref, type Audience } from "@/lib/funnel"

const copy = {
  en: {
    kicker: "Free name check",
    title: "Is your name already claimed?",
    body: "Type a name or brand. It opens the free name check with that name filled in. A starting point, not a legal clearance.",
    label: "Name or brand",
    placeholder: "Your name or brand",
    button: "Check this name",
    hint: "Free search · No credit card",
  },
  es: {
    kicker: "Chequeo de nombre gratis",
    title: "¿Ese nombre ya está reclamado?",
    body: "Escribe un nombre o una marca. Abre el chequeo gratuito con ese nombre cargado. Es un punto de partida, no una autorización legal.",
    label: "Nombre o marca",
    placeholder: "Tu nombre o marca",
    button: "Comprobar este nombre",
    hint: "Búsqueda gratis · Sin tarjeta",
  },
}

export function NameCheckPrompt({
  variant = "band",
  audience,
  id,
  lang = "en",
}: {
  variant?: "hero" | "band" | "panel"
  audience?: Audience
  id?: string
  lang?: "en" | "es"
}) {
  const router = useRouter()
  const generatedId = useId()
  const inputId = id ? `${id}-input` : generatedId
  const [name, setName] = useState("")
  const t = copy[lang]
  const onDark = variant === "panel"

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push(nameCheckStartedHref(name, audience, window.location.pathname, lang))
  }

  const field = (
    <form onSubmit={submit} className={variant === "hero" ? "max-w-xl mx-auto" : ""}>
      {variant !== "hero" ? (
        <label htmlFor={inputId} className={`block text-sm font-medium mb-1.5 ${onDark ? "text-white" : "text-primary"}`}>
          {t.label}
        </label>
      ) : (
        <label htmlFor={inputId} className="sr-only">
          {t.label}
        </label>
      )}
      <div className="bg-white rounded-full shadow-xl p-1.5 flex flex-col sm:flex-row gap-1.5">
        <div className="flex-1 flex items-center px-4 sm:px-5 min-w-0">
          <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
          <input
            id={inputId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.placeholder}
            maxLength={80}
            enterKeyHint="go"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-base text-primary placeholder:text-gray-400 py-3"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all whitespace-nowrap"
        >
          {t.button}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )

  if (variant === "hero") {
    return (
      <div id={id} data-name-check="hero">
        {field}
        <p className="text-white/40 text-xs mt-4 tracking-wide">{t.hint}</p>
      </div>
    )
  }

  if (variant === "panel") {
    return (
      <aside id={id} data-name-check="end" className="mt-12 p-6 sm:p-8 bg-primary text-white rounded-lg [&_h2]:text-white [&_p]:text-gray-300 [&_label]:text-white">
        <p className="label-caps text-accent mb-3">{t.kicker}</p>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-white mb-3">{t.title}</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">{t.body}</p>
        {field}
      </aside>
    )
  }

  return (
    <section id={id} data-name-check="inline" className="not-prose my-2 md:my-8 p-3 sm:p-6 bg-[#F7F5F1] border border-black/5 rounded-2xl [&_h2]:text-primary [&_p]:text-gray-600 [&_label]:text-primary">
      <p className="label-caps text-accent mb-2 md:mb-3">{t.kicker}</p>
      <h2 className="font-serif text-2xl sm:text-3xl text-primary tracking-tight mb-1 md:mb-2">{t.title}</h2>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">{t.body}</p>
      {field}
    </section>
  )
}
