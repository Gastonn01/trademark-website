import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { saveVerificationData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Starting verification submission process...")

    const formData = await request.formData()
    console.log("📝 Form data received")

    // Extract form fields
    const trademarkName = formData.get("trademarkName") as string
    const trademarkType = formData.get("trademarkType") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const marketing = formData.get("marketing") === "true"

    // Parse JSON fields
    const countries = JSON.parse((formData.get("countries") as string) || "[]")
    const selectedClasses = JSON.parse((formData.get("selectedClasses") as string) || "[1]")

    // Handle file uploads
    const uploadedFiles: any[] = []
    const files = formData.getAll("files") as File[]

    console.log(`📁 Processing ${files.length} files...`)

    for (const file of files) {
      if (file && file.size > 0) {
        try {
          // Convert file to base64 for storage
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const base64 = buffer.toString("base64")

          uploadedFiles.push({
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64,
            uploadedAt: new Date().toISOString(),
          })

          console.log(`✅ File processed: ${file.name} (${file.size} bytes)`)
        } catch (fileError) {
          console.error(`❌ Error processing file ${file.name}:`, fileError)
        }
      }
    }

    // Generate unique search ID
    const searchId = `verification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Prepare verification data
    const verificationData = {
      searchId,
      trademarkName,
      trademarkType,
      email,
      phone,
      marketing,
      countries,
      selectedClasses,
      uploadedFiles,
      filesCount: uploadedFiles.length,
      submittedAt: new Date().toISOString(),
    }

    console.log("💾 Saving verification data to database...")

    // Save to database
    try {
      const result = await saveVerificationData(verificationData)
      console.log("✅ Verification data saved successfully:", result)
    } catch (dbError) {
      console.error("❌ Database save failed:", dbError)
      // Continue with email sending even if DB save fails
    }

    console.log("📧 Sending confirmation email...")

    // Send confirmation email to user
    try {
      const countryNames = countries.map((c: any) => c.name).join(", ")
      const classNumbers = selectedClasses.join(", ")

      await resend.emails.send({
        from: "Trademark Registration <noreply@trademarkregistration.io>",
        to: [email],
        subject: "Trademark Verification Request Received",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Thank You for Your Trademark Verification Request</h2>
            
            <p>Dear ${trademarkName ? "Trademark Owner" : "Valued Client"},</p>
            
            <p>We have successfully received your trademark verification request. Here are the details of your submission:</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Submission Details</h3>
              <p><strong>Trademark Name:</strong> ${trademarkName}</p>
              <p><strong>Trademark Type:</strong> ${trademarkType}</p>
              <p><strong>Countries:</strong> ${countryNames}</p>
              <p><strong>Classes:</strong> ${classNumbers}</p>
              <p><strong>Files Uploaded:</strong> ${uploadedFiles.length}</p>
              <p><strong>Reference ID:</strong> ${searchId}</p>
            </div>
            
            <p>Your request is now being processed by our trademark experts. You can expect to receive a detailed analysis within 24-48 hours.</p>
            
            <p>If you have any questions or need immediate assistance, please don't hesitate to contact us at <a href="mailto:support@trademarkregistration.io">support@trademarkregistration.io</a> or call us at +1 (555) 123-4567.</p>
            
            <p>Thank you for choosing our trademark services.</p>
            
            <p>Best regards,<br>
            The Trademark Registration Team</p>
          </div>
        `,
      })

      console.log("✅ Confirmation email sent successfully")
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError)
      // Don't fail the entire request if email fails
    }

    console.log("📧 Sending notification email to admin...")

    // Send notification email to admin
    try {
      const countryNames = countries.map((c: any) => c.name).join(", ")
      const classNumbers = selectedClasses.join(", ")

      await resend.emails.send({
        from: "Trademark Registration <noreply@trademarkregistration.io>",
        to: ["admin@trademarkregistration.io"],
        subject: `New Verification Request: ${trademarkName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626;">New Trademark Verification Request</h2>
            
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Request Details</h3>
              <p><strong>Trademark Name:</strong> ${trademarkName}</p>
              <p><strong>Type:</strong> ${trademarkType}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Countries:</strong> ${countryNames}</p>
              <p><strong>Classes:</strong> ${classNumbers}</p>
              <p><strong>Files:</strong> ${uploadedFiles.length}</p>
              <p><strong>Marketing Consent:</strong> ${marketing ? "Yes" : "No"}</p>
              <p><strong>Reference ID:</strong> ${searchId}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            ${
              uploadedFiles.length > 0
                ? `
              <h3>Uploaded Files:</h3>
              <ul>
                ${uploadedFiles
                  .map(
                    (file) => `
                  <li>${file.name} (${file.type}, ${Math.round(file.size / 1024)}KB)</li>
                `,
                  )
                  .join("")}
              </ul>
            `
                : ""
            }
          </div>
        `,
      })

      console.log("✅ Admin notification email sent successfully")
    } catch (adminEmailError) {
      console.error("❌ Admin email sending failed:", adminEmailError)
    }

    console.log("🎉 Verification submission completed successfully")

    return NextResponse.json({
      success: true,
      message: "Verification request submitted successfully",
      searchId: searchId,
    })
  } catch (error) {
    console.error("❌ Error in verification submission:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit verification request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
