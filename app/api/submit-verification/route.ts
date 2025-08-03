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
    const countriesString = formData.get("countries") as string
    const classesString = formData.get("classes") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const postalCode = formData.get("postalCode") as string
    const country = formData.get("country") as string

    // Parse countries and classes
    const countries = countriesString ? JSON.parse(countriesString) : []
    const classes = classesString ? JSON.parse(classesString) : []

    // Handle file uploads
    const files = formData.getAll("files") as File[]
    const uploadedFiles = []

    for (const file of files) {
      if (file.size > 0) {
        const filename = `${uuidv4()}-${file.name}`
        const blob = await put(filename, file, {
          access: "public",
        })
        uploadedFiles.push({
          name: file.name,
          url: blob.url,
          size: file.size,
        })
      }
    }

    // Generate reference ID
    const referenceId = `TM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Save to database
    const searchData = {
      id: uuidv4(),
      reference_id: referenceId,
      trademark_name: trademarkName,
      trademark_type: trademarkType,
      countries: countries,
      classes: classes,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      company: company,
      address: address,
      city: city,
      postal_code: postalCode,
      country: country,
      files: uploadedFiles,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    await saveSearchData(searchData)

    // Send confirmation email to user
    await resend.emails.send({
      from: "Trademark Registration <noreply@trademarkregistration.com>",
      to: [email],
      subject: "Trademark Verification Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your trademark verification request</h2>
          
          <p>Dear ${firstName} ${lastName},</p>
          
          <p>We have successfully received your trademark verification request. Here are the details:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Submission Details</h3>
            <p><strong>Reference ID:</strong> ${referenceId}</p>
            <p><strong>Trademark Name:</strong> ${trademarkName}</p>
            <p><strong>Trademark Type:</strong> ${trademarkType}</p>
            <p><strong>Countries:</strong> ${countries.map((c: any) => c.name).join(", ")}</p>
            <p><strong>Classes:</strong> ${classes.map((c: any) => `Class ${c.number}: ${c.description}`).join(", ")}</p>
            <p><strong>Files Uploaded:</strong> ${uploadedFiles.length} file(s)</p>
          </div>
          
          <p>Your request is now being processed by our trademark experts. You can expect to receive a detailed report within 24-48 hours.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The Trademark Registration Team</p>
        </div>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "Trademark Registration <noreply@trademarkregistration.com>",
      to: ["admin@trademarkregistration.com"],
      subject: `New Trademark Verification Request - ${referenceId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Trademark Verification Request</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Request Details</h3>
            <p><strong>Reference ID:</strong> ${referenceId}</p>
            <p><strong>Trademark Name:</strong> ${trademarkName}</p>
            <p><strong>Trademark Type:</strong> ${trademarkType}</p>
            <p><strong>Countries:</strong> ${countries.map((c: any) => c.name).join(", ")}</p>
            <p><strong>Classes:</strong> ${classes.map((c: any) => `Class ${c.number}: ${c.description}`).join(", ")}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Address:</strong> ${address}, ${city}, ${postalCode}, ${country}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Files Uploaded</h3>
            ${uploadedFiles
              .map(
                (file) => `
              <p><a href="${file.url}" target="_blank">${file.name}</a> (${Math.round(file.size / 1024)} KB)</p>
            `,
              )
              .join("")}
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Verification request submitted successfully",
      referenceId,
    })
  } catch (error) {
    console.error("Error submitting verification:", error)
    return NextResponse.json({ success: false, message: "Failed to submit verification request" }, { status: 500 })
  }
}
