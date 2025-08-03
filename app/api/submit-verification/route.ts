import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData, ensureTrademarkSearchesTableExists } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const trademarkName = formData.get("trademarkName") as string
    const trademarkType = formData.get("trademarkType") as string
    const description = formData.get("description") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zipCode = formData.get("zipCode") as string
    const country = formData.get("country") as string

    // Parse countries and classes
    const countriesStr = formData.get("countries") as string
    const classesStr = formData.get("classes") as string

    let countries = []
    let classes = []

    try {
      countries = countriesStr ? JSON.parse(countriesStr) : []
    } catch (e) {
      countries = []
    }

    try {
      classes = classesStr ? JSON.parse(classesStr) : []
    } catch (e) {
      classes = []
    }

    // Handle file uploads
    const files = []
    const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("file"))

    for (const [key, file] of fileEntries) {
      if (file instanceof File && file.size > 0) {
        try {
          const blob = await put(`verification-files/${uuidv4()}-${file.name}`, file, {
            access: "public",
          })
          files.push({
            name: file.name,
            url: blob.url,
            size: file.size,
            type: file.type,
          })
        } catch (error) {
          console.error("Error uploading file:", error)
        }
      }
    }

    // Generate reference ID
    const referenceId = `TM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Prepare search data for database
    const searchData = {
      id: uuidv4(),
      reference_id: referenceId,
      trademark_name: trademarkName,
      trademark_type: trademarkType,
      description,
      countries: JSON.stringify(countries),
      classes: JSON.stringify(classes),
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      address,
      city,
      state,
      zip_code: zipCode,
      country,
      files: JSON.stringify(files),
      status: "submitted",
      created_at: new Date().toISOString(),
    }

    // Save to database
    try {
      await ensureTrademarkSearchesTableExists()
      await saveSearchData(searchData)
    } catch (error) {
      console.error("Error saving to database:", error)
    }

    // Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your trademark verification request</h2>
        
        <p>Dear ${firstName} ${lastName},</p>
        
        <p>We have received your trademark verification request and our team is now processing it.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Submission Details:</h3>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Trademark Name:</strong> ${trademarkName}</p>
          <p><strong>Type:</strong> ${trademarkType}</p>
          <p><strong>Countries:</strong> ${countries.map((c: any) => c.name).join(", ")}</p>
          <p><strong>Classes:</strong> ${classes.map((c: any) => `Class ${c.number}: ${c.name}`).join(", ")}</p>
          ${files.length > 0 ? `<p><strong>Files:</strong> ${files.map((f) => f.name).join(", ")}</p>` : ""}
        </div>
        
        <p>Our trademark experts will review your request and you can expect to receive a detailed report within 24-48 hours.</p>
        
        <p>If you have any questions, please don't hesitate to contact us at support@trademarkia.com or call us at +1 (555) 123-4567.</p>
        
        <p>Best regards,<br>The Trademarkia Team</p>
      </div>
    `

    await resend.emails.send({
      from: "Trademarkia <noreply@trademarkia.com>",
      to: [email],
      subject: "Trademark Verification Request Received",
      html: userEmailHtml,
    })

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Trademark Verification Request</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Request Details:</h3>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Trademark Name:</strong> ${trademarkName}</p>
          <p><strong>Type:</strong> ${trademarkType}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Countries:</strong> ${countries.map((c: any) => c.name).join(", ")}</p>
          <p><strong>Classes:</strong> ${classes.map((c: any) => `Class ${c.number}: ${c.name}`).join(", ")}</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Contact Information:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Address:</strong> ${address}, ${city}, ${state} ${zipCode}, ${country}</p>
        </div>
        
        ${
          files.length > 0
            ? `
        <div style="background-color: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Uploaded Files:</h3>
          ${files
            .map(
              (file) => `
            <p><a href="${file.url}" target="_blank">${file.name}</a> (${(file.size / 1024).toFixed(2)} KB)</p>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }
      </div>
    `

    await resend.emails.send({
      from: "Trademarkia <noreply@trademarkia.com>",
      to: ["admin@trademarkia.com"],
      subject: `New Trademark Verification Request - ${referenceId}`,
      html: adminEmailHtml,
    })

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
