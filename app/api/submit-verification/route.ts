import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { saveSearchData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("Submit verification API called")

    const formData = await request.formData()
    console.log("Received form data keys:", Array.from(formData.keys()))

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

    // Extract countries array
    const countries: any[] = []
    let countryIndex = 0
    while (formData.has(`countries[${countryIndex}]`)) {
      try {
        const countryData = JSON.parse(formData.get(`countries[${countryIndex}]`) as string)
        countries.push(countryData)
      } catch (e) {
        console.error(`Error parsing country ${countryIndex}:`, e)
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

    // Get files
    const files = formData.getAll("files") as File[]
    const validFiles = files.filter((file) => file.size > 0)

    console.log("Parsed verification data:", {
      ...data,
      countries: countries.length,
      selectedClasses: selectedClasses.length,
      files: validFiles.length,
    })

    // Validate required fields
    if (!data.email || !data.name || !data.surname) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for database
    const searchData = {
      id: crypto.randomUUID(),
      trademark_name: data.trademarkName || "",
      trademark_type: data.trademarkType || "",
      goods_and_services: data.goodsAndServices || "",
      countries: countries,
      classes: selectedClasses,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone || "",
      marketing_consent: data.marketing,
      form_type: data.formType || "verification",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Try to save to database (non-blocking)
    try {
      const savedData = await saveSearchData(searchData)
      console.log("Verification data saved to database:", savedData?.id)
    } catch (dbError) {
      console.error("Database save failed, continuing with email:", dbError)
    }

    // Prepare email content
    const emailContent = `
      <h2>New Trademark Verification Form Submission</h2>
      <p><strong>Name:</strong> ${data.name} ${data.surname}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Trademark Type:</strong> ${data.trademarkType || "Not specified"}</p>
      <p><strong>Trademark Name:</strong> ${data.trademarkName || "Not provided"}</p>
      <p><strong>Goods and Services:</strong> ${data.goodsAndServices || "Not provided"}</p>
      <p><strong>Countries:</strong> ${countries.map((c) => c.name).join(", ") || "None selected"}</p>
      <p><strong>Classes:</strong> ${selectedClasses.join(", ") || "None selected"}</p>
      <p><strong>Marketing Consent:</strong> ${data.marketing ? "Yes" : "No"}</p>
      <p><strong>Files Attached:</strong> ${validFiles.length}</p>
      <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
    `

    // Send notification emails
    const emailPromises = []

    // Send to both notification emails
    const notificationEmails = ["lacortgaston@gmail.com", "gflacort@gmail.com"]

    for (const email of notificationEmails) {
      emailPromises.push(
        resend.emails.send({
          from: "noreply@trademarkia.com",
          to: email,
          subject: `New Trademark Verification - ${data.name} ${data.surname}`,
          html: emailContent,
        }),
      )
    }

    // Send confirmation email to user
    emailPromises.push(
      resend.emails.send({
        from: "noreply@trademarkia.com",
        to: data.email,
        subject: "Thank you for your trademark verification request",
        html: `
          <h2>Thank you for your trademark verification request</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your trademark verification request and will review it shortly.</p>
          <p>Our team will contact you within 24-48 hours with the results of your trademark analysis.</p>
          <p><strong>Your submission details:</strong></p>
          <ul>
            <li>Trademark Type: ${data.trademarkType || "Not specified"}</li>
            <li>Trademark Name: ${data.trademarkName || "Not provided"}</li>
            <li>Countries: ${countries.map((c) => c.name).join(", ") || "None selected"}</li>
            <li>Classes: ${selectedClasses.join(", ") || "None selected"}</li>
          </ul>
          <p>Best regards,<br>The Trademarkia Team</p>
        `,
      }),
    )

    // Send all emails
    const emailResults = await Promise.allSettled(emailPromises)

    // Log email results
    emailResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Email ${index + 1} sent successfully:`, result.value.id)
      } else {
        console.error(`Email ${index + 1} failed:`, result.reason)
      }
    })

    // Check if at least one email was sent successfully
    const successfulEmails = emailResults.filter((result) => result.status === "fulfilled")

    if (successfulEmails.length === 0) {
      console.error("All emails failed to send")
      return NextResponse.json({ success: false, message: "Failed to send notification emails" }, { status: 500 })
    }

    console.log(`Successfully sent ${successfulEmails.length} out of ${emailResults.length} emails`)

    return NextResponse.json({
      success: true,
      message: "Verification form submitted successfully",
      searchId: searchData.id,
    })
  } catch (error) {
    console.error("Error in submit-verification API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
