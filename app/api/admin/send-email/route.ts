import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId } = body

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get search data from Supabase
    const { data: searchData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError || !searchData) {
      return NextResponse.json({ error: "Search not found", details: fetchError?.message }, { status: 404 })
    }

    const { email, trademark_name, analysis_result } = searchData

    if (!email) {
      return NextResponse.json({ error: "No email address found for this search" }, { status: 400 })
    }

    // Parse analysis result
    let analysisData
    try {
      analysisData = typeof analysis_result === "string" ? JSON.parse(analysis_result) : analysis_result
    } catch (e) {
      analysisData = { summary: "Analysis data unavailable" }
    }

    const riskLevel = analysisData?.risk_level || "Low"
    const summary = analysisData?.summary || "Your trademark analysis has been completed successfully."

    // Create comprehensive HTML email with enhanced deliverability
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Trademark Analysis Results - ${trademark_name}</title>
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
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            background-color: #f8fafc; 
            line-height: 1.6;
        }
        .email-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 8px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content { 
            padding: 40px 30px; 
            color: #374151; 
            font-size: 16px;
        }
        .analysis-box { 
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 4px solid #3b82f6; 
            padding: 25px; 
            margin: 25px 0; 
            border-radius: 0 12px 12px 0;
        }
        .risk-level { 
            font-weight: 700; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }
        .risk-low { color: #16a34a; }
        .risk-medium { color: #ea580c; }
        .risk-high { color: #dc2626; }
        .trademark-name { 
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            padding: 20px; 
            border-radius: 12px; 
            font-weight: 700; 
            text-align: center; 
            margin: 20px 0; 
            font-size: 24px;
            color: #1e40af;
            border: 2px solid #3b82f6;
        }
        .cta-container { 
            text-align: center; 
            margin: 35px 0; 
        }
        .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
            color: white; 
            padding: 18px 36px; 
            text-decoration: none; 
            border-radius: 12px; 
            font-weight: 700;
            font-size: 18px;
            margin: 10px; 
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
        }
        .cta-button-secondary { 
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        }
        .benefits {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #bfdbfe;
        }
        .benefits h3 {
            color: #1e40af;
            margin-top: 0;
            font-size: 20px;
            font-weight: 700;
        }
        .benefits ul {
            margin: 20px 0;
            padding-left: 0;
            list-style: none;
        }
        .benefits li {
            padding: 10px 0;
            position: relative;
            padding-left: 30px;
            font-weight: 500;
        }
        .benefits li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #16a34a;
            font-weight: bold;
            font-size: 18px;
        }
        .contact-section {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border: 1px solid #e5e7eb;
        }
        .contact-section h3 {
            color: #1e40af;
            margin-top: 0;
            font-size: 18px;
        }
        .footer { 
            background-color: #f8fafc; 
            padding: 30px 20px; 
            text-align: center; 
            font-size: 14px; 
            color: #6b7280; 
            border-top: 1px solid #e5e7eb; 
        }
        .footer a {
            color: #6b7280;
            text-decoration: none;
        }
        .footer a:hover {
            color: #374151;
        }
        .preheader { 
            display: none; 
            max-height: 0; 
            overflow: hidden; 
            font-size: 1px;
            line-height: 1px;
            color: transparent;
        }
        @media only screen and (max-width: 600px) {
            .email-container { 
                width: 100% !important; 
                margin: 0 !important;
            }
            .content { 
                padding: 25px 20px !important; 
            }
            .header {
                padding: 25px 20px !important;
            }
            .cta-button { 
                display: block !important; 
                margin: 15px 0 !important; 
                padding: 20px !important;
            }
            .benefits, .contact-section, .analysis-box {
                padding: 20px !important;
            }
            .trademark-name {
                font-size: 20px !important;
                padding: 15px !important;
            }
        }
    </style>
</head>
<body>
    <div class="preheader">
        Your trademark analysis results for "${trademark_name}" are ready - Complete your registration with Just Protected
    </div>
    
    <div class="email-container">
        <div class="header">
            <h1>🛡️ Just Protected</h1>
            <p>Your Trademark Analysis Results</p>
        </div>
        
        <div class="content">
            <h2 style="color: #1e40af; margin-bottom: 20px; font-size: 24px;">Analysis Complete! 🎉</h2>
            
            <p style="font-size: 18px; margin-bottom: 25px;">
                Excellent news! We've completed your comprehensive trademark analysis and the results are ready for review.
            </p>
            
            <div class="trademark-name">
                "${trademark_name}"
            </div>
            
            <div class="analysis-box">
                <div class="risk-level risk-${riskLevel.toLowerCase()}">
                    📊 Risk Assessment: ${riskLevel.toUpperCase()}
                </div>
                <p><strong>Professional Analysis Summary:</strong></p>
                <p style="font-size: 16px; line-height: 1.7;">${summary}</p>
            </div>
            
            <h3 style="color: #1e40af; font-size: 22px; margin-top: 35px;">🚀 Ready for the Next Step?</h3>
            <p style="font-size: 16px;">
                Based on your analysis results, we recommend proceeding with your trademark registration to secure comprehensive brand protection. Our expert legal team is standing by to guide you through the entire process.
            </p>
            
            <div class="cta-container">
                <a href="https://justprotected.com/verification?searchId=${searchId}" class="cta-button">
                    🚀 Start Registration Now
                </a>
                <a href="https://justprotected.com/pricing" class="cta-button cta-button-secondary">
                    💰 View Pricing Plans
                </a>
            </div>
            
            <div class="benefits">
                <h3>🏆 Why Register Your Trademark with Just Protected?</h3>
                <ul>
                    <li><strong>Legal Protection:</strong> Exclusive rights to your brand name and logo</li>
                    <li><strong>Global Coverage:</strong> Protection available in 180+ countries worldwide</li>
                    <li><strong>Brand Value:</strong> Significantly increase your business value and credibility</li>
                    <li><strong>Prevent Infringement:</strong> Stop competitors from using your brand</li>
                    <li><strong>Expert Support:</strong> Qualified trademark attorneys handle everything</li>
                    <li><strong>Fast Processing:</strong> Quick turnaround with regular updates</li>
                </ul>
            </div>
            
            <div class="contact-section">
                <h3>📞 Need Personal Assistance?</h3>
                <p>Our trademark specialists are here to answer your questions and provide personalized guidance.</p>
                <p>
                    <strong>Contact Information:</strong><br>
                    📧 Email: <a href="mailto:support@justprotected.com" style="color: #3b82f6;">support@justprotected.com</a><br>
                    🌐 Website: <a href="https://justprotected.com" style="color: #3b82f6;">justprotected.com</a><br>
                    ⏰ Response Time: Within 24 hours<br>
                    💬 Live Chat: Available on our website
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Just Protected</strong><br>
            Professional Trademark Registration Services</p>
            
            <p style="margin: 20px 0;">
                <a href="https://justprotected.com/privacy">Privacy Policy</a> | 
                <a href="https://justprotected.com/terms">Terms of Service</a> | 
                <a href="https://justprotected.com/contact">Contact Us</a>
            </p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                This email was sent to ${email} regarding your trademark analysis request.<br>
                If you no longer wish to receive these emails, 
                <a href="https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #9ca3af;">click here to unsubscribe</a>.
            </p>
            
            <p style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
                Just Protected Ltd. | Professional Trademark Services<br>
                This email complies with CAN-SPAM Act requirements.
            </p>
        </div>
    </div>
</body>
</html>`

    // Create enhanced plain text version
    const plainTextContent = `
JUST PROTECTED - Your Trademark Analysis Results
================================================================

Analysis Complete! 🎉

Excellent news! We've completed your comprehensive trademark analysis for: "${trademark_name}"

ANALYSIS RESULTS:
📊 Risk Assessment: ${riskLevel.toUpperCase()}
Professional Analysis Summary: ${summary}

🚀 READY FOR THE NEXT STEP?
Based on your analysis results, we recommend proceeding with your trademark registration to secure comprehensive brand protection.

🏆 WHY REGISTER YOUR TRADEMARK WITH JUST PROTECTED?
✓ Legal Protection: Exclusive rights to your brand name and logo
✓ Global Coverage: Protection available in 180+ countries worldwide
✓ Brand Value: Significantly increase your business value and credibility
✓ Prevent Infringement: Stop competitors from using your brand
✓ Expert Support: Qualified trademark attorneys handle everything
✓ Fast Processing: Quick turnaround with regular updates

🚀 START REGISTRATION: https://justprotected.com/verification?searchId=${searchId}
💰 VIEW PRICING PLANS: https://justprotected.com/pricing

📞 NEED PERSONAL ASSISTANCE?
Our trademark specialists are here to answer your questions and provide personalized guidance.

Contact Information:
📧 Email: support@justprotected.com
🌐 Website: justprotected.com
⏰ Response Time: Within 24 hours
💬 Live Chat: Available on our website

================================================================
Just Protected - Professional Trademark Registration Services

Privacy Policy: https://justprotected.com/privacy
Terms of Service: https://justprotected.com/terms
Contact Us: https://justprotected.com/contact

This email was sent to ${email} regarding your trademark analysis request.
If you no longer wish to receive these emails, visit: https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}

