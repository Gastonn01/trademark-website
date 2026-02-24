"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Mail, MapPin, Clock } from "lucide-react"

export function ContactContent() {
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          name,
          email,
          subject,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        router.push("/gracias-contacto")
      } else {
        throw new Error(result.error || "Error desconocido")
      }
    } catch (error) {
      console.error("❌ Form submission error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error enviando mensaje. Por favor intenta más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Estamos aquí para ayudarte</h1>
          <p className="text-xl text-sky-50 max-w-2xl mx-auto">
            ¿Tienes dudas sobre el registro de marcas? Nuestro equipo de expertos está listo para asesorarte
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-white shadow-md border-sky-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Mail className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:trakmar@proton.me" className="text-sky-600 hover:text-sky-700">
                      trakmar@proton.me
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Clock className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Horario de atención</p>
                    <p className="text-gray-600 text-sm">Lunes a Viernes</p>
                    <p className="text-gray-600 text-sm">9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Argentina</p>
                    <p className="text-gray-600 text-sm">Servicio en todo el país</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <h3 className="font-bold text-gray-900 mb-2">Respuesta rápida</h3>
              <p className="text-sm text-gray-600">
                Nos esforzamos por responder todas las consultas en menos de 24 horas hábiles
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white shadow-lg border-sky-100">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Envíanos un mensaje</h2>
              <p className="text-gray-600 mb-6">Completa el formulario y nos pondremos en contacto contigo</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan Pérez"
                      required
                      className="border-gray-300 focus:border-sky-500 focus:ring-sky-200 bg-white text-gray-900 h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@ejemplo.com"
                      required
                      className="border-gray-300 focus:border-sky-500 focus:ring-sky-200 bg-white text-gray-900 h-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-200 bg-white text-gray-900 h-11"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos con detalle tu consulta..."
                    rows={6}
                    required
                    className="border-gray-300 focus:border-sky-500 focus:ring-sky-200 bg-white text-gray-900 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white h-12 text-base font-semibold shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas que nos comuniquemos contigo por email
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
