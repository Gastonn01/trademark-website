import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  console.log("📧 Contact form submission received at:", new Date().toISOString())

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not configured")
      return NextResponse.json(
        {
          error: "Email service not configured",
          message: "RESEND_API_KEY environment variable is not set",
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    console.log("📝 Contact form data:", JSON.stringify(body, null, 2))

    const { name, email, subject, message, phone } = body

    // Validate required fields
    if (!name || !email || !message) {
      console.error("❌ Missing required fields")
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Name, email, and message are required",
          received: { name: !!name, email: !!email, message: !!message },
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email)
      return NextResponse.json(
        {
          error: "Invalid email format",
          message: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

    console.log("📧 Sending contact form emails...")

    try {
      // Send confirmation email to the user
      await resend.emails.send({
        from: "JustProtected <noreply@justprotected.com>",
        to: [email],
        subject: "Thank you for contacting JustProtected",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Message</h3>
              <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            </div>

            <p>Our team typically responds within 24 hours during business days.</p>
            
            <p>Best regards,<br>The JustProtected Team</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p>This is an automated confirmation email. Please do not reply to this email.</p>
            </div>
          </div>
        `,
      })

      console.log("✅ Confirmation email sent to user")

      // Send notification email to admin
      await resend.emails.send({
        from: "JustProtected <noreply@justprotected.com>",
        to: ["admin@justprotected.com"],
        subject: `New Contact Form Submission: ${subject || "General Inquiry"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Contact Form Submission</h2>
            <p>A new message has been received through the contact form.</p>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <p>Please respond to this inquiry promptly.</p>
          </div>
        `,
      })

      console.log("✅ Admin notification email sent")

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully. We will get back to you soon!",
        timestamp: new Date().toISOString(),
      })
    } catch (emailError: any) {
      console.error("❌ Failed to send emails:", emailError.message)
      console.error("❌ Email error details:", emailError)

      return NextResponse.json(
        {
          error: "Failed to send email",
          message: "Your message could not be sent. Please try again later.",
          details: emailError.message,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("❌ Contact form processing error:", error.message)
    console.error("❌ Contact error stack:", error.stack)

    return NextResponse.json(
      {
        error: "Contact form processing failed",
        message: "An unexpected error occurred. Please try again later.",
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("📧 Contact API GET request received at:", new Date().toISOString())

  try {
    const resendConfigured = !!process.env.RESEND_API_KEY

    return NextResponse.json({
      status: resendConfigured ? "✅ Contact API is ready" : "⚠️ Contact API has configuration issues",
      timestamp: new Date().toISOString(),
      endpoint: "https://www.justprotected.com/api/contact",
      methods: ["GET", "POST"],
      configuration: {
        resend: {
          apiKey: resendConfigured ? "✅ Configured" : "❌ Missing RESEND_API_KEY",
        },
      },
      ready: resendConfigured,
      issues: resendConfigured ? [] : ["Missing RESEND_API_KEY environment variable"],
      requiredFields: ["name", "email", "message"],
      optionalFields: ["subject", "phone"],
      emailFeatures: [
        "User confirmation email",
        "Admin notification email",
        "HTML formatted emails",
        "Email validation",
      ],
    })
  } catch (error: any) {
    console.error("❌ Contact API GET error:", error.message)

    return NextResponse.json(
      {
        error: "Contact API GET request failed",
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
