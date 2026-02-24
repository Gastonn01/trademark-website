import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    console.log("🧪 Starting email test")

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ No RESEND_API_KEY found")
      return NextResponse.json({
        success: false,
        error: "No API key configured",
        details: "RESEND_API_KEY environment variable is missing",
      })
    }

    // Validate API key format
    if (!process.env.RESEND_API_KEY.startsWith("re_")) {
      console.error("❌ Invalid API key format")
      return NextResponse.json({
        success: false,
        error: "Invalid API key format",
        details: "API key should start with 're_'",
      })
    }

    console.log("✅ API key found and valid format")

    // Send test email
    const emailData = {
      from: "Trakmar <noreply@trakmar.com>",
      to: ["trakmar@proton.me"],
      subject: "🧪 Test Email - Sistema Funcionando",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🧪 Email de Prueba - Trakmar</h2>
          <p>Este es un email de prueba para verificar que el sistema de emails está funcionando correctamente.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-AR")}</p>
            <p><strong>Sistema:</strong> Resend API</p>
            <p><strong>Estado:</strong> ✅ Funcionando</p>
          </div>
          <p>Si recibes este email, el sistema está configurado correctamente.</p>
        </div>
      `,
      text: `
🧪 Email de Prueba - Trakmar

Este es un email de prueba para verificar que el sistema está funcionando.

Fecha: ${new Date().toLocaleString("es-AR")}
Sistema: Resend API
Estado: ✅ Funcionando

Si recibes este email, el sistema está configurado correctamente.
      `,
    }

    console.log("📧 Sending test email to:", emailData.to)

    const result = await resend.emails.send(emailData)

    console.log("✅ Email sent successfully:", result)

    return NextResponse.json({
      success: true,
      data: result,
      message: "Test email sent successfully",
    })
  } catch (error) {
    console.error("❌ Test email error:", error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : "No additional details",
    })
  }
}
