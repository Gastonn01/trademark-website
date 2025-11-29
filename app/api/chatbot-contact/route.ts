import { NextResponse } from "next/server"
import { Resend } from "resend"

let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

export async function POST(request: Request) {
  try {
    const { name, email, message, conversationHistory } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    await resend.emails.send({
      from: "JustProtected Chatbot <noreply@justprotected.com>",
      to: ["trademarks@justprotected.com"],
      subject: `Chatbot Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Chatbot Inquiry</h2>
          <p>A user has requested to speak with the team through the chatbot.</p>
          
          <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">User's Question</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          ${
            conversationHistory
              ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Conversation Context</h3>
            <div style="white-space: pre-wrap; font-size: 12px; color: #78350f;">${conversationHistory}</div>
          </div>
          `
              : ""
          }

          <p style="color: #ef4444; font-weight: 600;">⚡ Priority: User is waiting for a response</p>
        </div>
      `,
    })

    // Send confirmation to user
    await resend.emails.send({
      from: "JustProtected <noreply@justprotected.com>",
      to: [email],
      subject: "We received your trademark inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Just Protected</h1>
          </div>
          
          <div style="padding: 40px;">
            <h2 style="color: #1e40af; margin-top: 0;">Thank you for reaching out!</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">Dear ${name},</p>
            
            <p style="color: #4b5563; line-height: 1.6;">We've received your trademark inquiry and our expert team will review it shortly. You can expect a detailed response from us within a few hours.</p>
            
            <div style="background-color: #f0f7ff; border-left: 4px solid #1e40af; padding: 15px; margin: 20px 0;">
              <p style="color: #1e3a8a; margin: 0;"><strong>Your question:</strong></p>
              <p style="color: #1e3a8a; margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">In the meantime, feel free to explore our website or start a free trademark search to learn more about protecting your brand.</p>
            
            <p style="color: #4b5563; line-height: 1.6;">Best regards,<br><strong>The Just Protected Team</strong></p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent to our team. We'll respond within a few hours!",
    })
  } catch (error: any) {
    console.error("Chatbot contact error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
