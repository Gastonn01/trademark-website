import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { recipientEmail, subject, message } = body

    if (!recipientEmail || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("=== COMPOSE EMAIL DEBUG ===")
    console.log("Recipient:", recipientEmail)
    console.log("Subject:", subject)
    console.log("Message length:", message.length)

    // Create the email content using the same template as trademark results
    const emailContent = generateTrademarkStyleEmail(subject, message)

    // Send the email
    try {
      const { data, error } = await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [recipientEmail],
        subject: subject,
        html: emailContent,
      })

      if (error) {
        console.error("Error sending email with Resend:", error)
        return NextResponse.json({
          success: false,
          error: error.message,
        })
      }

      console.log("Email sent successfully:", data)
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending email:", emailError)
      return NextResponse.json({
        success: false,
        error: "Failed to send email",
      })
    }
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        error: "Error processing request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

function generateTrademarkStyleEmail(subject: string, message: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://justprotected.com"

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background-color: #f9fafb;
        }
        
        .email-container {
          max-width: 700px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }
        
        .header-content {
          position: relative;
          z-index: 1;
        }
        
        .logo {
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .tagline {
          font-size: 16px;
          color: #dbeafe;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .message-content {
          font-size: 16px;
          color: #374151;
          line-height: 1.8;
          white-space: pre-line;
          margin-bottom: 30px;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
          border: 1px solid #d1d5db;
        }
        
        .cta-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
        }
        
        .cta-description {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        
        .feature-item {
          text-align: center;
          padding: 20px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .feature-icon {
          font-size: 24px;
          margin-bottom: 10px;
        }
        
        .feature-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 5px;
        }
        
        .feature-description {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.4;
        }
        
        .footer {
          background-color: #1f2937;
          color: #9ca3af;
          padding: 40px 30px;
          text-align: center;
        }
        
        .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
        }
        
        .footer-description {
          font-size: 14px;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        
        .footer-links {
          margin-bottom: 25px;
        }
        
        .footer-link {
          color: #60a5fa;
          text-decoration: none;
          margin: 0 15px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .footer-link:hover {
          color: #93c5fd;
        }
        
        .footer-contact {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 15px;
        }
        
        .footer-copyright {
          font-size: 12px;
          color: #4b5563;
          padding-top: 20px;
          border-top: 1px solid #374151;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
          margin: 30px 0;
        }
        
        @media (max-width: 600px) {
          .email-container {
            margin: 0;
            box-shadow: none;
          }
          
          .header, .content, .footer {
            padding: 30px 20px;
          }
          
          .logo {
            font-size: 28px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-section {
            padding: 25px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="header-content">
            <div class="logo">🛡️ Just Protected</div>
            <div class="tagline">Professional Trademark Services Worldwide</div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
          <div class="message-content">${message}</div>
          
          <div class="divider"></div>
          
          <!-- Call to Action -->
          <div class="cta-section">
            <div class="cta-title">Need Trademark Protection?</div>
            <div class="cta-description">
              Protect your brand with our comprehensive trademark registration services in over 180 countries worldwide.
            </div>
            <a href="${baseUrl}" class="cta-button">Get Started Today</a>
          </div>
          
          <!-- Features -->
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🔍</div>
              <div class="feature-title">Free Search</div>
              <div class="feature-description">Comprehensive trademark availability search</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <div class="feature-title">Fast Filing</div>
              <div class="feature-description">Quick and efficient registration process</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🌍</div>
              <div class="feature-title">Global Coverage</div>
              <div class="feature-description">Protection in 180+ countries</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💼</div>
              <div class="feature-title">Expert Support</div>
              <div class="feature-description">Professional legal guidance</div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">🛡️ Just Protected</div>
          <div class="footer-description">
            Your trusted partner for trademark registration and intellectual property protection worldwide.
          </div>
          
          <div class="footer-links">
            <a href="${baseUrl}" class="footer-link">Website</a>
            <a href="${baseUrl}/services" class="footer-link">Services</a>
            <a href="${baseUrl}/pricing" class="footer-link">Pricing</a>
            <a href="${baseUrl}/contact" class="footer-link">Contact</a>
          </div>
          
          <div class="footer-contact">
            📧 support@justprotected.com | 🌐 justprotected.com
          </div>
          
          <div class="footer-copyright">
            © ${new Date().getFullYear()} Just Protected. All rights reserved. | Professional trademark services worldwide.
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
