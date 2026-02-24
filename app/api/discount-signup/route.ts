import { NextResponse } from "next/server"
import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

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

    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email es requerido", success: false }, { status: 400, headers })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Formato de email inválido", success: false }, { status: 400, headers })
    }

    console.log("💰 Discount signup received:", email)

    try {
      await sql`
        INSERT INTO discount_signups (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING
      `
      console.log("✅ Discount signup saved to database")
    } catch (dbError) {
      console.error("❌ Database error:", dbError)
      // Continue anyway - email notification is more important
    }

    // Send notification email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        const emailBody = `
💰 NUEVO REGISTRO PARA DESCUENTO

📧 Email: ${email}
🎯 Oferta: 10% de descuento en primera marca
📅 Fecha: ${new Date().toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}

---
Este lead está interesado en registrar una marca con descuento.
Contactar para seguimiento de venta.
        `

        const result = await resend.emails.send({
          from: "Trakmar Leads <noreply@trakmar.com>",
          to: ["trakmar@proton.me"],
          subject: `💰 Nuevo Lead: ${email}`,
          text: emailBody,
        })

        console.log("✅ Discount signup notification sent:", result)
      } catch (emailError) {
        console.error("❌ Error sending discount notification:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        message: "Email registrado exitosamente para descuento",
        success: true,
      },
      { headers },
    )
  } catch (error) {
    console.error("❌ Unexpected error in discount signup:", error)

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
