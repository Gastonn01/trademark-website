import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY no está definida en las variables de entorno")
}

export async function POST(req: Request) {
  console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY)
  if (req.method === "POST") {
    const formData = await req.formData()
    const formType = formData.get("formType")
    const files = formData.getAll("files") as File[]

    let emailBody = `Nuevo formulario recibido: ${formType}\n\n`
    for (const [key, value] of formData.entries()) {
      if (key !== "files" && key !== "formType") {
        emailBody += `${key}: ${value}\n`
      }
    }

    try {
      const attachments = await Promise.all(
        files.map(async (file) => {
          const content = await file.arrayBuffer()
          return {
            filename: file.name,
            content: content,
          }
        }),
      )

      // Filter out empty attachments
      const validAttachments = attachments.filter((attachment) => attachment.content.byteLength > 0)

      console.log("Intentando enviar email con Resend...")
      const result = await resend.emails.send({
        from: "Just Protected <onboarding@resend.dev>",
        to: ["lacortgaston@gmail.com"], // Cambiado a la dirección de correo asociada con tu cuenta de Resend
        subject: `Nuevo formulario recibido: ${formType}`,
        text: emailBody,
        attachments: validAttachments,
      })

      console.log("Respuesta de Resend:", result)
      return NextResponse.json({ message: "Formulario enviado con éxito", result })
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error)
      if (error instanceof Error) {
        console.error("Mensaje de error:", error.message)
        console.error("Stack de error:", error.stack)
      }
      return NextResponse.json({ error: "Error al procesar el formulario", details: error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 })
  }
}

