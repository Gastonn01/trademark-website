import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json()

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields: to, subject, message" }, { status: 400 })
    }

    // Create HTML version with proper structure
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; line-height: 1.6; color: #333333; }
        .cta-container { text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px; }
        .cta-button-secondary { background-color: #1e40af; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e9ecef; }
        .preheader { display: none; max-height: 0; overflow: hidden; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .cta-button { display: block !important; margin: 10px 0 !important; }
        }
    </style>
</head>
<body>
    <div class="preheader">Start your trademark registration process with Just Protected - Professional trademark services worldwide</div>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center">
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 24px;">Just Protected</h1>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Professional Trademark Services</p>
                    </div>
                    
                    <div class="content">
                        ${message.replace(/\n/g, "<br>")}
                        
                        <div class="cta-container">
                            <a href="https://justprotected.com/verification" class="cta-button">
                                🚀 Start Now
                            </a>
                            <a href="https://justprotected.com" class="cta-button cta-button-secondary">
                                📖 Learn More
                            </a>
                        </div>
                        
                        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 14px; color: #666;">
                            <strong>Why Choose Just Protected?</strong><br>
                            ✓ Expert trademark attorneys<br>
                            ✓ Global trademark registration<br>
                            ✓ Comprehensive trademark search<br>
                            ✓ Ongoing trademark monitoring
                        </p>
                    </div>
                    
                    <div class="footer">
                        <p><strong>Just Protected</strong><br>
                        Professional Trademark Registration Services</p>
                        
                        <p>
                            <a href="https://justprotected.com/privacy" style="color: #666; text-decoration: none;">Privacy Policy</a> | 
                            <a href="https://justprotected.com/terms" style="color: #666; text-decoration: none;">Terms of Service</a> | 
                            <a href="https://justprotected.com/unsubscribe?email=${encodeURIComponent(to)}" style="color: #666; text-decoration: none;">Unsubscribe</a>
                        </p>
                        
                        <p style="margin-top: 15px; font-size: 11px; color: #999;">
                            This email was sent to ${to}. If you no longer wish to receive these emails, 
                            <a href="https://justprotected.com/unsubscribe?email=${encodeURIComponent(to)}" style="color: #999;">click here to unsubscribe</a>.
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`

    // Create plain text version
    const plainTextContent = `
JUST PROTECTED - Professional Trademark Services

${message}

🚀 START NOW: https://justprotected.com/verification

📖 LEARN MORE: https://justprotected.com

Why Choose Just Protected?
✓ Expert trademark attorneys
✓ Global trademark registration  
✓ Comprehensive trademark search
✓ Ongoing trademark monitoring

---
Just Protected
Professional Trademark Registration Services

Privacy Policy: https://justprotected.com/privacy
Terms of Service: https://justprotected.com/terms
Unsubscribe: https://justprotected.com/unsubscribe?email=${encodeURIComponent(to)}

This email was sent to ${to}. If you no longer wish to receive these emails, visit the unsubscribe link above.
`

    const emailData = {
      from: "Just Protected <noreply@justprotected.com>",
      to: [to],
      subject: subject,
      html: htmlContent,
      text: plainTextContent,
      headers: {
        "List-Unsubscribe": `<https://justprotected.com/unsubscribe?email=${encodeURIComponent(to)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `trademark-email-${Date.now()}`,
      },
      tags: [
        {
          name: "category",
          value: "trademark-outreach",
        },
      ],
    }

    const data = await resend.emails.send(emailData)

    return NextResponse.json({
      success: true,
      messageId: data.id,
      message: "Email sent successfully with improved deliverability",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
