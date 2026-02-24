import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"

const resend = new Resend(process.env.RESEND_API_KEY)
const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formType, name, email, subject, message } = body

    console.log("📧 Processing form submission:", { formType, name, email, subject })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos",
        },
        { status: 400 },
      )
    }

    try {
      await sql`
        INSERT INTO contact_form_submissions (name, email, subject, message, form_type)
        VALUES (${name}, ${email}, ${subject}, ${message}, ${formType || "general"})
      `
      console.log("✅ Contact form saved to database")
    } catch (dbError) {
      console.error("❌ Database error:", dbError)
      // Continue with email even if database fails
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.log("⚠️ No API key - running in demo mode")
      return NextResponse.json({
        success: true,
        demo: true,
        message: "Formulario recibido (modo demo - sin API key)",
      })
    }

    // Validate API key format
    if (!process.env.RESEND_API_KEY.startsWith("re_")) {
      return NextResponse.json(
        {
          success: false,
          error: "API key inválida",
        },
        { status: 500 },
      )
    }

    // Prepare email content
    const emailData = {
      from: "Trakmar <noreply@trakmar.com>",
      to: ["trakmar@proton.me"],
      subject: `📧 Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">📧 Nuevo Mensaje de Contacto - Trakmar</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e40af; margin-top: 0;">Información del Contacto</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Nombre:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Asunto:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Fecha:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString("es-AR")}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 15px;">
              <h3 style="color: #1e40af; margin-top: 0;">Mensaje</h3>
              <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #1f2937; color: #d1d5db; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">📧 Email enviado automáticamente desde Trakmar.com</p>
          </div>
        </div>
      `,
      text: `
📧 NUEVO MENSAJE DE CONTACTO - TRAKMAR

Información del Contacto:
- Nombre: ${name}
- Email: ${email}
- Asunto: ${subject}
- Fecha: ${new Date().toLocaleString("es-AR")}

Mensaje:
${message}

---
Email enviado automáticamente desde Trakmar.com
      `,
    }

    console.log("📧 Sending email to:", emailData.to)

    const result = await resend.emails.send(emailData)

    console.log("✅ Email sent successfully:", result)

    return NextResponse.json({
      success: true,
      data: result,
      message: "Email enviado exitosamente",
    })
  } catch (error) {
    console.error("❌ Form submission error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
