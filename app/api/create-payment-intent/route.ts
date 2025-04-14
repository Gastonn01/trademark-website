import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set in the environment variables")
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
})

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }

  try {
    const { amount, currency = "eur", metadata = {} } = await req.json()

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Create a payment intent with more details
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/smallest currency unit
      currency: currency.toLowerCase(),
      payment_method_types: ["card", "ideal", "bancontact", "giropay", "sofort"], // Add more payment methods
      metadata: {
        ...metadata,
        source: "trademark-website",
      },
      description: "Trademark registration services",
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err: any) {
    console.error("Error creating payment intent:", err)
    return NextResponse.json({ error: err.message || "An error occurred" }, { status: 500 })
  }
}
