import { NextResponse } from "next/server"
import { Resend } from "resend"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData, getSearchData, ensureTableExists, uploadFileToStorage } from "@/lib/supabase"

// Configure the API route correctly
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Check if we're in a preview environment - more comprehensive check
const isPreviewEnvironment = () => {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

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

// Helper function to handle errors
const handleError = (error: any) => {
  console.error("Error details:", error)
  const message = error instanceof Error ? error.message : "Unknown error"
  const stack = error instanceof Error ? error.stack : ""
  const name = error instanceof Error ? error.name : ""
  return { message, stack, name, originalError: error }
}

export async function POST(req: Request) {
  // Check for preview mode immediately
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected in API route, returning mock response")
    return NextResponse.json({
      message: "Form submitted successfully (preview mode)",
      searchId: uuidv4(),
      previewMode: true,
    })
  }

  if (req.method === "POST") {
    const formData = await req.formData()
    const searchId = (formData.get("searchId") as string) || uuidv4()
    const formType = formData.get("formType")
    const files = formData.getAll("files") as File[]
    const logo = formData.get("logo") as File | null

    let emailBody = `New free search request received: ${formType}\n\n`
    const searchData: { [key: string]: any } = {}

    for (const [key, value] of formData.entries()) {
      if (key !== "files" && key !== "formType" && key !== "searchId" && key !== "logo") {
        emailBody += `${key}: ${value}\n`
        searchData[key] = value
      }
    }

    // Log to verify user email is captured correctly
    console.log("User email:", searchData.email)
    console.log("Trademark name:", searchData.trademarkName)

    try {
      // Try to ensure table exists, but continue even if it fails
      try {
        await ensureTableExists()
      } catch (tableError) {
        console.error("Error ensuring table exists, continuing with in-memory storage:", tableError)
      }

      console.log("Saving search data...")
      // Save data to Supabase or memory
      const saveResult = await saveSearchData(searchId, searchData, formType as string)
      console.log("Search data saved successfully to:", saveResult.source || "storage")

      // Process files for email attachments
      const attachments = []

      // Process logo if it exists
      if (logo && logo.size > 0) {
        try {
          console.log(`Processing logo: ${logo.name}, size: ${logo.size} bytes, type: ${logo.type}`)

          // Process logo metadata
          const uploadResult = await uploadFileToStorage(logo, searchId)

          if (!uploadResult.success) {
            console.error("Error processing logo:", uploadResult.error)
          } else {
            console.log(`Logo metadata processed successfully`)

            // Add logo information to search data
            const logoData = {
              ...uploadResult.logoData,
              hasLogo: true,
            }

            // Update search data with logo information
            await saveSearchData(searchId, { ...searchData, ...logoData }, formType as string)
            console.log("Logo metadata saved")
          }

          // Attach logo to email
          try {
            const content = await logo.arrayBuffer()
            attachments.push({
              filename: `logo-${logo.name}`,
              content: Buffer.from(content),
            })
            console.log(`Logo processed successfully for email`)
          } catch (logoError) {
            console.error("Error processing logo for email:", logoError)
          }
        } catch (fileError) {
          console.error(`Error processing logo:`, fileError)
        }
      }

      // Process additional files
      if (files.length > 0) {
        console.log(`Processing ${files.length} additional files`)
        for (const file of files) {
          if (file.size > 0) {
            try {
              const content = await file.arrayBuffer()
              attachments.push({
                filename: file.name,
                content: Buffer.from(content),
              })
              console.log(`File ${file.name} processed successfully`)
            } catch (fileError) {
              console.error(`Error processing file ${file.name}:`, fileError)
              // Continue with next file
            }
          }
        }
      }

      // Send notification email if Resend is available
      if (resend) {
        console.log("Sending notification email...")
        try {
          // Customize subject with trademark name
          const trademarkName = searchData.trademarkName || "Unnamed Trademark"
          const customSubject = `New free search request received: ${trademarkName}`

          // Send notification email
          const result = await resend.emails.send({
            from: "Just Protected <noreply@justprotected.com>",
            to: ["lacortgaston@gmail.com", "gflacort@gmail.com"],
            subject: customSubject,
            text: emailBody,
            attachments: attachments,
          })
          console.log("Notification email sent successfully")
        } catch (emailError) {
          console.error("Error sending notification email:", emailError)
          // Continue with process even if email fails
        }

        // Send confirmation email to user if email exists
        console.log("Sending confirmation email to user...")
        try {
          // Verify user email exists before sending
          if (!searchData.email) {
            console.error("No user email found in form data")
            // Continue with process even if no email
          } else {
            console.log("Attempting to send confirmation email to:", searchData.email)

            // Send confirmation email to user
            const userEmailResult = await resend.emails.send({
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
`,
            })
            console.log("Confirmation email sent successfully to user:", userEmailResult)
          }
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError)
          console.error("Error details:", JSON.stringify(emailError))
          // Continue with process even if email fails
        }
      } else {
        console.log("Email functionality disabled or Resend not available")
      }

      return NextResponse.json({
        message: "Form submitted successfully",
        searchId,
        previewMode: false,
      })
    } catch (error) {
      const errorDetails = handleError(error)
      console.error("Error processing form:", errorDetails)
      return NextResponse.json(
        {
          error: "Error processing the form",
          details: errorDetails,
          previewMode: false,
        },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

export async function GET(req: Request) {
  // Check for preview mode immediately
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected in API route GET, returning mock response")
    return NextResponse.json({
      message: "Mock search data (preview mode)",
      previewMode: true,
    })
  }

  const { searchParams } = new URL(req.url)
  const searchId = searchParams.get("search_id")

  if (!searchId) {
    return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
  }

  try {
    // Try to ensure table exists, but continue even if it fails
    try {
      await ensureTableExists()
    } catch (tableError) {
      console.error("Error ensuring table exists, continuing with in-memory storage:", tableError)
    }

    // Get data from Supabase or memory
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search results not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...(searchData.search_data || searchData.search_results),
      previewMode: false,
    })
  } catch (error) {
    const errorDetails = handleError(error)
    console.error("Error fetching search data:", errorDetails)
    return NextResponse.json(
      {
        error: "Error fetching search data",
        details: errorDetails,
        previewMode: false,
      },
      { status: 500 },
    )
  }
}
