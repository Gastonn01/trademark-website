"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function AgentContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    matricula: "",
    experiencia: "",
    especialidades: [] as string[],
    ubicacion: "",
    capacidad: "",
    tarifas: "",
    comentarios: "",
    acepta_terminos: false,
  })

  const { toast } = useToast()

  const especialidadesOptions = [
    "Registro de marcas nacionales",
    "Registro de marcas internacionales",
    "Búsquedas de antecedentes",
    "Oposiciones y cancelaciones",
    "Renovaciones de marcas",
    "Diseños industriales",
    "Patentes de invención",
    "Modelos de utilidad",
    "Derecho de autor",
    "Nombres de dominio",
    "Competencia desleal",
    "Contratos de licencia",
  ]

  const handleEspecialidadChange = (especialidad: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      especialidades: checked
        ? [...prev.especialidades, especialidad]
        : prev.especialidades.filter((e) => e !== especialidad),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acepta_terminos) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return
    }

    if (formData.especialidades.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos una especialidad",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-agent-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "¡Formulario enviado!",
          description: "Nos pondremos en contacto contigo pronto para evaluar tu incorporación.",
        })

        // Reset form
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          matricula: "",
          experiencia: "",
          especialidades: [],
          ubicacion: "",
          capacidad: "",
          tarifas: "",
          comentarios: "",
          acepta_terminos: false,
        })
      } else {
        throw new Error("Error al enviar el formulario")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el formulario. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Formulario de Registro para Agentes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => setFormData((prev) => ({ ...prev, apellido: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Información Profesional */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="matricula">Número de Matrícula *</Label>
              <Input
                id="matricula"
                value={formData.matricula}
                onChange={(e) => setFormData((prev) => ({ ...prev, matricula: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experiencia">Años de Experiencia en Propiedad Intelectual *</Label>
            <Select
              value={formData.experiencia}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, experiencia: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu experiencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 años</SelectItem>
                <SelectItem value="3-5">3-5 años</SelectItem>
                <SelectItem value="6-10">6-10 años</SelectItem>
                <SelectItem value="11-15">11-15 años</SelectItem>
                <SelectItem value="15+">Más de 15 años</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Especialidades */}
          <div className="space-y-3">
            <Label>Especialidades * (selecciona todas las que apliquen)</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {especialidadesOptions.map((especialidad) => (
                <div key={especialidad} className="flex items-center space-x-2">
                  <Checkbox
                    id={especialidad}
                    checked={formData.especialidades.includes(especialidad)}
                    onCheckedChange={(checked) => handleEspecialidadChange(especialidad, checked as boolean)}
                  />
                  <Label htmlFor={especialidad} className="text-sm font-normal">
                    {especialidad}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación *</Label>
            <Input
              id="ubicacion"
              value={formData.ubicacion}
              onChange={(e) => setFormData((prev) => ({ ...prev, ubicacion: e.target.value }))}
              placeholder="Ciudad, Provincia"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad Mensual de Casos *</Label>
            <Select
              value={formData.capacidad}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, capacidad: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="¿Cuántos casos puedes manejar por mes?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 casos</SelectItem>
                <SelectItem value="6-10">6-10 casos</SelectItem>
                <SelectItem value="11-20">11-20 casos</SelectItem>
                <SelectItem value="21-30">21-30 casos</SelectItem>
                <SelectItem value="30+">Más de 30 casos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tarifas">Rango de Tarifas (opcional)</Label>
            <Textarea
              id="tarifas"
              value={formData.tarifas}
              onChange={(e) => setFormData((prev) => ({ ...prev, tarifas: e.target.value }))}
              placeholder="Ej: Registro de marca nacional: $50,000 - $80,000"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios Adicionales</Label>
            <Textarea
              id="comentarios"
              value={formData.comentarios}
              onChange={(e) => setFormData((prev) => ({ ...prev, comentarios: e.target.value }))}
              placeholder="Cuéntanos sobre tu experiencia, casos destacados, o cualquier información adicional..."
              rows={4}
            />
          </div>

          {/* Términos y Condiciones */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terminos"
              checked={formData.acepta_terminos}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acepta_terminos: checked as boolean }))}
            />
            <Label htmlFor="terminos" className="text-sm">
              Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales *
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
