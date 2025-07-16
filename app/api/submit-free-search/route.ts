import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    console.log("=== FREE SEARCH FORM SUBMISSION START ===")
    console.log("Timestamp:", new Date().toISOString())

    const body = await req.json()
    console.log("✅ Received free search data:", JSON.stringify(body, null, 2))

    const { trademarkName, email, firstName, lastName, phone, goodsAndServices, countries } = body

    // Validate required fields
    if (!trademarkName || !email) {
      console.error("❌ Validation failed - missing required fields:", {
        trademarkName: !!trademarkName,
        email: !!email,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("✅ All required fields present")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("🔑 Environment variables check:")
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "❌ MISSING")
    console.log(
      "SUPABASE_SERVICE_ROLE_KEY:",
      process.env.SUPABASE_SERVICE_ROLE_KEY
        ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`
        : "❌ MISSING",
    )
    console.log(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
        : "❌ MISSING",
    )
    console.log("Using key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "❌ NO KEY AVAILABLE")

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase environment variables")
      return NextResponse.json({ error: "Database configuration error" }, { status: 500 })
    }

    // Create Supabase client
    console.log("🔌 Creating Supabase client...")
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
    console.log("✅ Supabase client created")

    // Prepare data for database
    const searchData = {
      email,
      trademark_name: trademarkName,
      status: "pending",
      form_type: "free_search",
      search_results: {
        firstName,
        lastName,
        email,
        phone,
        trademarkName,
        goodsAndServices,
        countries,
        submittedAt: new Date().toISOString(),
        formType: "free_search",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("📝 Prepared search data for Supabase insert:")
    console.log(JSON.stringify(searchData, null, 2))

    // CRITICAL: Save to Supabase with detailed logging
    console.log("💾 ATTEMPTING SUPABASE INSERT...")
    console.log("Table: trademark_searches")
    console.log("Data keys:", Object.keys(searchData))

    try {
      const { data, error } = await supabase.from("trademark_searches").insert([searchData]).select()

      console.log("📊 Supabase insert response:")
      console.log("Data:", data)
      console.log("Error:", error)

      if (error) {
        console.error("❌ SUPABASE INSERT FAILED:")
        console.error("Error code:", error.code)
        console.error("Error message:", error.message)
        console.error("Error details:", error.details)
        console.error("Error hint:", error.hint)
        console.error("Full error object:", JSON.stringify(error, null, 2))

        // Don't fail the request if database save fails, but log it prominently
        console.log("⚠️ CONTINUING WITH EMAIL SEND DESPITE DATABASE ERROR")
      } else {
        console.log("✅ SUPABASE INSERT SUCCESSFUL!")
        console.log("Inserted record ID:", data?.[0]?.id)
        console.log("Inserted data:", JSON.stringify(data, null, 2))
      }
    } catch (insertException) {
      console.error("💥 EXCEPTION DURING SUPABASE INSERT:")
      console.error("Exception type:", typeof insertException)
      console.error(
        "Exception message:",
        insertException instanceof Error ? insertException.message : String(insertException),
      )
      console.error("Exception stack:", insertException instanceof Error ? insertException.stack : "No stack trace")
      console.log("⚠️ CONTINUING WITH EMAIL SEND DESPITE EXCEPTION")
    }

    // Send confirmation emails
    try {
      console.log("📧 Sending free search emails...")

      // Send to admin emails
      const adminEmailPromises = ["lacortgaston@gmail.com", "gflacort@gmail.com"].map((recipient) =>
        resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: [recipient],
          subject: `New Free Trademark Search - ${trademarkName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">New Free Trademark Search Request</h2>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Client Information:</h3>
                <ul style="color: #6B7280;">
                  <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
                </ul>
              </div>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Search Details:</h3>
                <ul style="color: #6B7280;">
                  <li><strong>Trademark Name:</strong> ${trademarkName}</li>
                  <li><strong>Goods and Services:</strong> ${goodsAndServices || "Not specified"}</li>
                  <li><strong>Countries:</strong> ${countries ? countries.join(", ") : "Not specified"}</li>
                </ul>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                <p style="color: #9CA3AF; font-size: 14px;">
                  Submitted: ${new Date().toLocaleString()}<br>
                  Form Type: Free Search<br>
                  <a href="https://justprotected.com/admin" style="color: #4F46E5;">View in Admin Panel</a>
                </p>
              </div>
            </div>
          `,
        }),
      )

      const adminResults = await Promise.allSettled(adminEmailPromises)

      adminResults.forEach((result, index) => {
        const recipients = ["lacortgaston@gmail.com", "gflacort@gmail.com"]
        if (result.status === "fulfilled") {
          console.log(`✅ Admin email sent successfully to ${recipients[index]}:`, result.value)
        } else {
          console.error(`❌ Admin email failed to ${recipients[index]}:`, result.reason)
        }
      })

      // Send confirmation to client
      await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [email],
        subject: "Free Trademark Search Request Received",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Thank you for your free trademark search request!</h2>
            
            <p>Dear ${firstName} ${lastName},</p>
            
            <p>We have received your request for a free trademark search for "<strong>${trademarkName}</strong>".</p>
            
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">What happens next?</h3>
              <ol style="color: #6B7280;">
                <li>Our team will conduct a preliminary search within 24-48 hours</li>
                <li>We'll send you the results via email</li>
                <li>If you'd like to proceed with registration, we'll provide next steps</li>
              </ol>
            </div>
            
            <p style="color: #6B7280;">If you have any questions, please don't hesitate to contact us.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              <p style="color: #9CA3AF; font-size: 14px;">
                Best regards,<br>
                The Just Protected Team<br>
                <a href="https://justprotected.com" style="color: #4F46E5;">justprotected.com</a>
              </p>
            </div>
          </div>
        `,
      })

      console.log("✅ Client confirmation email sent")
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Free search request submitted successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Critical error in free search submission:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
