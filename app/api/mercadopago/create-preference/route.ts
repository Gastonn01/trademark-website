import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { plan, total, classes, email, trademarkName } = await request.json()

    console.log("[v0 API] Creating preference with data:", { plan, total, classes, email, trademarkName })

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error("[v0 API] MERCADOPAGO_ACCESS_TOKEN not configured")
      return NextResponse.json(
        {
          error: "MercadoPago no configurado",
          details: "Por favor contacta al administrador. Falta configurar MERCADOPAGO_ACCESS_TOKEN",
        },
        { status: 500 },
      )
    }

    if (!plan || !total || !email || !trademarkName) {
      console.error("[v0 API] Missing required fields:", { plan, total, email, trademarkName })
      return NextResponse.json(
        {
          error: "Datos incompletos",
          details: "Faltan datos requeridos para crear la preferencia",
        },
        { status: 400 },
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trakmar.com"

    const preferenceBody = {
      items: [
        {
          id: plan,
          title: `Registro de Marca - ${plan}`,
          description: `${trademarkName} - ${classes} clase(s)`,
          quantity: 1,
          unit_price: Number(total),
          currency_id: "ARS",
        },
      ],
      payer: {
        email: email,
      },
      back_urls: {
        success: `${baseUrl}/pago-exitoso`,
        failure: `${baseUrl}/pago-error`,
        pending: `${baseUrl}/pago-pendiente`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      metadata: {
        plan,
        classes,
        trademark_name: trademarkName, // Changed from trademarkName to trademark_name
        email,
      },
    }

    console.log("[v0 API] Calling MercadoPago API directly...")

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0 API] MercadoPago API error:", errorData)
      throw new Error(`MercadoPago API error: ${JSON.stringify(errorData)}`)
    }

    const preferenceData = await response.json()
    console.log("[v0 API] Preference created successfully:", preferenceData.id)

    return NextResponse.json({
      preferenceId: preferenceData.id,
      initPoint: preferenceData.init_point,
    })
  } catch (error) {
    console.error("[v0 API] Error creating MercadoPago preference:", error)
    return NextResponse.json(
      {
        error: "Error creando preferencia de pago",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
