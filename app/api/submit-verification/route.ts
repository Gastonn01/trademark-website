import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { saveVerificationData } from "@/lib/supabase"
import { put } from "@vercel/blob"

// Initialize Resend with proper error handling
let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
    console.log("✅ Resend initialized successfully")
  } else {
    console.error("❌ RESEND_API_KEY environment variable is missing")
  }
} catch (error) {
  console.error("❌ Failed to initialize Resend:", error)
}

// Helper function to add delay between API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function POST(request: NextRequest) {
  // Always return success to client - same pattern as working emails
  const successResponse = (searchId: string, filesUploaded: number, emailStatus: any) => {
    return NextResponse.json({
      success: true,
      message: "Verification form submitted successfully",
      searchId,
      filesUploaded,
      emailStatus,
    })
  }

  try {
    console.log("🚀 Submit verification API called")

    // Parse FormData instead of JSON
    const formData = await request.formData()
    console.log("📝 Received form data keys:", Array.from(formData.keys()))

    // Extract form data
    const data = {
      formType: formData.get("formType") as string,
      trademarkType: formData.get("trademarkType") as string,
      trademarkName: formData.get("trademarkName") as string,
      goodsAndServices: formData.get("goodsAndServices") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      marketing: formData.get("marketing") === "true",
    }

    console.log("👤 Extracted user data:", {
      name: data.name,
      surname: data.surname,
      email: data.email,
      trademarkName: data.trademarkName,
      trademarkType: data.trademarkType,
    })

    // Extract countries array
    const countries: any[] = []
    let countryIndex = 0
    while (formData.has(`countries[${countryIndex}]`)) {
      try {
        const countryData = JSON.parse(formData.get(`countries[${countryIndex}]`) as string)
        countries.push(countryData)
      } catch (e) {
        console.error(`❌ Error parsing country ${countryIndex}:`, e)
      }
      countryIndex++
    }

    // Extract selected classes array
    const selectedClasses: number[] = []
    let classIndex = 0
    while (formData.has(`selectedClasses[${classIndex}]`)) {
      const classValue = formData.get(`selectedClasses[${classIndex}]`) as string
      selectedClasses.push(Number.parseInt(classValue))
      classIndex++
    }

    // Get files and upload them to blob storage
    const files = formData.getAll("files") as File[]
    const validFiles = files.filter((file) => file.size > 0)

    console.log(`📁 Found ${validFiles.length} valid files to upload`)

    // Upload files to blob storage and get URLs
    const uploadedFiles: Array<{ name: string; url: string; size: number }> = []

    for (const file of validFiles) {
      try {
        console.log(`⬆️ Uploading file: ${file.name} (${file.size} bytes)`)
        const blob = await put(`verification/${Date.now()}-${file.name}`, file, {
          access: "public",
        })
        uploadedFiles.push({
          name: file.name,
          url: blob.url,
          size: file.size,
        })
        console.log(`✅ Successfully uploaded: ${file.name} -> ${blob.url}`)
      } catch (uploadError) {
        console.error(`❌ Failed to upload file ${file.name}:`, uploadError)
        // Continue with other files even if one fails
      }
    }

    console.log("📊 Parsed verification data:", {
      name: data.name,
      email: data.email,
      countries: countries.length,
      selectedClasses: selectedClasses.length,
      files: validFiles.length,
      uploadedFiles: uploadedFiles.length,
    })

    // Validate required fields
    if (!data.email || !data.name || !data.surname) {
      console.error("❌ Missing required fields:", { name: data.name, surname: data.surname, email: data.email })
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for database
    const verificationData = {
      searchId: crypto.randomUUID(),
      trademarkName: data.trademarkName || "",
      trademarkType: data.trademarkType || "",
      goodsAndServices: data.goodsAndServices || "",
      countries: countries,
      selectedClasses: selectedClasses,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone || "",
      marketing: data.marketing,
      formType: data.formType || "verification",
      filesCount: uploadedFiles.length,
      uploadedFiles: uploadedFiles,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Try to save to database (non-blocking)
    try {
      const savedData = await saveVerificationData(verificationData)
      console.log("💾 Verification data saved to database:", savedData?.data?.[0]?.id)
    } catch (dbError) {
      console.error("❌ Database save failed, continuing with email:", dbError)
    }

    // Create file attachments section for email
    const fileAttachmentsHtml =
      uploadedFiles.length > 0
        ? `
      <h2 style="color: #1e40af; margin-bottom: 20px;">📎 Uploaded Files (${uploadedFiles.length})</h2>
      <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        ${uploadedFiles
          .map(
            (file, index) => `
          <div style="margin-bottom: 10px; padding: 10px; background-color: white; border-radius: 4px; border: 1px solid #e5e7eb;">
            <p style="margin: 0; font-weight: bold; color: #1e40af;">${index + 1}. ${file.name}</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">Size: ${(file.size / 1024).toFixed(2)} KB</p>
            <a href="${file.url}" target="_blank" style="color: #1e40af; text-decoration: none; font-weight: bold; background-color: #e0e7ff; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-top: 5px;">
              📥 Download File
            </a>
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : `
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #92400e;">⚠️ No files were uploaded with this submission.</p>
      </div>
    `

    // Prepare enhanced email content for admin
    const adminEmailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Trademark Verification Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
        <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center; margin-bottom: 20px; border-radius: 8px;">
            <h1 style="margin: 0; font-size: 24px;">🚨 URGENT: New Trademark Verification Submission</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">IMMEDIATE ACTION REQUIRED</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Search ID: ${verificationData.searchId}</p>
        </div>
        
        <div style="padding: 20px;">
            <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0; color: #dc2626; font-weight: bold;">⏰ Client is waiting for response within 24 hours!</p>
            </div>

            <h2 style="color: #1e40af; margin-bottom: 20px;">👤 Client Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                <tr style="background-color: #f9fafb;">
                    <td style="padding: 12px; font-weight: bold; width: 30%; border: 1px solid #e5e7eb;">Name:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.name} ${data.surname}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Email:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        <a href="mailto:${data.email}" style="color: #1e40af; text-decoration: none;">${data.email}</a>
                    </td>
                </tr>
                <tr style="background-color: #f9fafb;">
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Phone:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        ${data.phone ? `<a href="tel:${data.phone}" style="color: #1e40af; text-decoration: none;">${data.phone}</a>` : "Not provided"}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Marketing Consent:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        <span style="color: ${data.marketing ? "#16a34a" : "#dc2626"}; font-weight: bold;">
                            ${data.marketing ? "✅ YES" : "❌ NO"}
                        </span>
                    </td>
                </tr>
            </table>

            <h2 style="color: #1e40af; margin-bottom: 20px;">🏷️ Trademark Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                <tr style="background-color: #f9fafb;">
                    <td style="padding: 12px; font-weight: bold; width: 30%; border: 1px solid #e5e7eb;">Trademark Type:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        <span style="background-color: #e0e7ff; padding: 4px 8px; border-radius: 4px; font-weight: bold;">
                            ${data.trademarkType || "Not specified"}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Trademark Name:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #1e40af; font-size: 16px;">
                        ${data.trademarkName || "Not provided"}
                    </td>
                </tr>
                <tr style="background-color: #f9fafb;">
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Goods and Services:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.goodsAndServices || "Not provided"}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Countries:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        ${countries.length > 0 ? countries.map((c) => `<span style="background-color: #dcfce7; padding: 2px 6px; border-radius: 4px; margin-right: 4px; display: inline-block; margin-bottom: 2px;">${c.name}</span>`).join("") : "None selected"}
                    </td>
                </tr>
                <tr style="background-color: #f9fafb;">
                    <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">Classes:</td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        ${selectedClasses.length > 0 ? selectedClasses.map((c) => `<span style="background-color: #fef3c7; padding: 2px 6px; border-radius: 4px; margin-right: 4px; display: inline-block; margin-bottom: 2px;">Class ${c}</span>`).join("") : "None selected"}
                    </td>
                </tr>
            </table>

            ${fileAttachmentsHtml}

            <div style="background-color: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0;">📋 SUBMISSION SUMMARY</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Search ID:</strong> ${verificationData.searchId}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Files Uploaded:</strong> ${uploadedFiles.length}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Countries Selected:</strong> ${countries.length}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Classes Selected:</strong> ${selectedClasses.length}</p>
            </div>

            <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0;">🚀 IMMEDIATE ACTION REQUIRED</h3>
                <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">Client expects response within 24 hours</p>
                <p style="margin: 5px 0; font-size: 14px;">Please review this submission and contact the client immediately</p>
                <div style="margin-top: 15px;">
                    <a href="mailto:${data.email}" style="background-color: white; color: #dc2626; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-right: 10px;">
                        📧 Email Client
                    </a>
                    ${data.phone ? `<a href="tel:${data.phone}" style="background-color: white; color: #dc2626; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">📞 Call Client</a>` : ""}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `

    // Prepare user confirmation email
    const userConfirmationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for your trademark verification request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #1e40af; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Just Protected</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Trademark Protection Experts</p>
        </div>
        
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e40af; margin-top: 0;">Thank you for your trademark verification request!</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${data.name},</p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                We have successfully received your trademark verification request and our expert team will begin reviewing it immediately.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #1e40af; padding: 20px; margin: 25px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Your Submission Details:</h3>
                <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Trademark Name:</strong> ${data.trademarkName || "Not provided"}</li>
                    <li><strong>Trademark Type:</strong> ${data.trademarkType || "Not specified"}</li>
                    <li><strong>Countries:</strong> ${countries.map((c) => c.name).join(", ") || "None selected"}</li>
                    <li><strong>Classes:</strong> ${selectedClasses.join(", ") || "None selected"}</li>
                    <li><strong>Files Uploaded:</strong> ${uploadedFiles.length} file(s)</li>
                    <li><strong>Reference ID:</strong> ${verificationData.searchId}</li>
                </ul>
            </div>
            
            <div style="background-color: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <p style="margin: 0; font-weight: bold;">✓ Your request is being processed</p>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Expected response time: 24-48 hours</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                If you have any questions or need immediate assistance, please don't hesitate to contact our support team by replying to this email.
            </p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 10px;">Best regards,</p>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 0;"><strong>The Just Protected Team</strong></p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
            <p style="margin: 10px 0 0 0;">This email was sent to ${data.email}</p>
        </div>
    </div>
</body>
</html>
`

    // Email sending logic - using exact same pattern as working free search emails
    const notificationEmails = ["lacortgaston@gmail.com", "gflacort@gmail.com"]
    const emailResults: Array<{ success: boolean; email: string; id?: string; error?: string }> = []

    console.log("📧 Starting email sending process...")

    // Only proceed with email sending if Resend is properly initialized
    if (resend) {
      try {
        // Send to first admin email
        console.log("📤 Sending email to:", notificationEmails[0])
        const result1 = await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: notificationEmails[0],
          subject: `🚨 URGENT: New Trademark Verification - ${data.name} ${data.surname} (${uploadedFiles.length} files)`,
          html: adminEmailContent,
        })
        emailResults.push({ success: true, email: notificationEmails[0], id: result1.data?.id })
        console.log("✅ First admin email sent successfully:", result1.data?.id)
      } catch (error) {
        console.error("❌ Failed to send first admin email:", error)
        emailResults.push({
          success: false,
          email: notificationEmails[0],
          error: error instanceof Error ? error.message : String(error),
        })
      }

      // Wait 1 second to respect rate limit
      await delay(1000)

      try {
        // Send to second admin email
        console.log("📤 Sending email to:", notificationEmails[1])
        const result2 = await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: notificationEmails[1],
          subject: `🚨 URGENT: New Trademark Verification - ${data.name} ${data.surname} (${uploadedFiles.length} files)`,
          html: adminEmailContent,
        })
        emailResults.push({ success: true, email: notificationEmails[1], id: result2.data?.id })
        console.log("✅ Second admin email sent successfully:", result2.data?.id)
      } catch (error) {
        console.error("❌ Failed to send second admin email:", error)
        emailResults.push({
          success: false,
          email: notificationEmails[1],
          error: error instanceof Error ? error.message : String(error),
        })
      }

      // Wait another second before sending user confirmation
      await delay(1000)

      try {
        // Send confirmation email to user
        console.log("📤 Sending confirmation email to:", data.email)
        const result3 = await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: data.email,
          subject: "✅ Thank you for your trademark verification request",
          html: userConfirmationEmail,
        })
        emailResults.push({ success: true, email: data.email, id: result3.data?.id })
        console.log("✅ User confirmation email sent successfully:", result3.data?.id)
      } catch (error) {
        console.error("❌ Failed to send user confirmation email:", error)
        emailResults.push({
          success: false,
          email: data.email,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    } else {
      console.error("❌ Resend not initialized - emails will not be sent")
      emailResults.push(
        { success: false, email: notificationEmails[0], error: "Resend not initialized" },
        { success: false, email: notificationEmails[1], error: "Resend not initialized" },
        { success: false, email: data.email, error: "Resend not initialized" },
      )
    }

    // Count successful and failed emails
    const successfulEmails = emailResults.filter((result) => result.success).length
    const failedEmails = emailResults.filter((result) => !result.success).length

    console.log(`📊 Email summary: ${successfulEmails} successful, ${failedEmails} failed`)
    console.log(`📁 Files uploaded: ${uploadedFiles.length}/${validFiles.length}`)

    // Log any failures
    emailResults.forEach((result, index) => {
      if (!result.success) {
        console.error(`❌ Email ${index + 1} to ${result.email} failed:`, result.error)
      }
    })

    // Log success details
    emailResults.forEach((result, index) => {
      if (result.success) {
        console.log(`✅ Email ${index + 1} to ${result.email} sent with ID:`, result.id)
      }
    })

    return successResponse(verificationData.searchId, uploadedFiles.length, {
      successful: successfulEmails,
      failed: failedEmails,
      details: emailResults,
    })
  } catch (error) {
    console.error("❌ Critical error in submit-verification API:", error)
    // Still return success to client - same pattern as working emails
    return successResponse("error-" + Date.now(), 0, {
      successful: 0,
      failed: 3,
      details: [{ success: false, email: "system", error: error instanceof Error ? error.message : String(error) }],
    })
  }
}
