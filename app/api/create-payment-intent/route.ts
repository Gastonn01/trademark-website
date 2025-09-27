import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

export async function POST(request: Request) {
  try {
    console.log("💳 Payment intent creation requested at:", new Date().toISOString())

    const body = await request.json()
    console.log("📝 Request body:", JSON.stringify(body, null, 2))

    const { amount, currency = "eur", customerEmail, customerName, trademarkName, country } = body

    // Validate required fields with detailed logging
    if (!amount || amount <= 0) {
      console.error("❌ Invalid amount:", amount)
      return NextResponse.json(
        {
          error: "Invalid amount",
          message: "Amount must be a positive number",
          received: { amount, type: typeof amount },
        },
        { status: 400 },
      )
    }

    // Make customerEmail optional for now to prevent blocking
    if (customerEmail && typeof customerEmail === "string") {
      // Validate email format if provided
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(customerEmail)) {
        console.error("❌ Invalid email format:", customerEmail)
        return NextResponse.json(
          {
            error: "Invalid email format",
            message: "Please provide a valid email address",
            received: customerEmail,
          },
          { status: 400 },
        )
      }
    }

    console.log("💰 Creating payment intent:")
    console.log("  Amount:", amount, currency.toUpperCase())
    console.log("  Customer Email:", customerEmail || "Not provided")
    console.log("  Customer Name:", customerName || "Not provided")
    console.log("  Trademark Name:", trademarkName || "Not provided")
    console.log("  Country:", country || "Not provided")

    try {
      const paymentIntentData: any = {
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: {
          customerEmail: customerEmail || "",
          customerName: customerName || "",
          trademarkName: trademarkName || "",
          country: country || "",
          service: "Trademark Registration",
          timestamp: new Date().toISOString(),
        },
        description: `Trademark Registration Service${trademarkName ? ` for ${trademarkName}` : ""}${country ? ` in ${country}` : ""}`,
        automatic_payment_methods: {
          enabled: true,
        },
      }

      // Only add receipt_email if customerEmail is provided and valid
      if (customerEmail && typeof customerEmail === "string" && customerEmail.includes("@")) {
        paymentIntentData.receipt_email = customerEmail
      }

      const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)

      console.log("✅ Payment intent created successfully:")
      console.log("  Payment Intent ID:", paymentIntent.id)
      console.log("  Client Secret:", paymentIntent.client_secret ? "Generated" : "Missing")
      console.log("  Status:", paymentIntent.status)
      console.log("  Amount:", `€${(paymentIntent.amount / 100).toFixed(2)}`)

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        timestamp: new Date().toISOString(),
      })
    } catch (stripeError: any) {
      console.error("❌ Stripe payment intent creation failed:", stripeError.message)
      console.error("❌ Stripe error type:", stripeError.type)
      console.error("❌ Stripe error code:", stripeError.code)
      console.error("❌ Stripe error details:", stripeError)

      return NextResponse.json(
        {
          error: "Payment intent creation failed",
          message: stripeError.message || "Failed to create payment intent",
          type: stripeError.type,
          code: stripeError.code,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      )
    }
  } catch (error: any) {
    console.error("❌ Payment intent processing error:", error.message)
    console.error("❌ Error stack:", error.stack)

    return NextResponse.json(
      {
        error: "Payment intent processing failed",
        message: error.message || "An unexpected error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    console.log("💳 Payment intent API GET request received at:", new Date().toISOString())

    const isConfigured = !!process.env.STRIPE_SECRET_KEY

    return NextResponse.json({
      status: isConfigured ? "✅ Payment intent API is ready" : "⚠️ Payment intent API configuration missing",
      timestamp: new Date().toISOString(),
      endpoint: "https://www.justprotected.com/api/create-payment-intent",
      methods: ["GET", "POST"],
      configuration: {
        stripe: {
          secretKey: isConfigured ? "✅ Configured" : "❌ Missing STRIPE_SECRET_KEY",
        },
      },
      ready: isConfigured,
      issues: isConfigured ? [] : ["Missing STRIPE_SECRET_KEY environment variable"],
      supportedCurrencies: ["eur", "usd", "gbp"],
      requiredFields: ["amount"],
      optionalFields: ["currency", "customerEmail", "customerName", "trademarkName", "country"],
      notes: [
        "customerEmail is optional but recommended for receipt delivery",
        "amount should be in the base currency unit (e.g., euros, not cents)",
        "currency defaults to 'eur' if not specified",
      ],
    })
  } catch (error: any) {
    console.error("❌ Payment intent API GET error:", error.message)

    return NextResponse.json(
      {
        error: "Payment intent API GET request failed",
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
