import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { saveSearchData } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("Submit form API called")

    const body = await request.json()
    console.log("Received form data:", body)

    // Validate required fields
    if (!body.email || !body.name || !body.surname) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for database
    const searchData = {
      id: crypto.randomUUID(),
      trademark_name: body.trademarkName || "",
      goods_and_services: body.goodsAndServices || "",
      countries: Array.isArray(body.countries) ? body.countries : [],
      classes: Array.isArray(body.classes) ? body.classes : [],
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone: body.phone || "",
      company: body.company || "",
      additional_info: body.additionalInfo || "",
      form_type: body.formType || "verification",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Try to save to database (non-blocking)
    try {
      const savedData = await saveSearchData(searchData)
      console.log("Data saved to database:", savedData?.id)
    } catch (dbError) {
      console.error("Database save failed, continuing with email:", dbError)
    }

    // Prepare email content
    const emailContent = `
      <h2>New Trademark Verification Form Submission</h2>
      <p><strong>Name:</strong> ${body.name} ${body.surname}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${body.company || "Not provided"}</p>
      <p><strong>Trademark Name:</strong> ${body.trademarkName || "Not provided"}</p>
      <p><strong>Goods and Services:</strong> ${body.goodsAndServices || "Not provided"}</p>
      <p><strong>Countries:</strong> ${Array.isArray(body.countries) ? body.countries.join(", ") : "None selected"}</p>
      <p><strong>Classes:</strong> ${Array.isArray(body.classes) ? body.classes.join(", ") : "None selected"}</p>
      <p><strong>Additional Info:</strong> ${body.additionalInfo || "None provided"}</p>
      <p><strong>Form Type:</strong> ${body.formType || "verification"}</p>
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
          subject: `New Trademark Verification Form - ${body.name} ${body.surname}`,
          html: emailContent,
        }),
      )
    }

    // Send confirmation email to user
    emailPromises.push(
      resend.emails.send({
        from: "noreply@trademarkia.com",
        to: body.email,
        subject: "Thank you for your trademark verification request",
        html: `
          <h2>Thank you for your trademark verification request</h2>
          <p>Dear ${body.name},</p>
          <p>We have received your trademark verification request and will review it shortly.</p>
          <p>Our team will contact you within 24-48 hours with the results of your trademark analysis.</p>
          <p><strong>Your submission details:</strong></p>
          <ul>
            <li>Trademark Name: ${body.trademarkName || "Not provided"}</li>
            <li>Countries: ${Array.isArray(body.countries) ? body.countries.join(", ") : "None selected"}</li>
            <li>Classes: ${Array.isArray(body.classes) ? body.classes.join(", ") : "None selected"}</li>
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
      return NextResponse.json({ success: false, error: "Failed to send notification emails" }, { status: 500 })
    }

    console.log(`Successfully sent ${successfulEmails.length} out of ${emailResults.length} emails`)

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      searchId: searchData.id,
    })
  } catch (error) {
    console.error("Error in submit-form API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
