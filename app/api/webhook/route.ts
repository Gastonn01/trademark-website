import { NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event

  try {
    // Verify webhook signature for security
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.warn("⚠️ STRIPE_WEBHOOK_SECRET not set - webhook signature verification skipped")
      event = JSON.parse(body)
    } else {
      event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET)
    }

    console.log(`Received event: ${event.type}`)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)

    // Send confirmation email
    try {
      const customerEmail = paymentIntent.receipt_email || paymentIntent.metadata?.email || "support@justprotected.com"

      await resend.emails.send({
        from: "Just Protected <onboarding@resend.dev>",
        to: customerEmail,
        subject: "Payment Confirmation - Just Protected",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">Payment Confirmed!</h1>
              <p style="color: #666; font-size: 16px;">Thank you for choosing Just Protected</p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
              <p><strong>Amount:</strong> €${(paymentIntent.amount / 100).toFixed(2)}</p>
              <p><strong>Reference:</strong> ${paymentIntent.id}</p>
              <p><strong>Service:</strong> Trademark Registration</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333;">What happens next?</h3>
              <ol style="color: #666; line-height: 1.6;">
                <li>We will begin processing your trademark registration immediately</li>
                <li>Our legal team will review your application within 24 hours</li>
                <li>You'll receive updates via email throughout the process</li>
                <li>The registration process typically takes 6-12 months</li>
              </ol>
            </div>
            
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af;">
                <strong>Need help?</strong> Contact us at support@justprotected.com or visit our help center.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                © 2024 Just Protected. All rights reserved.
              </p>
            </div>
          </div>
        `,
      })

      console.log(`Confirmation email sent to ${customerEmail}`)
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`Payment failed: ${failedPaymentIntent.last_payment_error?.message}`)

    // Send failure notification email
    try {
      const customerEmail = failedPaymentIntent.receipt_email || failedPaymentIntent.metadata?.email

      if (customerEmail) {
        await resend.emails.send({
          from: "Just Protected <onboarding@resend.dev>",
          to: customerEmail,
          subject: "Payment Failed - Just Protected",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #dc2626; margin-bottom: 10px;">Payment Failed</h1>
                <p style="color: #666; font-size: 16px;">We couldn't process your payment</p>
              </div>
              
              <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
                <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
                <p><strong>Amount:</strong> €${(failedPaymentIntent.amount / 100).toFixed(2)}</p>
                <p><strong>Reference:</strong> ${failedPaymentIntent.id}</p>
                <p><strong>Reason:</strong> ${failedPaymentIntent.last_payment_error?.message || "Unknown error"}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333;">What you can do:</h3>
                <ul style="color: #666; line-height: 1.6;">
                  <li>Check your card details and try again</li>
                  <li>Try a different payment method</li>
                  <li>Contact your bank if the issue persists</li>
                  <li>Reach out to our support team for assistance</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-bottom: 20px;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/forms" 
                   style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Try Again
                </a>
              </div>
              
              <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #1e40af;">
                  <strong>Need help?</strong> Contact us at support@justprotected.com
                </p>
              </div>
            </div>
          `,
        })
      }
    } catch (emailError) {
      console.error("Error sending failure notification email:", emailError)
    }
  }

  return NextResponse.json({ received: true })
}
