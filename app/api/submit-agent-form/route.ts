import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Método no permitido", success: false }, { status: 405, headers })
    }

    let body
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Formato de datos inválido", success: false }, { status: 400, headers })
    }

    console.log("🤝 Agent application received:", body.email)

    // Validate required fields
    if (!body.nombre || !body.email || !body.experiencia) {
      return NextResponse.json({ error: "Campos requeridos faltantes", success: false }, { status: 400, headers })
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log("⚠️ RESEND_API_KEY not configured for agent application")
      return NextResponse.json(
        {
          message: "Solicitud recibida (modo demo)",
          success: true,
          demo: true,
        },
        { headers },
      )
    }

    // Initialize Resend
    let resend
    try {
      resend = new Resend(process.env.RESEND_API_KEY)
    } catch (resendError) {
      console.error("❌ Error initializing Resend:", resendError)
      return NextResponse.json(
        {
          message: "Solicitud recibida (error de configuración)",
          success: true,
          emailError: true,
        },
        { headers },
      )
    }

    // Prepare email content
    const emailBody = `
🤝 NUEVA SOLICITUD PARA SER AGENTE

👤 DATOS DEL CANDIDATO:
• Nombre: ${body.nombre}
• Email: ${body.email}
• Teléfono: ${body.telefono || "No proporcionado"}
• Ciudad: ${body.ciudad || "No especificada"}

💼 EXPERIENCIA PROFESIONAL:
${body.experiencia}

💡 MOTIVACIÓN:
${body.motivacion || "No especificada"}

📋 SERVICIOS INTERESADOS:
${Array.isArray(body.servicios) ? body.servicios.join(", ") : "No especificados"}

📅 Fecha de solicitud: ${new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}

---
Responder a: ${body.email}
    `

    // Send email
    try {
      const result = await resend.emails.send({
        from: "Trakmar Agentes <noreply@trakmar.com>",
        to: ["trakmar@proton.me"],
        subject: `🤝 Nueva Solicitud Agente: ${body.nombre}`,
        text: emailBody,
        reply_to: body.email,
      })

      console.log("✅ Agent application email sent successfully:", result)

      return NextResponse.json(
        {
          message: "Solicitud de agente enviada exitosamente",
          success: true,
          emailSent: true,
          emailId: result.data?.id,
        },
        { headers },
      )
    } catch (emailError) {
      console.error("❌ Error sending agent application email:", emailError)

      return NextResponse.json(
        {
          message: "Solicitud recibida (error enviando email)",
          success: true,
          emailError: true,
          errorDetails: emailError instanceof Error ? emailError.message : "Unknown email error",
        },
        { headers },
      )
    }
  } catch (error) {
    console.error("❌ Unexpected error in agent application:", error)

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        success: false,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers },
    )
  }
}
