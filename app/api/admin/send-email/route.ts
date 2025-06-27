import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { searchId } = await request.json()

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

    const riskLevel = analysisData?.risk_level || "Unknown"
    const summary = analysisData?.summary || "Analysis completed"

    // Create comprehensive HTML email
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
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; line-height: 1.6; color: #333333; }
        .analysis-box { background-color: #f8f9fa; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; }
        .risk-level { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
        .risk-low { color: #16a34a; }
        .risk-medium { color: #ea580c; }
        .risk-high { color: #dc2626; }
        .cta-container { text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px; }
        .cta-button-secondary { background-color: #1e40af; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e9ecef; }
        .preheader { display: none; max-height: 0; overflow: hidden; }
        .trademark-name { background-color: #e0f2fe; padding: 10px; border-radius: 5px; font-weight: bold; text-align: center; margin: 15px 0; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .cta-button { display: block !important; margin: 10px 0 !important; }
        }
    </style>
</head>
<body>
    <div class="preheader">Your trademark analysis results for "${trademark_name}" are ready - Start your registration process now</div>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center">
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 24px;">Just Protected</h1>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Your Trademark Analysis Results</p>
                    </div>
                    
                    <div class="content">
                        <h2 style="color: #1e40af; margin-bottom: 20px;">Analysis Complete! 🎉</h2>
                        
                        <p>Great news! We've completed the comprehensive trademark analysis for your brand.</p>
                        
                        <div class="trademark-name">
                            "${trademark_name}"
                        </div>
                        
                        <div class="analysis-box">
                            <div class="risk-level risk-${riskLevel.toLowerCase()}">
                                Risk Level: ${riskLevel.toUpperCase()}
                            </div>
                            <p><strong>Analysis Summary:</strong></p>
                            <p>${summary}</p>
                        </div>
                        
                        <h3 style="color: #1e40af;">What's Next?</h3>
                        <p>Based on your analysis results, we recommend proceeding with your trademark registration to secure your brand protection. Our expert team is ready to guide you through the entire process.</p>
                        
                        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h4 style="margin-top: 0; color: #1e40af;">🛡️ Why Register Your Trademark Now?</h4>
                            <ul style="margin: 10px 0; padding-left: 20px;">
                                <li><strong>Legal Protection:</strong> Exclusive rights to your brand name</li>
                                <li><strong>Global Coverage:</strong> Protection in 180+ countries</li>
                                <li><strong>Brand Value:</strong> Increase your business value and credibility</li>
                                <li><strong>Prevent Infringement:</strong> Stop others from using your brand</li>
                            </ul>
                        </div>
                        
                        <div class="cta-container">
                            <a href="https://justprotected.com/verification?searchId=${searchId}" class="cta-button">
                                🚀 Start Registration Now
                            </a>
                            <a href="https://justprotected.com/pricing" class="cta-button cta-button-secondary">
                                💰 View Pricing
                            </a>
                        </div>
                        
                        <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
                            <h4 style="color: #1e40af;">📞 Need Help? We're Here for You!</h4>
                            <p>Our trademark experts are available to answer any questions and guide you through the registration process.</p>
                            <p>
                                <strong>Contact us:</strong><br>
                                📧 Email: <a href="mailto:support@justprotected.com">support@justprotected.com</a><br>
                                🌐 Website: <a href="https://justprotected.com">justprotected.com</a>
                            </p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p><strong>Just Protected</strong><br>
                        Professional Trademark Registration Services</p>
                        
                        <p>
                            <a href="https://justprotected.com/privacy" style="color: #666; text-decoration: none;">Privacy Policy</a> | 
                            <a href="https://justprotected.com/terms" style="color: #666; text-decoration: none;">Terms of Service</a> | 
                            <a href="https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: none;">Unsubscribe</a>
                        </p>
                        
                        <p style="margin-top: 15px; font-size: 11px; color: #999;">
                            This email was sent to ${email}. If you no longer wish to receive these emails, 
                            <a href="https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">click here to unsubscribe</a>.
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
JUST PROTECTED - Your Trademark Analysis Results

Analysis Complete! 🎉

Great news! We've completed the comprehensive trademark analysis for your brand: "${trademark_name}"

ANALYSIS RESULTS:
Risk Level: ${riskLevel.toUpperCase()}
Summary: ${summary}

WHAT'S NEXT?
Based on your analysis results, we recommend proceeding with your trademark registration to secure your brand protection.

🛡️ WHY REGISTER YOUR TRADEMARK NOW?
✓ Legal Protection: Exclusive rights to your brand name
✓ Global Coverage: Protection in 180+ countries  
✓ Brand Value: Increase your business value and credibility
✓ Prevent Infringement: Stop others from using your brand

🚀 START REGISTRATION: https://justprotected.com/verification?searchId=${searchId}
💰 VIEW PRICING: https://justprotected.com/pricing

📞 NEED HELP?
Our trademark experts are available to answer questions and guide you through the process.

Contact us:
📧 Email: support@justprotected.com
🌐 Website: justprotected.com

---
Just Protected - Professional Trademark Registration Services

Privacy Policy: https://justprotected.com/privacy
Terms of Service: https://justprotected.com/terms
Unsubscribe: https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}

This email was sent to ${email}. If you no longer wish to receive these emails, visit the unsubscribe link above.
`

    const emailData = {
      from: "Just Protected <noreply@justprotected.com>",
      to: [email],
      subject: `Your Trademark Analysis Results - "${trademark_name}"`,
      html: htmlContent,
      text: plainTextContent,
      headers: {
        "List-Unsubscribe": `<https://justprotected.com/unsubscribe?email=${encodeURIComponent(email)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `trademark-analysis-${searchId}`,
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
    }

    const data = await resend.emails.send(emailData)

    // Update the search record to mark email as sent
    await supabase
      .from("trademark_searches")
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq("id", searchId)

    return NextResponse.json({
      success: true,
      messageId: data.id,
      message: "Analysis email sent successfully with improved deliverability",
    })
  } catch (error) {
    console.error("Error sending analysis email:", error)
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
