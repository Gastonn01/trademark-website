"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Download, RefreshCw } from "lucide-react"

interface DiscountSignup {
  id: string
  email: string
  created_at: string
}

export function DiscountSignupsAdmin() {
  const [signups, setSignups] = useState<DiscountSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<string>("")

  const fetchSignups = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/discount-signups")
      const result = await response.json()

      if (result.success) {
        setSignups(result.data)
        setSource(result.source)
      }
    } catch (error) {
      console.error("Error fetching discount signups:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  const exportEmails = () => {
    const emailList = signups.map((signup) => signup.email).join("\n")
    const blob = new Blob([emailList], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "discount-signups.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Emails de Descuento ({signups.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={fetchSignups} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
            <Button onClick={exportEmails} variant="outline" size="sm" disabled={signups.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        <p className="text-sm text-slate-600">Fuente: {source === "supabase" ? "Base de datos" : "Memoria temporal"}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-slate-600">Cargando emails...</p>
          </div>
        ) : signups.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No hay emails registrados aún</p>
          </div>
        ) : (
          <div className="space-y-2">
            {signups.map((signup) => (
              <div key={signup.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{signup.email}</p>
                  <p className="text-sm text-slate-500">{new Date(signup.created_at).toLocaleString("es-ES")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
