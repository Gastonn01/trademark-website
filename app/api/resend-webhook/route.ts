import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = headers()

    // Verify webhook signature (opcional pero recomendado)
    const signature = headersList.get("resend-signature")

    if (!signature) {
      console.log("No signature provided")
      return NextResponse.json({ error: "No signature" }, { status: 401 })
    }

    // Parse the webhook payload
    const event = JSON.parse(body)

    console.log("Resend webhook received:", {
      type: event.type,
      data: event.data,
      timestamp: new Date().toISOString(),
    })

    // Handle different event types
    switch (event.type) {
      case "email.sent":
        console.log(`Email sent: ${event.data.email_id}`)
        // Aquí puedes actualizar tu base de datos
        break

      case "email.delivered":
        console.log(`Email delivered: ${event.data.email_id}`)
        // Marcar como entregado en tu sistema
        break

      case "email.bounced":
        console.log(`Email bounced: ${event.data.email_id}`)
        // Manejar emails rebotados
        break

      case "email.complained":
        console.log(`Email complained: ${event.data.email_id}`)
        // Manejar quejas de spam
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing Resend webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

// Permitir solo POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
