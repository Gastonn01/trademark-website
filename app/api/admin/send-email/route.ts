import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSearchData } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)
    if (!searchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    // Initialize Resend if API key is available
    let resend: Resend | null = null
    if (process.env.RESEND_API_KEY) {
      resend = new Resend(process.env.RESEND_API_KEY)
    } else {
      console.log("Resend API key not found, email functionality will be disabled")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Prepare email content
    const trademarkName = searchData.search_results?.trademarkName || searchData.trademark_name || "Unnamed Trademark"
    const customerName = searchData.search_results?.name || searchData.search_results?.firstName || "Cliente"
    const customerSurname = searchData.search_results?.surname || searchData.search_results?.lastName || ""
    const fullName = `${customerName} ${customerSurname}`.trim()

    // Get search results
    const searchResults = searchData.search_results?.results || ""
    const recommendations = searchData.search_results?.recommendations || ""
    const nextSteps = searchData.search_results?.nextSteps || ""

    // Create HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trademark Search Results - Just Protected</title>
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
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Trademark Search Results</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${fullName},</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Thank you for trusting <strong>Just Protected</strong> with your trademark protection. We are pleased to provide you with the results of your trademark search for <strong>${trademarkName}</strong>.</p>
              
              ${
                customMessage
                  ? `
              <div style="background-color: #f0f7ff; border-left: 4px solid #1e40af; padding: 15px; margin-bottom: 20px;">
                <p style="color: #1e3a8a; margin: 0; font-weight: 500;">${customMessage}</p>
              </div>
              `
                  : ""
              }
              
              <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px; font-size: 18px;">Search Details</h3>
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 40%; font-weight: 600; color: #4b5563;">Trademark Name</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${trademarkName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 40%; font-weight: 600; color: #4b5563;">Trademark Type</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${searchData.search_results?.trademarkType || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 40%; font-weight: 600; color: #4b5563;">Goods & Services</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${searchData.search_results?.goodsAndServices || searchData.description || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 40%; font-weight: 600; color: #4b5563;">Countries</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${Array.isArray(searchData.search_results?.countries) ? searchData.search_results.countries.join(", ") : "Not specified"}</td>
                </tr>
              </table>
              
              ${
                searchResults
                  ? `
              <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px; font-size: 18px;">Search Results</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #4b5563; line-height: 1.6; margin: 0;">${searchResults.replace(/\n/g, "<br>")}</p>
              </div>
              `
                  : ""
              }
              
              ${
                recommendations
                  ? `
              <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px; font-size: 18px;">Recommendations</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #4b5563; line-height: 1.6; margin: 0;">${recommendations.replace(/\n/g, "<br>")}</p>
              </div>
              `
                  : ""
              }
              
              ${
                nextSteps
                  ? `
              <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px; font-size: 18px;">Next Steps</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #4b5563; line-height: 1.6; margin: 0;">${nextSteps.replace(/\n/g, "<br>")}</p>
              </div>
              `
                  : ""
              }
              
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
              <p style="color: #6b7280; font-size: 14px; margin: 0;">© 2025 Just Protected. All rights reserved.</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">This email is confidential and intended solely for the addressee.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    try {
      // Send the email
      const result = await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [recipientEmail],
        subject: `Trademark Search Results: ${trademarkName}`,
        html: htmlContent,
      })

      console.log("Email sent successfully:", result)

      return NextResponse.json({ success: true, message: "Email sent successfully" })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json({ error: "Failed to send email", details: String(emailError) }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in send-email API route:", error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}
