import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { paymentIntentId, customerEmail } = await req.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Si el pago fue exitoso y tenemos un email, enviamos la confirmación
    if (paymentIntent.status === "succeeded" && (customerEmail || paymentIntent.receipt_email)) {
      try {
        const emailTo = customerEmail || paymentIntent.receipt_email || ""

        await resend.emails.send({
          from: "Just Protected <onboarding@resend.dev>",
          to: emailTo,
          subject: "Payment Confirmation - Just Protected",
          html: `
            <h1>Thank you for your payment</h1>
            <p>Your payment of ${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} has been received.</p>
            <p>We will begin processing your trademark registration immediately.</p>
            <p>Your reference number is: ${paymentIntent.id}</p>
          `,
        })

        console.log(`Confirmation email sent to ${emailTo}`)
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError)
      }
    }

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })
  } catch (error: any) {
    console.error("Error checking payment status:", error)
    return NextResponse.json(
      {
        error: "Failed to check payment status",
        message: error.message,
      },
      { status: 500 },
    )
  }
}

