"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("discount-popup-seen")
    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("discount-popup-seen", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/discount-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        localStorage.setItem("discount-popup-seen", "true")
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsOpen(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Percent className="w-4 h-4 text-white" />
            </div>
            ¡Oferta Especial!
          </DialogTitle>
        </DialogHeader>

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </button>

        {!isSubmitted ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10% OFF</div>
              <p className="text-slate-600">En tu primera marca registrada</p>
              <p className="text-sm text-slate-500 mt-2">Déjanos tu email y recibe el código de descuento</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                  Ahora no
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? "Enviando..." : "Obtener descuento"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">¡Perfecto!</h3>
              <p className="text-slate-600">Te hemos enviado el código de descuento del 10% a tu email.</p>
              <p className="text-sm text-slate-500 mt-2">Revisa tu bandeja de entrada y spam.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
