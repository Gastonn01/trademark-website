"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Mail } from "lucide-react"

export default function EmailTestPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("trakmar@proton.me") // Updated default test email to trakmar@proton.me
  const [testMessage, setTestMessage] = useState(
    "Este es un email de prueba para verificar la configuración de Resend.",
  )

  const runDiagnostic = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/email-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testEmail,
          testMessage,
        }),
      })
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Error conectando con el servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const StatusIcon = ({ status }: { status: boolean | null }) => {
    if (status === null) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    return status ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnóstico de Email</h1>
        <p className="text-gray-600">Verifica la configuración de Resend y prueba el envío de emails</p>
      </div>

      <div className="grid gap-6">
        {/* Test Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Prueba de Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email de destino:</label>
              <Input
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="email@ejemplo.com"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mensaje de prueba:</label>
              <Textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={3}
                placeholder="Mensaje de prueba..."
              />
            </div>
            <Button onClick={runDiagnostic} disabled={isLoading} className="w-full">
              {isLoading ? "Ejecutando diagnóstico..." : "Ejecutar Diagnóstico y Enviar Prueba"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados del Diagnóstico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Configuration Status */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Estado de Configuración</h3>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>API Key de Resend</span>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={testResult.config?.hasApiKey} />
                    <Badge variant={testResult.config?.hasApiKey ? "default" : "destructive"}>
                      {testResult.config?.hasApiKey ? "Configurada" : "No configurada"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Formato de API Key</span>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={testResult.config?.validFormat} />
                    <Badge variant={testResult.config?.validFormat ? "default" : "destructive"}>
                      {testResult.config?.validFormat ? "Válido" : "Inválido"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Inicialización de Resend</span>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={testResult.config?.resendInitialized} />
                    <Badge variant={testResult.config?.resendInitialized ? "default" : "destructive"}>
                      {testResult.config?.resendInitialized ? "Exitosa" : "Falló"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Email Test Results */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Resultado del Envío</h3>

                {testResult.emailSent ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>✅ Email enviado exitosamente. ID: {testResult.emailId}</AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>❌ Error enviando email: {testResult.emailError}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Recommendations */}
              {testResult.recommendations && testResult.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Recomendaciones</h3>
                  <div className="space-y-2">
                    {testResult.recommendations.map((rec: string, index: number) => (
                      <Alert key={index}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{rec}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Response */}
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">Ver respuesta completa</summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instrucciones de Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Configurar API Key en Vercel:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Ve a tu dashboard de Vercel</li>
                <li>Selecciona tu proyecto</li>
                <li>Ve a Settings → Environment Variables</li>
                <li>
                  Agrega: <code className="bg-gray-100 px-1 rounded">RESEND_API_KEY</code>
                </li>
                <li>
                  El valor debe empezar con <code className="bg-gray-100 px-1 rounded">re_</code>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Verificar dominio en Resend:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Ve a tu dashboard de Resend</li>
                <li>Ve a Domains</li>
                <li>
                  Verifica que <code className="bg-gray-100 px-1 rounded">trakmar.com</code> esté verificado
                </li>
                <li>O cambia el dominio en el código por uno verificado</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Verificar límites de Resend:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Plan gratuito: 100 emails/día, 3,000/mes</li>
                <li>Revisa tu uso en el dashboard de Resend</li>
                <li>Verifica que no hayas alcanzado los límites</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
