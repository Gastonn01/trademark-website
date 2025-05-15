import { NextResponse } from "next/server"
import { getSearchData, updateSearchStatus } from "@/lib/supabase"
import { Resend } from "resend"

export const dynamic = "force-dynamic"
export const fetchCache = "auto"

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
    const similarTrademarks = results.similarTrademarks || []
    const comments = results.comments || ""
    const recommendation = results.recommendation || ""

    // Generate a verification token if one doesn't exist
    let verificationToken = results.verificationToken
    if (!verificationToken) {
      verificationToken = `token${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

      // Update the search with the new token
      try {
        await fetch("/api/admin/update-search-results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchId: searchId,
            results: {
              ...results,
              verificationToken: verificationToken,
            },
          }),
        })
      } catch (error) {
        console.error("Failed to update search with verification token:", error)
      }
    }

    if (!email) {
      return NextResponse.json({ error: "No email found for this search" }, { status: 400 })
    }

    // IMPORTANT: Use the actual production domain
    // Replace this with your actual domain
    const productionDomain = "https://justprotected.com"

    // Token verification link - this is the primary link we want to use
    const verificationLink = `${productionDomain}/verification/${verificationToken}`

    console.log(`Sending email to ${email} for search ID ${searchId}`)
    console.log(`Verification link: ${verificationLink}`)

    // Prepare email content in English
    const emailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4a6cf7; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px; }
            .results { margin: 20px 0; }
            .trademark-list { margin: 10px 0; padding-left: 20px; }
            .button-container { text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Trademark Search Results</h1>
            </div>
            <div class="content">
              <p>Dear ${name} ${surname},</p>
              
              <p>We have completed the search for your trademark <strong>${trademarkName}</strong> and have the results ready for you.</p>
              
              <p>To view your complete search results with all details, please click the button below:</p>
              
              <div class="button-container">
                <a href="${verificationLink}" class="button">View Your Search Results</a>
              </div>
              
              <p>This link will take you directly to your personalized verification page where you can review all the information about your trademark search.</p>
              
              <p>If you have any questions or need additional assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>The Just Protected Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `

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
        verificationLink: verificationLink,
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
