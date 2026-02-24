import { type NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verificar que es una notificación de pago
    if (body.type === "payment") {
      const payment = new Payment(client)
      const paymentInfo = await payment.get({ id: body.data.id })

      // Procesar según el estado del pago
      if (paymentInfo.status === "approved") {
        // Pago aprobado - aquí puedes guardar en base de datos
        console.log("Payment approved:", paymentInfo)

        // Extraer datos del formulario del external_reference
        const externalRef = JSON.parse(paymentInfo.external_reference || "{}")
        const formData = externalRef.formData

        // Aquí puedes guardar los datos en Supabase
        // await saveToDatabase(formData, paymentInfo)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
