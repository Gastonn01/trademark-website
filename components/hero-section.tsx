"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Award, Globe2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-sky-50" />

      {/* Subtle top pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(2,132,199,0.18)_1px,transparent_0)] [background-size:22px_22px] opacity-40" />

      {/* Soft spotlight behind the hero area */}
      <div className="pointer-events-none absolute left-1/2 top-[44%] -z-0 h-[520px] w-[1200px] -translate-x-1/2 rounded-[999px] bg-sky-300 opacity-30 blur-3xl" />

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          {/* Centered headline + subheadline + CTAs */}
          <div className="mx-auto max-w-5xl pt-24 pb-8 text-center md:pt-28">
            <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-sky-300/70 bg-white/60 px-4 py-2 text-sm font-medium text-sky-800 backdrop-blur">
              <Award className="mr-2 h-4 w-4" />
              Agentes Registrados ante INPI • Más de 500 Marcas Registradas
            </div>

            <h1 className="mx-auto mb-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Proteja su Marca con
              <span className="block text-sky-700">Profesionales Certificados</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Conectamos su empresa con agentes especializados registrados ante el INPI. Experiencia comprobada en
              registro de marcas a nivel nacional e internacional con respaldo legal garantizado.
            </p>

            <div className="mx-auto flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-slate-900 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
              >
                <Link href="/registro-marca" className="flex items-center">
                  Iniciar Registro
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-lg border-2 border-slate-300 bg-white px-8 text-base font-semibold text-slate-900 transition-all hover:bg-slate-50"
                onClick={() => {
                  const section = document.getElementById("proceso")
                  section?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Conocer el Proceso
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
                  <Award className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-slate-900">Agentes Certificados INPI</h3>
                <p className="text-sm text-slate-600">
                  Profesionales matriculados con registro vigente ante el Instituto Nacional de Propiedad Industrial
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-slate-900">+500 Marcas Registradas</h3>
                <p className="text-sm text-slate-600">
                  Experiencia comprobada en registros exitosos a nivel nacional e internacional
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Globe2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-slate-900">Cobertura Internacional</h3>
                <p className="text-sm text-slate-600">
                  Asesoramiento especializado para registro de marcas en múltiples jurisdicciones
                </p>
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </section>
  )
}
