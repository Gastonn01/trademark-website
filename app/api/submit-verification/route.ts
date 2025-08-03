import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const trademarkType = formData.get("trademarkType") as string
    const trademarkName = formData.get("trademarkName") as string
    const goodsAndServices = formData.get("goodsAndServices") as string
    const name = formData.get("name") as string
    const surname = formData.get("surname") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const marketing = formData.get("marketing") === "true"

    // Parse countries and classes
    const countries: any[] = []
    const selectedClasses: number[] = []

    // Extract countries
    let countryIndex = 0
    while (formData.get(`countries[${countryIndex}]`)) {
      const countryData = formData.get(`countries[${countryIndex}]`) as string
      try {
        countries.push(JSON.parse(countryData))
      } catch {
        // If parsing fails, treat as string
        countries.push({ name: countryData, classes: 1 })
      }
      countryIndex++
    }

    // Extract selected classes
    let classIndex = 0
    while (formData.get(`selectedClasses[${classIndex}]`)) {
      const classNumber = Number.parseInt(formData.get(`selectedClasses[${classIndex}]`) as string)
      if (!isNaN(classNumber)) {
        selectedClasses.push(classNumber)
      }
      classIndex++
    }

    // Handle files
    const files: File[] = []
    const fileEntries = formData.getAll("files")
    fileEntries.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        files.push(file)
      }
    })

    // Generate reference ID
    const referenceId = `TM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Prepare data for database
    const searchData = {
      id: uuidv4(),
      search_data: {
        trademarkType,
        trademarkName,
        goodsAndServices,
        countries,
        selectedClasses,
        name,
        surname,
        email,
        phone,
        marketing,
        referenceId,
        files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      },
      status: "pending",
      created_at: new Date().toISOString(),
    }

    // Save to database
    try {
      await saveSearchData(searchData)
      console.log("Search data saved successfully")
    } catch (dbError) {
      console.error("Database save failed:", dbError)
      // Continue with email sending even if database save fails
    }

    // Prepare email content
    const countriesList = countries.map((c) => c.name || c).join(", ")
    const classesList = selectedClasses.length > 0 ? selectedClasses.join(", ") : "1"
    const filesList =
      files.length > 0 ? files.map((f) => `${f.name} (${Math.round(f.size / 1024)}KB)`).join(", ") : "None"

    // Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5; margin-bottom: 10px;">Thank You for Your Trademark Registration Request</h1>
          <p style="color: #6B7280; font-size: 16px;">We've received your application and our team is reviewing it.</p>
        </div>
        
        <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #374151; margin-bottom: 15px;">Your Submission Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Reference ID:</td>
              <td style="padding: 8px 0; color: #374151;">${referenceId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Trademark Name:</td>
              <td style="padding: 8px 0; color: #374151;">${trademarkName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Type:</td>
              <td style="padding: 8px 0; color: #374151;">${trademarkType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Countries:</td>
              <td style="padding: 8px 0; color: #374151;">${countriesList}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Classes:</td>
              <td style="padding: 8px 0; color: #374151;">${classesList}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Files:</td>
              <td style="padding: 8px 0; color: #374151;">${filesList}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6; margin-bottom: 20px;">
          <h3 style="color: #1E40AF; margin-bottom: 10px;">Next Steps</h3>
          <p style="color: #1E3A8A; margin-bottom: 0;">Our trademark experts will review your application and contact you within 24-48 hours with a detailed analysis and next steps.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; margin-bottom: 10px;">Questions? Contact us:</p>
          <p style="color: #4F46E5; font-weight: bold;">support@justprotected.com</p>
        </div>
      </div>
    `

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #DC2626;">New Trademark Registration Request</h1>
        <p><strong>Reference ID:</strong> ${referenceId}</p>
        <p><strong>Name:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Trademark Name:</strong> ${trademarkName}</p>
        <p><strong>Type:</strong> ${trademarkType}</p>
        <p><strong>Goods & Services:</strong> ${goodsAndServices}</p>
        <p><strong>Countries:</strong> ${countriesList}</p>
        <p><strong>Classes:</strong> ${classesList}</p>
        <p><strong>Files:</strong> ${filesList}</p>
        <p><strong>Marketing Consent:</strong> ${marketing ? "Yes" : "No"}</p>
      </div>
    `

    try {
      // Send user confirmation email
      await resend.emails.send({
        from: "JustProtected <noreply@justprotected.com>",
        to: [email],
        subject: `Trademark Registration Received - ${referenceId}`,
        html: userEmailHtml,
      })

      // Send admin notification email
      await resend.emails.send({
        from: "JustProtected <noreply@justprotected.com>",
        to: ["support@justprotected.com"],
        subject: `New Trademark Registration - ${referenceId}`,
        html: adminEmailHtml,
      })

      console.log("Emails sent successfully")
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
      referenceId,
    })
  } catch (error) {
    console.error("Error processing verification form:", error)
    return NextResponse.json({ success: false, message: "Failed to process registration" }, { status: 500 })
  }
}
