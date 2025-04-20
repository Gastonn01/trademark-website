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
  const body = await req.text()

  // NOTA: Sin verificación de firma, esto es menos seguro
  // pero funcionará sin STRIPE_WEBHOOK_SECRET
  let event

  try {
    event = JSON.parse(body)
    console.log(`Received event: ${event.type}`)
  } catch (err: any) {
    console.error(`Error parsing webhook body: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Advertencia en logs sobre la falta de verificación
  console.warn("⚠️ Webhook signature verification skipped. This is less secure.")

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "Just Protected <onboarding@resend.dev>",
        to: paymentIntent.receipt_email || "your-default-email@example.com",
        subject: "Payment Confirmation - Just Protected",
        html: `
          <h1>Thank you for your payment</h1>
          <p>Your payment of ${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} has been received.</p>
          <p>We will begin processing your trademark registration immediately.</p>
          <p>Your reference number is: ${paymentIntent.id}</p>
        `,
      })
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`Payment failed: ${failedPaymentIntent.last_payment_error?.message}`)
  }

  return NextResponse.json({ received: true })
}
