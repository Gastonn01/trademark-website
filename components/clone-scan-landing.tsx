"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BUSINESS_CATEGORIES } from "@/lib/nice-classes"

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

type Lang = "en" | "es"

const copy = {
  en: {
    eyebrow: "Free Brand Clone Scan — limited to 20 brands this month",
    heroTitle1: "Someone may be selling",
    heroTitle2: "as you right now.",
    heroSub:
      "Fake Instagram shops. Cloned TikTok accounts. AI-generated ads using your face and your brand. We scan every major platform for impersonations of your business — and send you a lawyer-reviewed report of everything we find. Free.",
    heroCta: "Get my free scan",
    heroTrust:
      "Run by the intellectual property attorneys at Fernández Lacort. No software trial, no credit card — a real scan by real people.",
    problemKicker: "The problem",
    problemTitle: "The clone economy is booming — and small brands are the target.",
    problemItems: [
      {
        tag: "Impersonation fraud",
        text: "Business impersonation is one of the most-reported fraud types to the FTC, with billions of dollars in combined losses every year.",
      },
      {
        tag: "AI-generated scams",
        text: "Deepfakes now account for 11% of global fraud — and small businesses, not corporations, are the prime target.",
      },
      {
        tag: "Silent damage",
        text: "Clones don't just steal sales. They scam your customers, tank your reputation, and poison your ad performance — usually before you ever notice them.",
      },
    ],
    problemQuote:
      "“Most brands find out about their clone from an angry customer who got scammed. By then the damage is done.”",
    scanKicker: "What we scan",
    scanTitle: "One scan. Every place your clone could be hiding.",
    scanRows: [
      ["Instagram & Facebook", "Clone accounts, lookalike handles, fake “official” shops, scam ads in the Ad Library"],
      ["TikTok", "Impersonator profiles, stolen content re-posted to sell counterfeits"],
      ["Google", "Copycat websites, lookalike domains, fake listings ranking on your name"],
      ["Marketplaces", "Amazon, MercadoLibre, eBay — unauthorized sellers, counterfeit listings, listing hijacks"],
      ["AI impersonation", "Deepfake ads and AI-generated content using your brand, your products, or your face"],
      ["Trademark databases", "Whether someone has filed — or could file — your name before you"],
    ],
    getKicker: "What you get",
    getTitle: "A report you can act on the same day.",
    getIntro: "Within 72 hours you receive your Brand Clone Report (PDF):",
    getItems: [
      ["Every impersonation we found", "Screenshots, links, and risk level for each."],
      [
        "Your trademark exposure",
        "Is your brand actually registered? Could a squatter take it from you? This is where most brands get a nasty surprise.",
      ],
      [
        "Your action plan",
        "Exactly what to take down first and how, written in plain language by an IP attorney.",
      ],
    ],
    whoKicker: "Who's behind this",
    whoTitle: "Attorneys, not algorithms.",
    whoText:
      "Just Protected is built by Fernández Lacort, an intellectual property law firm. That difference matters: platforms deprioritize automated bot reports, but takedown requests filed by rights-holders' attorneys get processed. If your scan finds something, you'll know your next step is backed by people who do this for a living — not a ticket in a queue.",
    faqKicker: "Questions",
    faqTitle: "Fair questions, straight answers",
    faq: [
      [
        "Why is it free?",
        "It's how we earn your trust. Some brands will want our help acting on the report — monitoring, takedowns, or trademark registration. Many won't, and that's fine. The report is yours either way, no strings.",
      ],
      [
        "What do you need from me?",
        "Five minutes: your brand name, website, official social handles, and your main products. We do the rest.",
      ],
      [
        "Is this automated?",
        "The searching uses tools; the analysis doesn't. Every report is reviewed by an IP attorney before it reaches you.",
      ],
      [
        "What if you find nothing?",
        "Then you get something rare: documented peace of mind — plus your trademark exposure check, which is valuable on its own.",
      ],
      [
        "My brand is small. Is this for me?",
        "Small brands are exactly who cloners target, because they assume you won't fight back. If you sell online under a brand name, this is for you.",
      ],
    ],
    formKicker: "20 free scans this month. Then the waitlist.",
    formTitle: "Claim your free Brand Clone Scan",
    formSub:
      "Each scan is done by hand and reviewed by an attorney, so we cap them. If clones are out there, better you find them before your customers do.",
    fields: {
      brandName: "Brand name *",
      website: "Website URL (if you have one)",
      instagram: "Instagram handle (if you have one)",
      youtubeChannel: "Your YouTube channel (if you have one)",
      otherAccounts: "Other official accounts (TikTok, Facebook, X)",
      products: "What do you sell? (1–2 lines) *",
      category: "What industry is your brand in?",
      categoryHint: "Helps us tell you whether a registration we find actually overlaps your business.",
      salesChannels: "Where do you sell?",
      salesOptions: ["My own website", "Amazon", "MercadoLibre", "Other"],
      trademarkRegistered: "Have you registered your trademark?",
      tmOptions: ["Yes", "No", "Not sure"],
      seenFake: "Have you already seen a fake account or copycat?",
      seenOptions: ["Yes", "No", "Not sure"],
      seenDetail: "If yes — tell us what you saw (link or description)",
      email: "Email *",
      country: "Country *",
      submit: "Get my free Brand Clone Scan",
      sending: "Sending…",
    },
    successTitle: "Request received.",
    successText:
      "We'll run your scan and send the report to your email within 72 hours. Check your inbox for a confirmation.",
    disclaimer:
      "The free Brand Clone Scan is an informational review and does not constitute legal advice or create an attorney–client relationship. Findings are based on publicly available information at the time of the scan and may not be exhaustive.",
  },
  es: {
    eyebrow: "Escaneo gratuito de clones de marca — solo 20 marcas este mes",
    heroTitle1: "Alguien puede estar vendiendo",
    heroTitle2: "como vos ahora mismo.",
    heroSub:
      "Tiendas falsas en Instagram. Cuentas clonadas en TikTok. Publicidades hechas con IA usando tu cara y tu marca. Escaneamos todas las plataformas buscando imitaciones de tu negocio — y te enviamos un informe revisado por abogados con todo lo que encontramos. Gratis.",
    heroCta: "Quiero mi escaneo gratis",
    heroTrust:
      "Realizado por los abogados de propiedad intelectual de Fernández Lacort. Sin software de prueba, sin tarjeta de crédito: un escaneo real, hecho por personas.",
    problemKicker: "El problema",
    problemTitle: "La economía de los clones está en auge — y las marcas chicas son el blanco.",
    problemItems: [
      {
        tag: "Suplantación de empresas",
        text: "La suplantación de empresas es uno de los fraudes más denunciados, con miles de millones de dólares en pérdidas cada año.",
      },
      {
        tag: "Estafas con IA",
        text: "Los deepfakes ya representan el 11% del fraude global — y el blanco principal son las pymes, no las multinacionales.",
      },
      {
        tag: "Daño silencioso",
        text: "Un clon no solo te roba ventas: estafa a tus clientes, destruye tu reputación y arruina el rendimiento de tus anuncios — casi siempre antes de que te enteres.",
      },
    ],
    problemQuote:
      "“La mayoría de las marcas descubre a su clon por un cliente enojado que fue estafado. Para entonces, el daño ya está hecho.”",
    scanKicker: "Qué escaneamos",
    scanTitle: "Un escaneo. Todos los lugares donde tu clon puede esconderse.",
    scanRows: [
      ["Instagram y Facebook", "Cuentas clonadas, usuarios parecidos, tiendas “oficiales” falsas, anuncios truchos en la Biblioteca de Anuncios"],
      ["TikTok", "Perfiles impostores, contenido robado re-subido para vender falsificaciones"],
      ["Google", "Sitios copia, dominios parecidos, resultados falsos posicionando con tu nombre"],
      ["Marketplaces", "MercadoLibre, Amazon, eBay — vendedores no autorizados, publicaciones falsificadas, secuestro de publicaciones"],
      ["Suplantación con IA", "Deepfakes y contenido generado con IA usando tu marca, tus productos o tu cara"],
      ["Bases de marcas", "Si alguien registró — o podría registrar — tu nombre antes que vos"],
    ],
    getKicker: "Qué recibís",
    getTitle: "Un informe para actuar el mismo día.",
    getIntro: "En un máximo de 72 horas recibís tu Informe de Clones de Marca (PDF):",
    getItems: [
      ["Cada imitación que encontramos", "Capturas, enlaces y nivel de riesgo de cada una."],
      [
        "Tu exposición marcaria",
        "¿Tu marca está realmente registrada? ¿Puede un tercero quitártela? Acá es donde la mayoría se lleva la peor sorpresa.",
      ],
      [
        "Tu plan de acción",
        "Qué dar de baja primero y cómo, explicado en lenguaje claro por un abogado de PI.",
      ],
    ],
    whoKicker: "Quiénes estamos detrás",
    whoTitle: "Abogados, no algoritmos.",
    whoText:
      "Just Protected es un proyecto de Fernández Lacort, estudio de propiedad intelectual. Y esa diferencia importa: las plataformas ignoran las denuncias automatizadas de bots, pero procesan los reclamos presentados por abogados del titular de la marca. Si tu escaneo encuentra algo, tu siguiente paso está respaldado por gente que hace esto profesionalmente — no por un ticket en una cola de soporte.",
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Preguntas justas, respuestas directas",
    faq: [
      [
        "¿Por qué es gratis?",
        "Es nuestra forma de ganarnos tu confianza. Algunas marcas van a querer nuestra ayuda para actuar sobre el informe — monitoreo, bajas o registro de marca. Muchas no, y está perfecto. El informe es tuyo igual, sin compromiso.",
      ],
      [
        "¿Qué necesitan de mí?",
        "Cinco minutos: el nombre de tu marca, tu web, tus redes oficiales y tus productos principales. Del resto nos encargamos nosotros.",
      ],
      [
        "¿Es automatizado?",
        "La búsqueda usa herramientas; el análisis no. Cada informe lo revisa un abogado de propiedad intelectual antes de llegarte.",
      ],
      [
        "¿Y si no encuentran nada?",
        "Te llevás algo poco común: tranquilidad documentada — más el chequeo de tu situación marcaria, que vale por sí solo.",
      ],
      [
        "Mi marca es chica. ¿Esto es para mí?",
        "Las marcas chicas son exactamente el blanco de los clonadores, porque asumen que no te vas a defender. Si vendés online con un nombre de marca, esto es para vos.",
      ],
    ],
    formKicker: "20 escaneos gratis este mes. Después, lista de espera.",
    formTitle: "Pedí tu Escaneo de Clones gratis",
    formSub:
      "Cada escaneo se hace a mano y lo revisa un abogado, por eso el cupo. Si hay clones dando vueltas, mejor que los encuentres vos antes que tus clientes.",
    fields: {
      brandName: "Nombre de la marca *",
      website: "Sitio web (si tenés)",
      instagram: "Instagram oficial (si tenés)",
      youtubeChannel: "Tu canal de YouTube (si tenés)",
      otherAccounts: "Otras cuentas oficiales (TikTok, Facebook, X)",
      products: "¿Qué vendés? (1–2 líneas) *",
      category: "¿En qué rubro está tu marca?",
      categoryHint: "Nos sirve para decirte si un registro que encontremos realmente se cruza con tu negocio.",
      salesChannels: "¿Dónde vendés?",
      salesOptions: ["Mi propia web", "Amazon", "MercadoLibre", "Otro"],
      trademarkRegistered: "¿Tenés tu marca registrada?",
      tmOptions: ["Sí", "No", "No estoy seguro"],
      seenFake: "¿Ya viste alguna cuenta falsa o copia?",
      seenOptions: ["Sí", "No", "No estoy seguro"],
      seenDetail: "Si viste algo — contanos qué (link o descripción)",
      email: "Email *",
      country: "País *",
      submit: "Pedir mi Escaneo de Clones gratis",
      sending: "Enviando…",
    },
    successTitle: "Solicitud recibida.",
    successText:
      "Vamos a correr tu escaneo y enviarte el informe por email en un máximo de 72 horas. Revisá tu casilla: te llega una confirmación.",
    disclaimer:
      "El Escaneo de Clones de Marca gratuito es una revisión informativa y no constituye asesoramiento legal ni crea una relación abogado–cliente. Los hallazgos se basan en información pública disponible al momento del escaneo y pueden no ser exhaustivos.",
  },
} as const

