"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, FileSearch, Mail, Package, MessageCircle, CreditCard, Loader2 } from "lucide-react"

export default function EstudioFactibilidadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    marca: "",
    productos: "",
    email: "",
  })
  const [contactData, setContactData] = useState({
    email: "",
    pregunta: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-feasibility-study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setShowPayment(true)
        toast({
          title: "¡Solicitud recibida!",
          description: "Ahora puedes proceder al pago.",
        })
      } else {
        throw new Error(data.error || "Error al enviar la solicitud")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar la solicitud",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingContact(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          name: "Consulta desde Estudio de Factibilidad",
          email: contactData.email,
          subject: "Pregunta sobre Estudio de Factibilidad",
          message: contactData.pregunta,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "¡Pregunta enviada!",
          description: "Te responderemos a la brevedad.",
        })
        setContactData({ email: "", pregunta: "" })
      } else {
        throw new Error(data.error || "Error al enviar la pregunta")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar la pregunta",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    setPaymentError(null)

    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "Estudio de Factibilidad",
          total: 10000,
          email: formData.email,
          trademarkName: formData.marca,
          products: formData.productos,
          type: "feasibility_study",
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.init_point) {
        window.open(data.init_point, "_blank")
      } else {
        throw new Error("No se pudo generar el link de pago")
      }
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : "Error procesando el pago")
    } finally {
      setPaymentLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileSearch className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Estudio de Factibilidad de Registro</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Analizamos la viabilidad de registrar tu marca antes de iniciar el proceso formal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>¿Qué incluye?</CardTitle>
              <CardDescription>Análisis completo de tu marca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Búsqueda de antecedentes</p>
                  <p className="text-sm text-slate-600">Verificamos si existen marcas similares registradas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Análisis de viabilidad</p>
                  <p className="text-sm text-slate-600">Evaluamos las posibilidades de éxito del registro</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Recomendaciones</p>
                  <p className="text-sm text-slate-600">Te sugerimos mejoras o alternativas si es necesario</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Informe detallado</p>
                  <p className="text-sm text-slate-600">Recibes un reporte completo con nuestro análisis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl">Inversión</CardTitle>
              <CardDescription>Precio especial de lanzamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">$10.000</div>
                <p className="text-slate-600 mb-6">Pago único</p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Respuesta en 48-72 horas
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Informe profesional completo
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Asesoramiento personalizado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        {!showPayment ? (
          <Card>
            <CardHeader>
              <CardTitle>Solicitar Estudio de Factibilidad</CardTitle>
              <CardDescription>Completa el formulario para continuar con el pago</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="marca">
                    <div className="flex items-center gap-2">
                      <FileSearch className="w-4 h-4" />
                      Nombre de la Marca
                    </div>
                  </Label>
                  <Input
                    id="marca"
                    name="marca"
                    placeholder="Ej: Mi Marca Innovadora"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-slate-500">El nombre exacto que deseas registrar</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productos">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Productos o Servicios
                    </div>
                  </Label>
                  <Textarea
                    id="productos"
                    name="productos"
                    placeholder="Ej: Venta de ropa deportiva, calzado y accesorios para deportes"
                    value={formData.productos}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                  <p className="text-sm text-slate-500">Describe brevemente a qué se dedica tu marca</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Correo Electrónico
                    </div>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-slate-500">Te enviaremos el link de pago a este correo</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Continuar al Pago"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">¡Solo falta el pago!</CardTitle>
              <CardDescription className="text-center">
                Completa tu pago para que podamos comenzar con el estudio de factibilidad
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-slate-50 p-6 rounded-lg mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Marca:</span>
                    <span className="font-semibold">{formData.marca}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total a pagar:</span>
                      <span className="text-3xl font-bold text-blue-600">$10.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-semibold">Error al crear la preferencia de pago</p>
                  <p className="text-sm mt-1">{paymentError}</p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-6"
                size="lg"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceder al Pago con MercadoPago
                  </>
                )}
              </Button>

              <p className="text-sm text-center text-slate-500 mt-4">Pago 100% seguro con MercadoPago</p>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Una vez confirmado el pago, comenzaremos inmediatamente con el proceso de
                  estudio de factibilidad de tu marca.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="mt-8 border-slate-200">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-2 mx-auto">
              <MessageCircle className="w-6 h-6 text-slate-600" />
            </div>
            <CardTitle>¿Tienes alguna pregunta?</CardTitle>
            <CardDescription>Contáctanos y te responderemos a la brevedad</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Tu Correo Electrónico
                  </div>
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pregunta">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Tu Pregunta
                  </div>
                </Label>
                <Textarea
                  id="pregunta"
                  name="pregunta"
                  placeholder="Escribe tu pregunta aquí..."
                  value={contactData.pregunta}
                  onChange={handleContactChange}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-700" disabled={isSubmittingContact}>
                {isSubmittingContact ? "Enviando..." : "Enviar Pregunta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
