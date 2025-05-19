import { NextResponse } from "next/server"
import { getSearchData, updateSearchStatus } from "@/lib/supabase"
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
    const email = searchData.email || searchData.search_data?.email || searchData.search_results?.email
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
    const similarTrademarks = results.similarTrademarks || []
    const comments = results.comments || ""
    const recommendation = results.recommendation || ""
    const verificationToken = results.verificationToken || ""

    if (!email) {
      return NextResponse.json({ error: "No email found for this search" }, { status: 400 })
    }

    // Check if there are results to send
    if (!similarTrademarks || similarTrademarks.length === 0) {
      return NextResponse.json(
        { error: "No results available to send. Please edit the search to add results first." },
        { status: 400 },
      )
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

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Trademark Search Results</title>
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
              background-color: #4a6cf7; 
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
              background-color: #4a6cf7; 
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
              background-color: #3a5bd7;
            }
            .results { 
              margin: 25px 0;
              background-color: #f9f9ff;
              padding: 20px;
              border-radius: 6px;
              border-left: 4px solid #4a6cf7;
            }
            .results h3 {
              margin-top: 0;
              color: #4a6cf7;
            }
            .trademark-list { 
              margin: 10px 0; 
              padding-left: 20px; 
            }
            .trademark-list li {
              margin-bottom: 8px;
            }
            .button-container { 
              text-align: center; 
              margin: 25px 0; 
            }
            .section-title {
              color: #4a6cf7;
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
              color: #4a6cf7;
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
              <h1>Your Trademark Search Results</h1>
            </div>
            <div class="content">
              <p class="greeting">Dear ${name} ${surname},</p>
              
              <p>We have completed the search for your trademark <strong>${trademarkName}</strong> and have the results ready for you.</p>
              
              <div class="results">
                ${
                  similarTrademarks.length > 0
                    ? `
                  <h3>Similar Trademarks Found:</h3>
                  <ul class="trademark-list">
                    ${similarTrademarks.map((tm) => `<li>${tm}</li>`).join("")}
                  </ul>
                `
                    : "<p>No similar trademarks were found.</p>"
                }
                
                ${
                  comments
                    ? `
                  <h3>Comments:</h3>
                  <p>${comments}</p>
                `
                    : ""
                }
                
                ${
                  recommendation
                    ? `
                  <h3>Recommendation:</h3>
                  <p>${recommendation}</p>
                `
                    : ""
                }
              </div>
              
              <h3 class="section-title">Next Steps</h3>
              <p>To view the complete results and additional details, please use one of the following links:</p>
              
              <div class="button-container">
                <a href="${searchResultsLink}" class="button">View Complete Results</a>
                
                ${verificationToken ? `<a href="${tokenVerificationLink}" class="button">Token Verification</a>` : ""}
              </div>
              
              <p>If you have any questions or need additional assistance, please don't hesitate to contact us.</p>
              
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

    console.log(`Sending email to ${email} for search ID ${searchId}`)
    console.log(`Search results link: ${searchResultsLink}`)
    console.log(`Token verification link: ${tokenVerificationLink}`)

    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: "Just Protected <no-reply@justprotected.com>",
        to: [email],
        subject: `Trademark Search Results for ${trademarkName}`,
        html: emailHtml,
      })

      if (error) {
        console.error("Error sending email with Resend:", error)
        return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 })
      }

      console.log("Email sent successfully:", data)

      // Update the search status to completed
      await updateSearchStatus(searchId, "completed")

      return NextResponse.json({
        success: true,
        message: `Results sent to ${email}`,
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending email:", emailError)
      return NextResponse.json(
        {
          error: "Exception sending email",
          details: emailError instanceof Error ? emailError.message : String(emailError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in send-results API:", error)
    return NextResponse.json(
      {
        error: "Error sending search results",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