const inputCls =
  "w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-gray-400"
const labelCls = "block text-sm font-medium text-primary mb-1.5"

export function CloneScanLanding({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/scan-count")
      .then((r) => r.json())
      .then((d) => setRemaining(typeof d?.remaining === "number" ? d.remaining : null))
      .catch(() => setRemaining(null))
  }, [])

  const scrollToForm = () => {
    document.getElementById("scan-form")?.scrollIntoView({ behavior: "smooth" })
  }

  // Real count from the DB, not the evergreen "20" in the static copy —
  // falls back to the static line while loading or if the count fails.
  const eyebrowText =
    remaining === null
      ? t.eyebrow
      : lang === "es"
        ? `Escaneo gratuito de clones de marca — ${remaining > 0 ? `quedan ${remaining} de 20 este mes` : "cupo lleno este mes"}`
        : `Free Brand Clone Scan — ${remaining > 0 ? `${remaining} of 20 spots left this month` : "fully booked this month"}`
  const formKickerText =
    remaining === null
      ? t.formKicker
      : lang === "es"
        ? remaining > 0
          ? `Quedan ${remaining} escaneos gratis este mes. Después, lista de espera.`
          : "Cupo gratis lleno este mes. Sumate a la lista de espera."
        : remaining > 0
          ? `${remaining} free scans left this month. Then the waitlist.`
          : "Free scans are full this month. Join the waitlist."

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)
    const brand = (data.get("brandName") as string) || "Unknown brand"
    data.append("formType", "clone-scan")
    data.append("trademarkName", `Clone Scan — ${brand}`)
    data.append("lang", lang)
    try {
      await fetch("/api/submit-free-search", { method: "POST", body: data })
    } catch {
      // Route always succeeds server-side; network errors shouldn't strand the user
    }
    setStatus("done")
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="label-caps text-accent mb-8">{eyebrowText}</p>

              <h1 className="font-serif text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                {t.heroTitle1}
                <br />
                <span className="italic text-accent">{t.heroTitle2}</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                {t.heroSub}
              </p>

              <div className="flex justify-center mb-12">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  {t.heroCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              <p className="label-caps text-[0.65rem] text-white/40 max-w-xl mx-auto">{t.heroTrust}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">{t.problemKicker}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5 text-balance">
              {t.problemTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            {t.problemItems.map((item) => (
              <motion.div key={item.tag} {...fade} className="border-t border-primary/15 pt-6">
                <p className="label-caps text-accent text-[0.65rem] mb-3">{item.tag}</p>
                <p className="text-gray-600 font-light leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fade}
            className="font-serif italic text-xl md:text-2xl text-primary/80 text-center max-w-2xl mx-auto leading-relaxed"
          >
            {t.problemQuote}
          </motion.p>
        </div>
      </section>

      {/* WHAT WE SCAN */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">{t.scanKicker}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight text-balance">{t.scanTitle}</h2>
          </motion.div>

          <div className="divide-y divide-primary/10 border-y border-primary/10">
            {t.scanRows.map(([where, what]) => (
              <motion.div key={where} {...fade} className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8 py-6">
                <p className="font-semibold text-primary">{where}</p>
                <p className="text-gray-600 font-light leading-relaxed">{what}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">{t.getKicker}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight mb-5 text-balance">{t.getTitle}</h2>
            <p className="text-white/60 font-light">{t.getIntro}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-14">
            {t.getItems.map(([title, desc], i) => (
              <motion.div key={title} {...fade} className="border-t border-white/20 pt-6">
                <p className="font-serif text-accent text-2xl mb-3">{i + 1}</p>
                <p className="font-semibold text-white mb-2">{title}</p>
                <p className="text-white/60 font-light leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="text-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
            >
              {t.heroCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* WHO'S BEHIND */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div {...fade}>
            <p className="label-caps text-accent mb-5">{t.whoKicker}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-8">{t.whoTitle}</h2>
            <p className="text-gray-600 font-light leading-relaxed text-lg">{t.whoText}</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fade} className="text-center mb-14">
            <p className="label-caps text-accent mb-5">{t.faqKicker}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight">{t.faqTitle}</h2>
          </motion.div>

          <motion.div {...fade}>
            <Accordion type="single" collapsible className="w-full">
              {t.faq.map(([q, a], i) => (
                <AccordionItem value={`faq-${i}`} key={q}>
                  <AccordionTrigger className="text-left text-primary font-medium">{q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 font-light leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* FORM */}
      <section id="scan-form" className="py-24 md:py-32 bg-white scroll-mt-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div {...fade} className="text-center mb-12">
            <p className="label-caps text-accent mb-5">{formKickerText}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">{t.formTitle}</h2>
            <p className="text-gray-500 font-light max-w-xl mx-auto">{t.formSub}</p>
          </motion.div>

          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-primary/15 rounded-lg p-10 text-center"
            >
              <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-4" />
              <p className="font-serif text-2xl text-primary mb-2">{t.successTitle}</p>
              <p className="text-gray-600 font-light">{t.successText}</p>
            </motion.div>
          ) : (
            <motion.form {...fade} onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="brandName" className={labelCls}>
                    {t.fields.brandName}
                  </label>
                  <input id="brandName" name="brandName" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="website" className={labelCls}>
                    {t.fields.website}
                  </label>
                  <input id="website" name="website" className={inputCls} placeholder="https://" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="instagram" className={labelCls}>
                    {t.fields.instagram}
                  </label>
                  <input id="instagram" name="instagram" className={inputCls} placeholder="@" />
                </div>
                <div>
                  <label htmlFor="youtubeChannel" className={labelCls}>
                    {t.fields.youtubeChannel}
                  </label>
                  <input id="youtubeChannel" name="youtubeChannel" className={inputCls} placeholder="@" />
                </div>
              </div>

              <div>
                <label htmlFor="otherAccounts" className={labelCls}>
                  {t.fields.otherAccounts}
                </label>
                <input id="otherAccounts" name="otherAccounts" className={inputCls} />
              </div>

              <div>
                <label htmlFor="products" className={labelCls}>
                  {t.fields.products}
                </label>
                <textarea id="products" name="products" required rows={2} className={inputCls} />
              </div>

              <div>
                <label htmlFor="category" className={labelCls}>
                  {t.fields.category}
                </label>
                <select id="category" name="category" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    {lang === "es" ? "Elegí una opción" : "Choose one"}
                  </option>
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {lang === "es" ? c.labelEs : c.labelEn}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-[#6b6558]">{t.fields.categoryHint}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="salesChannels" className={labelCls}>
                    {t.fields.salesChannels}
                  </label>
                  <select id="salesChannels" name="salesChannels" className={inputCls} defaultValue={t.fields.salesOptions[0]}>
                    {t.fields.salesOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="trademarkRegistered" className={labelCls}>
                    {t.fields.trademarkRegistered}
                  </label>
                  <select id="trademarkRegistered" name="trademarkRegistered" className={inputCls} defaultValue={t.fields.tmOptions[2]}>
                    {t.fields.tmOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="seenFake" className={labelCls}>
                    {t.fields.seenFake}
                  </label>
                  <select id="seenFake" name="seenFake" className={inputCls} defaultValue={t.fields.seenOptions[1]}>
                    {t.fields.seenOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="seenFakeDetail" className={labelCls}>
                  {t.fields.seenDetail}
                </label>
                <input id="seenFakeDetail" name="seenFakeDetail" className={inputCls} />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className={labelCls}>
                    {t.fields.email}
                  </label>
                  <input id="email" name="email" type="email" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="country" className={labelCls}>
                    {t.fields.country}
                  </label>
                  <input id="country" name="country" required className={inputCls} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300 disabled:opacity-60"
              >
                {status === "sending" ? t.fields.sending : t.fields.submit}
                {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </motion.form>
          )}

          <p className="text-xs text-gray-400 font-light leading-relaxed mt-10 text-center">{t.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
