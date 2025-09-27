import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const trademarkName = formData.get("trademarkName") as string
    const trademarkType = formData.get("trademarkType") as string
    const goodsAndServices = formData.get("goodsAndServices") as string
    const name = formData.get("name") as string
    const surname = formData.get("surname") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const marketing = formData.get("marketing") === "true"

    // Parse countries and classes from form data
    const countries = []
    const selectedClasses = []

    // Extract countries data
    const countryEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("countries["))
    for (const [key, value] of countryEntries) {
      try {
        const countryData = JSON.parse(value as string)
        countries.push(countryData)
      } catch (parseError) {
        console.error("Error parsing country data:", parseError)
      }
    }

    // Extract selected classes
    const classEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("selectedClasses["))
    for (const [key, value] of classEntries) {
      selectedClasses.push(Number.parseInt(value as string))
    }

    // Handle file uploads
    const files = []
    const fileEntries = Array.from(formData.entries()).filter(([key]) => key === "files")

    for (const [key, file] of fileEntries) {
      if (file instanceof File && file.size > 0) {
        try {
          const filename = `${uuidv4()}-${file.name}`
          const blob = await put(filename, file, {
            access: "public",
          })

          files.push({
            name: file.name,
            url: blob.url,
            size: file.size,
            type: file.type,
          })
        } catch (uploadError) {
          console.error("Error uploading file:", uploadError)
        }
      }
    }

    // Generate reference ID
    const referenceId = `TM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Save to database - using only basic fields that likely exist
    const searchData = {
      trademark_name: trademarkName,
      email: email,
      status: "pending",
    }

    try {
      await saveSearchData(searchData)
    } catch (dbError) {
      console.error("Database save error:", dbError)
      // Continue with email sending even if database save fails
    }

    // Send simple confirmation email to user
    try {
      const userEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Submission Received - Just Protected</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f9fafb; color: #1f2937;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
    <tr>
      <td style="padding: 0;">
        <!-- Header -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #1e40af; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🛡️ Just Protected</h1>
              <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 16px;">Trademark Protection Experts</p>
            </td>
          </tr>
        </table>
        
        <!-- Content -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 22px;">✅ Submission Received</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${name},</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Thank you for your submission. We have successfully received your trademark verification request and our team will review it shortly.</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">We will contact you soon with next steps.</p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 10px;">Best regards,</p>
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 0;"><strong>The Just Protected Team</strong></p>
            </td>
          </tr>
        </table>
        
        <!-- Footer -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #f3f4f6; padding: 20px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

      await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [email],
        subject: `✅ Submission Received - Just Protected`,
        html: userEmailHtml,
      })

      console.log("✅ User confirmation email sent successfully to:", email)
    } catch (emailError) {
      console.error("❌ Error sending user confirmation email:", emailError)
    }

    // Send detailed notification email to admin
    try {
      const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Trademark Verification Request - Just Protected Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f9fafb; color: #1f2937;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
    <tr>
      <td style="padding: 0;">
        <!-- Header -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #dc2626; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🚨 New Verification Request</h1>
              <p style="color: #fecaca; margin: 8px 0 0 0; font-size: 16px;">Just Protected Admin Panel</p>
            </td>
          </tr>
        </table>
        
        <!-- Content -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #dc2626; margin-top: 0; margin-bottom: 20px; font-size: 22px;">New Trademark Verification Request</h2>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Request Details</h3>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Reference ID:</strong> ${referenceId}</p>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Trademark Name:</strong> ${trademarkName}</p>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Trademark Type:</strong> ${trademarkType}</p>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Goods & Services:</strong> ${goodsAndServices}</p>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Countries:</strong> ${countries.map((c: any) => c.name || c).join(", ")}</p>
                <p style="color: #991b1b; margin: 8px 0;"><strong>Classes:</strong> ${selectedClasses.length > 0 ? selectedClasses.map((c) => `Class ${c}`).join(", ") : "Class 1"}</p>
              </div>
              
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">👤 Contact Information</h3>
                <p style="color: #1e40af; margin: 8px 0;"><strong>Name:</strong> ${name} ${surname}</p>
                <p style="color: #1e40af; margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                <p style="color: #1e40af; margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
                <p style="color: #1e40af; margin: 8px 0;"><strong>Marketing Consent:</strong> ${marketing ? "Yes" : "No"}</p>
              </div>
              
              ${
                files.length > 0
                  ? `
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #047857; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📎 Uploaded Files</h3>
                ${files
                  .map(
                    (file) => `
                  <p style="color: #047857; margin: 8px 0;"><a href="${file.url}" target="_blank" style="color: #047857; text-decoration: underline;">${file.name}</a> (${(file.size / 1024).toFixed(2)} KB)</p>
                `,
                  )
                  .join("")}
              </div>
              `
                  : ""
              }
              
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;"><strong>Action Required:</strong> Please review this verification request and process it within 24-48 hours.</p>
            </td>
          </tr>
        </table>
        
        <!-- Footer -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="background-color: #f3f4f6; padding: 20px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Just Protected Admin Notification System</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">This is an automated notification</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

      await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: ["gflacort@gmail.com", "lacortgaston@gmail.com"],
        subject: `🚨 New Trademark Verification Request - ${referenceId}`,
        html: adminEmailHtml,
      })

      console.log("✅ Admin notification email sent successfully")
    } catch (adminEmailError) {
      console.error("❌ Error sending admin notification email:", adminEmailError)
    }

    return NextResponse.json({
      success: true,
      message: "Verification request submitted successfully",
      referenceId,
    })
  } catch (error) {
    console.error("Error processing verification request:", error)
    return NextResponse.json({ success: false, message: "Failed to process verification request" }, { status: 500 })
  }
}
