import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send email to your business email
    const result = await resend.emails.send({
      from: "Just Protected Contact <noreply@justprotected.com>",
      to: ["lacortgaston@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This email was sent from the Just Protected contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Reply to: ${email}
      `,
    })

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Just Protected <noreply@justprotected.com>",
      to: [email],
      subject: "Thank you for contacting Just Protected",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            Thank You for Contacting Us
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Dear ${name},
          </p>
          
          <p style="line-height: 1.6; color: #555;">
            Thank you for reaching out to Just Protected. We have received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <p style="line-height: 1.6; color: #555;">
            In the meantime, feel free to explore our services or check out our blog for helpful trademark information.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://justprotected.com" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Best regards,<br>The Just Protected Team</p>
          </div>
        </div>
      `,
      text: `
Dear ${name},

Thank you for reaching out to Just Protected. We have received your message and will get back to you within 24 hours.

Your Message Summary:
Subject: ${subject}
Message: ${message}

In the meantime, feel free to explore our services or check out our blog for helpful trademark information.

Best regards,
The Just Protected Team
      `,
    })

    console.log("Contact form emails sent successfully:", result)
    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
    })
  } catch (error) {
    console.error("Error sending contact form email:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
