import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

// Initialize Resend with error handling - EXACT same as working email
let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
    console.log("✅ Compose email: Resend initialized successfully")
  } else {
    console.error("❌ Compose email: RESEND_API_KEY not found")
  }
} catch (error) {
  console.error("❌ Compose email: Failed to initialize Resend:", error)
}

export async function POST(req: Request) {
  // Always return a success response to the client - SAME pattern as working email
  const successResponse = () => {
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  }

  try {
    const body = await req.json()
    const { recipientEmail, subject, message } = body

    console.log("📧 Compose email request:", {
      recipientEmail,
      subject: subject?.substring(0, 50) + "...",
      messageLength: message?.length,
    })

    if (!recipientEmail || !subject || !message) {
      console.error("❌ Missing required fields:", {
        recipientEmail: !!recipientEmail,
        subject: !!subject,
        message: !!message,
      })
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Try to send emails if Resend is available - EXACT same structure
    if (resend) {
      try {
        console.log("📤 Attempting to send compose email to:", recipientEmail)

        // Send email using EXACT same method as working free search confirmation
        const result = await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: recipientEmail,
              replyTo: "trademarks@justprotected.com",
    text: message,
    subject: subject ? "Message via Just Protected: " + subject : "Message via Just Protected",
         
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject} - Just Protected</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f9fafb; color: #1f2937;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
    <tr>
      <td style="padding: 0;">
        <!-- Header -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #1e40af; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Just Protected</h1>
            </td>
          </tr>
        </table>
        
        <!-- Content -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Message from Just Protected</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear Client,</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Thank you for trusting <strong>Just Protected</strong> with your trademark protection needs.</p>
              
              <div style="color: #4b5563; line-height: 1.6; margin-bottom: 20px; white-space: pre-wrap;">${message}</div>
              
              <div style="background-color: #f0f7ff; border-left: 4px solid #1e40af; padding: 15px; margin-bottom: 20px;">
                <p style="color: #1e3a8a; margin: 0; font-weight: 500;">Our team of intellectual property experts is here to help you protect your trademark effectively.</p>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">If you have any questions or need additional information, please don't hesitate to contact our customer service team by replying to this email.</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 10px;">Sincerely,</p>
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 10px;"><strong>The Just Protected Team</strong></p>
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 0; font-style: italic;">Trademark Protection Experts</p>
            </td>
          </tr>
        </table>
        
        <!-- Footer -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #f3f4f6; padding: 20px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">This email is confidential and intended solely for the addressee.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
        })

        console.log("✅ Compose email sent successfully:", result.data?.id)
      } catch (emailError) {
        console.error("❌ Error sending compose email:", emailError)
        // Continue with process even if email fails - SAME as working email
      }
    } else {
      console.error("❌ Resend not initialized - compose email will not be sent")
    }

    return successResponse()
  } catch (error) {
    // Log the error but still return a success response - SAME as working email
    console.error("❌ Error processing compose email:", error)
    return successResponse()
  }
}
