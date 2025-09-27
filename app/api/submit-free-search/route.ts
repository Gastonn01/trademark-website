import { NextResponse } from "next/server"
import { Resend } from "resend"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData, ensureTrademarkSearchesTableExists } from "@/lib/supabase"

export const runtime = "nodejs"

// Initialize Resend with error handling
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
  // Always return a success response to the client
  // This ensures the user experience is not disrupted
  const successResponse = (searchId: string) => {
    return NextResponse.json({
      message: "Form submitted successfully",
      searchId,
    })
  }

  try {
    const formData = await req.formData()
    const searchId = (formData.get("searchId") as string) || uuidv4()
    const formType = formData.get("formType") || "free-search"

    // Create a searchData object with all form values
    const searchData: { [key: string]: any } = {}

    for (const [key, value] of formData.entries()) {
      if (key !== "files" && key !== "formType" && key !== "searchId" && key !== "logo" && typeof value === "string") {
        searchData[key] = value
      }
    }

    // Log key information
    console.log("Processing search submission:", {
      searchId,
      formType,
      email: searchData.email,
      trademarkName: searchData.trademarkName,
    })

    // Ensure the trademark_searches table exists
    await ensureTrademarkSearchesTableExists()

    try {
      console.log("Saving search data to Supabase...")
      // Save data to Supabase using the corrected format
      const saveResult = await saveSearchData(searchId, searchData, formType as string)
      console.log("Save result:", saveResult)
    } catch (error) {
      console.error("Error saving search data:", error)
      // Continue with the process even if saving fails
    }

    // Try to send emails if Resend is available
    if (resend) {
      try {
        // Customize subject with trademark name
        const trademarkName = searchData.trademarkName || "Unnamed Trademark"
        const customSubject = `New free search request received: ${trademarkName}`

        // Build a simple text email body
        let emailBody = `New free search request received: ${formType}\n\n`
        for (const [key, value] of Object.entries(searchData)) {
          emailBody += `${key}: ${value}\n`
        }

        // Send notification email
        await resend.emails
          .send({
            from: "Just Protected <noreply@justprotected.com>",
            to: ["lacortgaston@gmail.com", "gflacort@gmail.com"],
            subject: customSubject,
            text: emailBody,
          })
          .catch((e) => console.error("Error sending notification email:", e))

        // Send confirmation email to user if email exists
        if (searchData.email) {
          await resend.emails
            .send({
              from: "Just Protected <noreply@justprotected.com>",
              to: searchData.email,
              subject: "Thank you for your trademark search request",
              html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Confirmation - Just Protected</title>
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
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Trademark Search Request Confirmation</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${searchData.firstName || searchData.name || "Client"},</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Thank you for trusting <strong>Just Protected</strong> with your trademark protection. We are pleased to confirm that we have received your trademark search request.</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Our team of intellectual property experts is already working on your case and will conduct a comprehensive analysis to assess the availability and registerability of your trademark.</p>
              
              <div style="background-color: #f0f7ff; border-left: 4px solid #1e40af; padding: 15px; margin-bottom: 20px;">
                <p style="color: #1e3a8a; margin: 0; font-weight: 500;">We will contact you in the coming hours with your search results and personalized recommendations to effectively protect your trademark.</p>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">If you have any questions or need additional information in the meantime, please don't hesitate to contact our customer service team by replying to this email.</p>
              
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
              <p style="color: #6b7280; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">This email is confidential and intended solely for the addressee.</p>
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
            .catch((e) => console.error("Error sending confirmation email:", e))
        }
      } catch (emailError) {
        console.error("Error in email sending process:", emailError)
        // Continue with process even if email fails
      }
    }

    return successResponse(searchId)
  } catch (error) {
    // Log the error but still return a success response
    console.error("Error processing form submission:", error)
    return successResponse(uuidv4())
  }
}
