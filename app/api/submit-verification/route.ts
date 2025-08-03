import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { saveVerificationData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    console.log("📝 Received verification form data:", {
      trademarkName: formData.trademarkName,
      email: formData.email,
      countries: formData.countries?.length || 0,
      classes: formData.selectedClasses?.length || 0,
      files: formData.uploadedFiles?.length || 0,
    })

    // Generate a unique search ID
    const searchId = `verification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Prepare verification data
    const verificationData = {
      ...formData,
      searchId,
      submittedAt: new Date().toISOString(),
    }

    // Save to database
    try {
      const result = await saveVerificationData(verificationData)
      console.log("✅ Verification data saved successfully:", result)
    } catch (dbError) {
      console.error("❌ Database save failed:", dbError)
      // Continue with email sending even if database fails
    }

    // Send confirmation email to user
    try {
      const userEmailResult = await resend.emails.send({
        from: "Trademark Registration <noreply@trademarkregistration.com>",
        to: [formData.email],
        subject: "Verification Request Received - Trademark Registration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Thank You for Your Verification Request</h2>
            
            <p>Dear ${formData.firstName || "Valued Client"},</p>
            
            <p>We have successfully received your trademark verification request. Here are the details:</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">Submission Details</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>Trademark Name:</strong> ${formData.trademarkName}</li>
                <li style="margin: 8px 0;"><strong>Trademark Type:</strong> ${formData.trademarkType}</li>
                <li style="margin: 8px 0;"><strong>Countries:</strong> ${formData.countries?.join(", ") || "Not specified"}</li>
                <li style="margin: 8px 0;"><strong>Classes:</strong> ${formData.selectedClasses?.join(", ") || "Not specified"}</li>
                <li style="margin: 8px 0;"><strong>Files Uploaded:</strong> ${formData.uploadedFiles?.length || 0}</li>
                <li style="margin: 8px 0;"><strong>Reference ID:</strong> ${searchId}</li>
              </ul>
            </div>
            
            <p>Your request is now being processed by our trademark experts. You can expect to receive a detailed report within 24-48 hours.</p>
            
            <p>If you have any questions or need immediate assistance, please don't hesitate to contact us at <a href="mailto:support@trademarkregistration.com">support@trademarkregistration.com</a> or call us at +1 (555) 123-4567.</p>
            
            <p>Best regards,<br>
            The Trademark Registration Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              This is an automated confirmation email. Please do not reply to this email address.
            </p>
          </div>
        `,
      })

      console.log("✅ User confirmation email sent:", userEmailResult)
    } catch (emailError) {
      console.error("❌ Failed to send user confirmation email:", emailError)
    }

    // Send notification email to admin
    try {
      const adminEmailResult = await resend.emails.send({
        from: "Trademark Registration <noreply@trademarkregistration.com>",
        to: ["admin@trademarkregistration.com"],
        subject: `New Verification Request - ${formData.trademarkName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626; margin-bottom: 20px;">New Verification Request Received</h2>
            
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #991b1b;">Client Information</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
                <li style="margin: 8px 0;"><strong>Email:</strong> ${formData.email}</li>
                <li style="margin: 8px 0;"><strong>Phone:</strong> ${formData.phone || "Not provided"}</li>
                <li style="margin: 8px 0;"><strong>Company:</strong> ${formData.company || "Not provided"}</li>
              </ul>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7;">
              <h3 style="margin-top: 0; color: #0c4a6e;">Trademark Details</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>Trademark Name:</strong> ${formData.trademarkName}</li>
                <li style="margin: 8px 0;"><strong>Type:</strong> ${formData.trademarkType}</li>
                <li style="margin: 8px 0;"><strong>Countries:</strong> ${formData.countries?.join(", ") || "Not specified"}</li>
                <li style="margin: 8px 0;"><strong>Classes:</strong> ${formData.selectedClasses?.join(", ") || "Not specified"}</li>
                <li style="margin: 8px 0;"><strong>Files:</strong> ${formData.uploadedFiles?.length || 0} uploaded</li>
                <li style="margin: 8px 0;"><strong>Reference ID:</strong> ${searchId}</li>
              </ul>
            </div>
            
            ${
              formData.additionalInfo
                ? `
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Additional Information</h3>
              <p style="white-space: pre-wrap;">${formData.additionalInfo}</p>
            </div>
            `
                : ""
            }
            
            <p style="margin-top: 30px;">
              <strong>Action Required:</strong> Please review this verification request and respond within 24-48 hours.
            </p>
          </div>
        `,
      })

      console.log("✅ Admin notification email sent:", adminEmailResult)
    } catch (emailError) {
      console.error("❌ Failed to send admin notification email:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Verification request submitted successfully",
      searchId,
    })
  } catch (error) {
    console.error("❌ Error processing verification request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process verification request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
