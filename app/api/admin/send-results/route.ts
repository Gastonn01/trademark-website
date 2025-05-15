import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSearchData, updateSearchStatus } from "@/lib/supabase"

export const runtime = "nodejs"

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
  try {
    const body = await req.json()
    const { searchId } = body

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get search data
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search not found" }, { status: 404 })
    }

    // Extract necessary data
    const email = searchData.email || searchData.search_results?.email
    const name = searchData.search_results?.name || searchData.search_results?.firstName || ""
    const surname = searchData.search_results?.surname || searchData.search_results?.lastName || ""
    const trademarkName = searchData.trademark_name || searchData.search_results?.trademarkName || "your trademark"

    // Check if email exists
    if (!email) {
      return NextResponse.json({ error: "No email address found for this search" }, { status: 400 })
    }

    // Check if results exist
    if (!searchData.results) {
      return NextResponse.json({ error: "No results available to send. Please add results first." }, { status: 400 })
    }

    // Make sure we have a verification token
    let verificationToken = searchData.results.verificationToken
    if (!verificationToken) {
      verificationToken = `token${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

      // Update the search data with the new token
      // This is a simplified version - in a real app, you'd update the database
      searchData.results.verificationToken = verificationToken
    }

    // IMPORTANT: Hardcode the production domain
    const baseUrl = "https://justprotected.com"
    const verificationUrl = `${baseUrl}/verification/${verificationToken}`

    // Format similar trademarks for display
    const similarTrademarks = searchData.results.similarTrademarks || []
    const similarTrademarksList =
      similarTrademarks.length > 0
        ? `<ul style="margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
          ${similarTrademarks.map((trademark) => `<li style="margin-bottom: 5px;">${trademark}</li>`).join("")}
        </ul>`
        : '<p style="margin-top: 5px; margin-bottom: 15px;">No similar trademarks were found.</p>'

    // Send email if Resend is available
    if (resend) {
      const result = await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: email,
        subject: `Your Trademark Search Results: ${trademarkName}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Trademark Search Results - Just Protected</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; color: #1f2937;">
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
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Your Trademark Search Results</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${name} ${surname},</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">We have completed the comprehensive analysis of your trademark <strong>${trademarkName}</strong>. Here is a summary of our findings:</p>
              
              <!-- Results Summary -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 16px;">Search Results Summary</h3>
                
                <div style="margin-bottom: 15px;">
                  <p style="color: #4b5563; margin: 0; margin-bottom: 5px; font-weight: 600;">Similar Trademarks Found:</p>
                  ${similarTrademarksList}
                </div>
                
                <div style="margin-bottom: 15px;">
                  <p style="color: #4b5563; margin: 0; margin-bottom: 5px; font-weight: 600;">Analysis:</p>
                  <p style="color: #4b5563; margin: 0; margin-top: 5px;">${searchData.results.comments || "Our team has analyzed your trademark request and prepared detailed results."}</p>
                </div>
                
                ${
                  searchData.results.recommendation
                    ? `
                <div>
                  <p style="color: #4b5563; margin: 0; margin-bottom: 5px; font-weight: 600;">Recommendation:</p>
                  <p style="color: #4b5563; margin: 0; margin-top: 5px;">${searchData.results.recommendation}</p>
                </div>
                `
                    : ""
                }
              </div>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 25px;">Based on our analysis, we recommend proceeding with the trademark registration process. Click the button below to start your registration now:</p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${verificationUrl}" style="display: inline-block; background-color: #1e40af; color: #ffffff; font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">Start Registration Now</a>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 10px;">If you have any questions about your results or need assistance with the registration process, please don't hesitate to contact our team.</p>
              
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
              <p style="color: #6b7280; font-size: 10px; margin-top: 10px;">Verification Token: ${verificationToken}</p>
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

      // Update search status to completed
      await updateSearchStatus(searchId, "completed")

      return NextResponse.json({
        message: "Results sent successfully",
        email: email,
        id: result.id,
      })
    } else {
      return NextResponse.json(
        { error: "Email service not available. Please check your Resend API key." },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error sending results:", error)
    return NextResponse.json(
      { error: "Error sending results", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
