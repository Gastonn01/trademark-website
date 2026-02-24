import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { marca, productos, email } = body

    console.log("📋 Processing feasibility study request:", { marca, email })

    // Validate required fields
    if (!marca || !productos || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos",
        },
        { status: 400 },
      )
    }

    if (process.env.DATABASE_URL) {
      // Fire and forget - don't await, don't let errors propagate
      Promise.resolve()
        .then(async () => {
          try {
            const sql = neon(process.env.DATABASE_URL!)
            await sql`
            INSERT INTO feasibility_studies (marca, productos, email)
            VALUES (${marca}, ${productos}, ${email})
          `
            console.log("✅ Feasibility study saved to database")
          } catch (dbError) {
            // Silently log the error without affecting the main flow
            console.error("❌ Database error (non-blocking):", dbError instanceof Error ? dbError.message : dbError)
          }
        })
        .catch(() => {
          // Catch any unexpected errors to prevent unhandled rejections
        })
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.log("⚠️ No API key - running in demo mode")
      return NextResponse.json({
        success: true,
        demo: true,
        message: "Solicitud recibida (modo demo - sin API key)",
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
      subject: `📋 Nueva Solicitud de Estudio de Factibilidad - ${marca}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">📋 Nueva Solicitud de Estudio de Factibilidad</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e40af; margin-top: 0;">Información del Cliente</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 150px;">Marca:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${marca}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Fecha:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString("es-AR")}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 15px;">
              <h3 style="color: #1e40af; margin-top: 0;">Productos/Servicios</h3>
              <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap;">${productos}</p>
              </div>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24; margin-top: 15px;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">💰 Monto: $10.000 ARS</p>
              <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px;">Enviar link de pago a: ${email}</p>
            </div>
          </div>
          
          <div style="background: #1f2937; color: #d1d5db; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">📧 Email enviado automáticamente desde Trakmar.com</p>
          </div>
        </div>
      `,
      text: `
📋 NUEVA SOLICITUD DE ESTUDIO DE FACTIBILIDAD

Información del Cliente:
- Marca: ${marca}
- Email: ${email}
- Fecha: ${new Date().toLocaleString("es-AR")}

Productos/Servicios:
${productos}

💰 Monto: $10.000 ARS
Enviar link de pago a: ${email}

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
      message: "Solicitud enviada exitosamente",
    })
  } catch (error) {
    console.error("❌ Feasibility study submission error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
