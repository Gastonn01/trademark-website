import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSearchData } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    // Check if Resend is available
    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)
    if (!searchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    console.log("Sending email for search:", searchId)
    console.log("Recipient:", recipientEmail)

    // Extract search results data
    const trademarkName = searchData.trademark_name || searchData.search_results?.trademarkName || "Your Trademark"
    const results = searchData.search_results?.results || "No results available yet."
    const recommendations = searchData.search_results?.recommendations || ""
    const nextSteps = searchData.search_results?.nextSteps || ""

    // Create HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Trademark Search Results</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #1e40af;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
      background-color: #f9fafb;
    }
    .section {
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .section-title {
      color: #1e40af;
      margin-top: 0;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 10px;
    }
    .custom-message {
      background-color: #f0f7ff;
      border-left: 4px solid #1e40af;
      padding: 15px;
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #6b7280;
      background-color: #f3f4f6;
    }
    .button {
      display: inline-block;
      background-color: #1e40af;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Just Protected</h1>
      <p>Trademark Protection Experts</p>
    </div>
    
    <div class="content">
      <h2>Your Trademark Search Results</h2>
      
      <p>Dear ${searchData.search_results?.name || "Client"},</p>
      
      <p>Thank you for trusting Just Protected with your trademark search request. We have completed our analysis for your trademark: <strong>${trademarkName}</strong>.</p>
      
      ${customMessage ? `<div class="custom-message"><p>${customMessage}</p></div>` : ""}
      
      <div class="section">
        <h3 class="section-title">Search Results</h3>
        <p>${results}</p>
      </div>
      
      ${
        recommendations
          ? `
      <div class="section">
        <h3 class="section-title">Our Recommendations</h3>
        <p>${recommendations}</p>
      </div>
      `
          : ""
      }
      
      ${
        nextSteps
          ? `
      <div class="section">
        <h3 class="section-title">Next Steps</h3>
        <p>${nextSteps}</p>
      </div>
      `
          : ""
      }
      
      <p>If you have any questions or need additional information, please don't hesitate to contact our customer service team by replying to this email.</p>
      
      <p>To proceed with your trademark registration, click the button below:</p>
      
      <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://justprotected.com"}/pricing" class="button">Register Your Trademark</a>
      
      <p>Sincerely,<br>
      <strong>The Just Protected Team</strong><br>
      <em>Trademark Protection Experts</em></p>
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
      <p>This email is confidential and intended solely for the addressee.</p>
    </div>
  </div>
</body>
</html>
    `

    // Send the email
    const result = await resend.emails.send({
      from: "Just Protected <noreply@justprotected.com>",
      to: [recipientEmail],
      subject: `Trademark Search Results: ${trademarkName}`,
      html: htmlContent,
    })

    console.log("Email sent successfully:", result)

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      emailId: result.id,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error sending email", details: String(error) }, { status: 500 })
  }
}