Just Protected Ltd. | Professional Trademark Services
This email complies with CAN-SPAM Act requirements.
`

    // Send the email with enhanced deliverability settings
    try {
      const { data, error } = await resend.emails.send({
        from: "Just Protected <hello@justprotected.com>",
        to: [email],
        subject: `🎉 Your Trademark Analysis Results - "${trademark_name}"`,
        html: htmlContent,
        text: plainTextContent,
        reply_to: "support@justprotected.com",
        headers: {
          "List-Unsubscribe": `<https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-Entity-Ref-ID": `analysis-${searchId}`,
          "X-Priority": "3",
          "X-MSMail-Priority": "Normal",
          Importance: "Normal",
        },
        tags: [
          {
            name: "category",
            value: "trademark-analysis",
          },
          {
            name: "search_id",
            value: searchId.toString(),
          },
        ],
      })

      if (error) {
        console.error("Error sending analysis email:", error)
        return NextResponse.json({
          success: false,
          error: error.message,
        })
      }

      // Update the search record to mark email as sent
      await supabase
        .from("trademark_searches")
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        })
        .eq("id", searchId)

      console.log("Analysis email sent successfully:", data)
      return NextResponse.json({
        success: true,
        message: "Analysis email sent successfully with enhanced deliverability",
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending analysis email:", emailError)
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
