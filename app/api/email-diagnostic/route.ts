import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { testEmail, testMessage } = data

  const diagnostic = {
    config: {
      hasApiKey: false,
      validFormat: false,
      resendInitialized: false,
      apiKeyPreview: "",
    },
    emailSent: false,
    emailId: null,
    emailError: null,
    recommendations: [] as string[],
    timestamp: new Date().toISOString(),
  }

  try {
    // Check API Key
    const apiKey = process.env.RESEND_API_KEY
    diagnostic.config.hasApiKey = !!apiKey

    if (apiKey) {
      diagnostic.config.apiKeyPreview = `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`
      diagnostic.config.validFormat = apiKey.startsWith("re_") && apiKey.length > 10
    }

    if (!diagnostic.config.hasApiKey) {
      diagnostic.recommendations.push("Configura la variable de entorno RESEND_API_KEY en Vercel")
      return NextResponse.json(diagnostic)
    }

    if (!diagnostic.config.validFormat) {
      diagnostic.recommendations.push("La API Key debe empezar con 're_' y tener el formato correcto")
      return NextResponse.json(diagnostic)
    }

    // Try to initialize Resend
    let resend: Resend
    try {
      resend = new Resend(apiKey)
      diagnostic.config.resendInitialized = true
    } catch (error) {
      diagnostic.config.resendInitialized = false
      diagnostic.recommendations.push(
        `Error inicializando Resend: ${error instanceof Error ? error.message : "Error desconocido"}`,
      )
      return NextResponse.json(diagnostic)
    }

    // Try to send test email
    try {
      const emailContent = `
🧪 EMAIL DE PRUEBA - DIAGNÓSTICO DE CONFIGURACIÓN

Este es un email de prueba para verificar que la configuración de Resend está funcionando correctamente.

📧 Enviado a: ${testEmail}
🕐 Fecha: ${new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}

💬 Mensaje de prueba:
${testMessage}

---
Si recibes este email, la configuración está funcionando correctamente.
      `

      const result = await resend.emails.send({
        from: "Trakmar Test <noreply@trakmar.com>",
        to: [testEmail],
        subject: "🧪 Prueba de configuración de email - Trakmar",
        text: emailContent,
      })

      diagnostic.emailSent = true
      diagnostic.emailId = result.data?.id || "ID no disponible"

      console.log("✅ Test email sent successfully:", result)
    } catch (error) {
      diagnostic.emailSent = false
      diagnostic.emailError = error instanceof Error ? error.message : "Error desconocido"

      console.error("❌ Error sending test email:", error)

      // Analyze common errors
      if (error instanceof Error) {
        if (error.message.includes("domain")) {
          diagnostic.recommendations.push(
            "Verifica que el dominio 'trakmar.com' esté verificado en tu cuenta de Resend",
          )
        }
        if (error.message.includes("rate limit") || error.message.includes("quota")) {
          diagnostic.recommendations.push("Has alcanzado el límite de emails de Resend. Revisa tu uso en el dashboard")
        }
        if (error.message.includes("unauthorized") || error.message.includes("forbidden")) {
          diagnostic.recommendations.push("La API Key no es válida o no tiene permisos suficientes")
        }
      }
    }

    return NextResponse.json(diagnostic)
  } catch (error) {
    console.error("❌ Diagnostic error:", error)
    return NextResponse.json({
      ...diagnostic,
      error: "Error ejecutando diagnóstico",
      details: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}
