import { type NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, title, description, formData } = await request.json()

    const preference = new Preference(client)

    const preferenceData = {
      items: [
        {
          title: title,
          description: description,
          quantity: 1,
          unit_price: amount,
          currency_id: "ARS", // Cambiar según tu país
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-pending`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify({
        formData,
        timestamp: Date.now(),
      }),
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago-webhook`,
    }

    const result = await preference.create({ body: preferenceData })

    return NextResponse.json({
      preferenceId: result.id,
      initPoint: result.init_point,
    })
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error)
    return NextResponse.json({ error: "Error creating payment preference" }, { status: 500 })
  }
}
