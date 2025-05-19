import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId } = body

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search not found" }, { status: 404 })
    }

    // Extract email and other necessary data
    const email = searchData.email || searchData.search_results?.email || searchData.search_data?.email
    const name =
      searchData.search_data?.name ||
      searchData.search_results?.name ||
      searchData.search_results?.firstName ||
      "Client"
    const surname =
      searchData.search_data?.surname || searchData.search_results?.surname || searchData.search_results?.lastName || ""
    const trademarkName =
      searchData.search_data?.trademarkName ||
      searchData.search_data?.trademark_name ||
      searchData.trademark_name ||
      "your trademark"

    // Get results data
    const results = searchData.results || {}
    const verificationToken = results.verificationToken || ""

    if (!email) {
      return NextResponse.json({ error: "No email found for this search" }, { status: 400 })
    }

    // Create verification links
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin") || "https://justprotected.com"

    // Direct search ID link (works without token)
    const searchResultsLink = `${baseUrl}/verification?search_id=${searchId}`

    // Token verification link (if token exists)
    const tokenVerificationLink = verificationToken ? `${baseUrl}/verification/${verificationToken}` : searchResultsLink

    // Logo URL
    const logoUrl = `${baseUrl}/logo.png`

    // Current year for copyright
    const currentYear = new Date().getFullYear()

    // Prepare reminder email content
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reminder: Your Trademark Search Results</title>
          <style>
            /* Base styles */
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f5f7fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header { 
              background-color: #f7a74a; /* Different color for reminder */
              padding: 20px; 
              text-align: center; 
            }
            .logo {
              max-width: 180px;
              height: auto;
              margin-bottom: 10px;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content { 
              padding: 30px; 
              background-color: #ffffff; 
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .footer { 
              text-align: center; 
              margin-top: 20px; 
              padding: 20px;
              background-color: #f5f7fa;
              font-size: 12px; 
              color: #666; 
            }
            .button { 
              display: inline-block; 
              background-color: #f7a74a; /* Different color for reminder */
              color: white !important; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 10px; 
              font-weight: 600;
              text-align: center;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #e69539;
            }
            .reminder-box { 
              margin: 25px 0;
              background-color: #fff9f2;
              padding: 20px;
              border-radius: 6px;
              border-left: 4px solid #f7a74a;
            }
            .button-container { 
              text-align: center; 
              margin: 25px 0; 
            }
            .section-title {
              color: #f7a74a;
              border-bottom: 1px solid #eaeaea;
              padding-bottom: 8px;
              margin-top: 25px;
            }
            .social-links {
              text-align: center;
              margin-top: 15px;
            }
            .social-link {
              display: inline-block;
              margin: 0 10px;
              color: #f7a74a;
              text-decoration: none;
            }
            .contact-info {
              text-align: center;
              margin-top: 15px;
              color: #666;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                border-radius: 0;
              }
              .button {
                display: block;
                margin: 10px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${logoUrl}" alt="Just Protected Logo" class="logo">
              <h1>Reminder: Your Trademark Search Results</h1>
            </div>
            <div class="content">
              <p class="greeting">Dear ${name} ${surname},</p>
              
              <p>We noticed that you haven't viewed your trademark search results for <strong>${trademarkName}</strong> yet.</p>
              
              <div class="reminder-box">
                <h3>Why This Is Important</h3>
                <p>Your trademark search results contain valuable information about potential conflicts and next steps for protecting your brand. Reviewing these results is an essential step in your trademark journey.</p>
              </div>
              
              <h3 class="section-title">Access Your Results</h3>
              <p>To view your complete results, please click on one of the following links:</p>
              
              <div class="button-container">
                <a href="${searchResultsLink}" class="button">View Your Results</a>
                
                ${verificationToken ? `<a href="${tokenVerificationLink}" class="button">Token Verification</a>` : ""}
              </div>
              
              <p>If you have any questions or need assistance understanding your results, our team is here to help.</p>
              
              <p>Best regards,<br>The Just Protected Team</p>
            </div>
            <div class="footer">
              <div class="social-links">
                <a href="https://twitter.com/justprotected" class="social-link">Twitter</a>
                <a href="https://linkedin.com/company/justprotected" class="social-link">LinkedIn</a>
                <a href="https://facebook.com/justprotected" class="social-link">Facebook</a>
              </div>
              <div class="contact-info">
                <p>Email: support@justprotected.com | Phone: +1 (555) 123-4567</p>
              </div>
              <p>© ${currentYear} Just Protected. All rights reserved.</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `

    console.log(`Sending reminder email to ${email} for search ID ${searchId}`)

    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: "Just Protected <no-reply@justprotected.com>",
        to: [email],
        subject: `Reminder: Trademark Search Results for ${trademarkName}`,
        html: emailHtml,
      })

      if (error) {
        console.error("Error sending reminder email with Resend:", error)
        return NextResponse.json({ error: "Failed to send reminder email", details: error }, { status: 500 })
      }

      console.log("Reminder email sent successfully:", data)

      // Update the search with reminder sent timestamp
      // In a real implementation, you would update a 'reminder_sent_at' field
      // For now, we'll just log it
      console.log(`Reminder sent for search ${searchId} at ${new Date().toISOString()}`)

      return NextResponse.json({
        success: true,
        message: `Reminder sent to ${email}`,
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending reminder email:", emailError)
      return NextResponse.json(
        {
          error: "Exception sending reminder email",
          details: emailError instanceof Error ? emailError.message : String(emailError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in send-reminder API:", error)
    return NextResponse.json(
      {
        error: "Error sending reminder",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
