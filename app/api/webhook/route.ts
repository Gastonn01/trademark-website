import Stripe from "stripe"
import { headers } from "next/headers"
import { Resend } from "resend"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

// Initialize Resend
let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  } else {
    console.log("Resend API key not found, email functionality will be disabled")
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

export async function POST(req: Request) {
  console.log("🔔 Webhook POST request received at:", new Date().toISOString())

  try {
    // Get the request body and signature
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    console.log("📝 Request details:")
    console.log("  Body length:", body.length)
    console.log("  Signature present:", !!signature)

    if (!signature) {
      console.error("❌ Missing Stripe signature")
      return new Response(
        JSON.stringify({
          error: "Missing Stripe signature",
          timestamp: new Date().toISOString(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ Missing STRIPE_WEBHOOK_SECRET environment variable")
      return new Response(
        JSON.stringify({
          error: "Webhook secret not configured",
          timestamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Verify the webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
      console.log("✅ Webhook signature verified successfully")
      console.log("📋 Event type:", event.type)
      console.log("🆔 Event ID:", event.id)
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message)
      return new Response(
        JSON.stringify({
          error: "Webhook signature verification failed",
          details: err.message,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Process the webhook event
    try {
      console.log("🔄 Processing webhook event:", event.type)

      switch (event.type) {
        case "payment_intent.succeeded":
          await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
          break
        case "payment_intent.payment_failed":
          await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
          break
        case "payment_intent.canceled":
          await handlePaymentCanceled(event.data.object as Stripe.PaymentIntent)
          break
        default:
          console.log("ℹ️ Unhandled event type:", event.type)
      }

      console.log("✅ Webhook processed successfully")
      return new Response(
        JSON.stringify({
          received: true,
          eventType: event.type,
          eventId: event.id,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (processingError: any) {
      console.error("❌ Error processing webhook:", processingError.message)
      console.error("❌ Processing error stack:", processingError.stack)

      return new Response(
        JSON.stringify({
          error: "Webhook processing failed",
          details: processingError.message,
          eventType: event.type,
          eventId: event.id,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error: any) {
    console.error("❌ Webhook request processing error:", error.message)
    console.error("❌ Request error stack:", error.stack)

    return new Response(
      JSON.stringify({
        error: "Webhook request processing failed",
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log("💰 Processing successful payment:", paymentIntent.id)
  console.log("💵 Amount:", `€${(paymentIntent.amount / 100).toFixed(2)}`)
  console.log("📧 Receipt email:", paymentIntent.receipt_email || "Not provided")

  try {
    // Extract customer information from metadata
    const metadata = paymentIntent.metadata || {}
    const customerEmail = paymentIntent.receipt_email || metadata.customerEmail
    const customerName = metadata.customerName || "Valued Customer"
    const trademarkName = metadata.trademarkName || "Your trademark"
    const country = metadata.country || "selected jurisdiction"

    console.log("👤 Customer details:")
    console.log("  Email:", customerEmail)
    console.log("  Name:", customerName)
    console.log("  Trademark:", trademarkName)
    console.log("  Country:", country)

    // Send confirmation email to customer if email is available
    if (customerEmail && process.env.RESEND_API_KEY) {
      try {
        console.log("📧 Sending confirmation email to customer...")

        await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: [customerEmail],
          subject: "Payment Confirmation - Trademark Registration Service",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Payment Confirmation</h2>
              <p>Dear ${customerName},</p>
              <p>Thank you for your payment! We have successfully received your payment for trademark registration services.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Payment Details</h3>
                <p><strong>Payment ID:</strong> ${paymentIntent.id}</p>
                <p><strong>Amount:</strong> €${(paymentIntent.amount / 100).toFixed(2)}</p>
                <p><strong>Trademark:</strong> ${trademarkName}</p>
                <p><strong>Jurisdiction:</strong> ${country}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>

              <h3>What happens next?</h3>
              <ul>
                <li>Our legal team will review your application within 24 hours</li>
                <li>We'll conduct a comprehensive trademark search</li>
                <li>You'll receive regular updates throughout the registration process</li>
                <li>The complete process typically takes 6-12 months</li>
              </ul>

              <p>If you have any questions, please don't hesitate to contact our support team.</p>
              
              <p>Best regards,<br>The JustProtected Team</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                <p>This is an automated confirmation email. Please do not reply to this email.</p>
              </div>
            </div>
          `,
        })

        console.log("✅ Customer confirmation email sent successfully")
      } catch (emailError: any) {
        console.error("❌ Failed to send customer confirmation email:", emailError.message)
      }
    }

    // Send notification email to admin
    if (process.env.RESEND_API_KEY) {
      try {
        console.log("📧 Sending admin notification email...")

        await resend.emails.send({
          from: "JustProtected <noreply@justprotected.com>",
          to: ["admin@justprotected.com"],
          subject: `New Payment Received - €${(paymentIntent.amount / 100).toFixed(2)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">New Payment Received</h2>
              <p>A new payment has been successfully processed.</p>
              
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Payment Details</h3>
                <p><strong>Payment ID:</strong> ${paymentIntent.id}</p>
                <p><strong>Amount:</strong> €${(paymentIntent.amount / 100).toFixed(2)}</p>
                <p><strong>Customer Email:</strong> ${customerEmail || "Not provided"}</p>
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Trademark:</strong> ${trademarkName}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p>Please process this trademark registration application promptly.</p>
            </div>
          `,
        })

        console.log("✅ Admin notification email sent successfully")
      } catch (emailError: any) {
        console.error("❌ Failed to send admin notification email:", emailError.message)
      }
    }

    console.log("✅ Payment success handling completed")
  } catch (error: any) {
    console.error("❌ Error in handlePaymentSuccess:", error.message)
    throw error
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("❌ Processing failed payment:", paymentIntent.id)
  console.log("💵 Amount:", `€${(paymentIntent.amount / 100).toFixed(2)}`)

  // You can add logic here to handle failed payments
  // For example, send notification emails or update database records
}

async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  console.log("🚫 Processing canceled payment:", paymentIntent.id)
  console.log("💵 Amount:", `€${(paymentIntent.amount / 100).toFixed(2)}`)

  // You can add logic here to handle canceled payments
}

export async function GET() {
  console.log("🔔 Webhook GET request received at:", new Date().toISOString())

  try {
    const stripeConfigured = !!process.env.STRIPE_SECRET_KEY
    const webhookSecretConfigured = !!process.env.STRIPE_WEBHOOK_SECRET
    const resendConfigured = !!process.env.RESEND_API_KEY

    const allConfigured = stripeConfigured && webhookSecretConfigured && resendConfigured
    const issues: string[] = []

    if (!stripeConfigured) issues.push("Missing STRIPE_SECRET_KEY environment variable")
    if (!webhookSecretConfigured) issues.push("Missing STRIPE_WEBHOOK_SECRET environment variable")
    if (!resendConfigured) issues.push("Missing RESEND_API_KEY environment variable")

    return new Response(
      JSON.stringify({
        status: allConfigured ? "✅ Webhook endpoint is ready" : "⚠️ Webhook endpoint has configuration issues",
        timestamp: new Date().toISOString(),
        endpoint: "https://www.justprotected.com/api/webhook",
        methods: ["GET", "POST"],
        environment: process.env.NODE_ENV || "unknown",
        configuration: {
          stripe: {
            secretKey: stripeConfigured ? "✅ Configured" : "❌ Missing STRIPE_SECRET_KEY",
            webhookSecret: webhookSecretConfigured ? "✅ Configured" : "❌ Missing STRIPE_WEBHOOK_SECRET",
          },
          resend: {
            apiKey: resendConfigured ? "✅ Configured" : "❌ Missing RESEND_API_KEY",
          },
        },
        ready: allConfigured,
        issues,
        supportedEvents: ["payment_intent.succeeded", "payment_intent.payment_failed", "payment_intent.canceled"],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error: any) {
    console.error("❌ Webhook GET request error:", error.message)

    return new Response(
      JSON.stringify({
        error: "Webhook GET request failed",
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
