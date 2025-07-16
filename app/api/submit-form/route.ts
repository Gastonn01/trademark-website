import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    console.log("=== VERIFICATION FORM SUBMISSION START ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Request URL:", req.url)
    console.log("Request method:", req.method)

    // Handle both JSON and FormData
    let formData: any = {}
    const contentType = req.headers.get("content-type")
    console.log("Content-Type:", contentType)

    if (contentType?.includes("application/json")) {
      formData = await req.json()
      console.log("✅ Received JSON data:", JSON.stringify(formData, null, 2))
    } else if (contentType?.includes("multipart/form-data")) {
      const formDataObj = await req.formData()
      console.log("✅ Received FormData")

      // Convert FormData to regular object
      for (const [key, value] of formDataObj.entries()) {
        if (key === "files") continue // Skip files for now
        if (key.includes("[") && key.includes("]")) {
          // Handle array fields like countries[0], selectedClasses[0]
          const baseKey = key.split("[")[0]
          if (!formData[baseKey]) formData[baseKey] = []
          try {
            formData[baseKey].push(JSON.parse(value as string))
          } catch {
            formData[baseKey].push(value)
          }
        } else {
          formData[key] = value
        }
      }
      console.log("Converted FormData to object:", JSON.stringify(formData, null, 2))
    } else {
      console.error("❌ Unsupported content type:", contentType)
      throw new Error(`Unsupported content type: ${contentType}`)
    }

    // Extract data with fallbacks for different form structures
    const trademarkName = formData.trademarkName || formData.trademark_name || "Unknown Trademark"
    const email = formData.email || ""
    const firstName = formData.name || formData.firstName || ""
    const lastName = formData.surname || formData.lastName || ""
    const phone = formData.phone || ""
    const goodsAndServices = formData.goodsAndServices || formData.goods_and_services || ""
    const countries = formData.countries || []
    const selectedClasses = formData.selectedClasses || [1]
    const trademarkType = formData.trademarkType || "word"

    console.log("✅ Extracted form data:", {
      trademarkName,
      email,
      firstName,
      lastName,
      phone,
      goodsAndServices,
      countries: countries.length,
      selectedClasses: selectedClasses.length,
      trademarkType,
    })

    // Validate required fields
    if (!email || !trademarkName) {
      console.error("❌ Validation failed - missing required fields:", {
        email: !!email,
        trademarkName: !!trademarkName,
      })
      return NextResponse.json({ error: "Missing required fields: email and trademark name" }, { status: 400 })
    }

    console.log("✅ Basic validation passed")

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
    const verificationData = {
      email,
      trademark_name: trademarkName,
      status: "pending",
      search_results: {
        firstName,
        lastName,
        email,
        phone,
        trademarkName,
        goodsAndServices,
        countries,
        selectedClasses,
        trademarkType,
        submittedAt: new Date().toISOString(),
        formType: "verification",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("📝 Prepared verification data for Supabase insert:")
    console.log("Data structure:", Object.keys(verificationData))
    console.log("Full data:", JSON.stringify(verificationData, null, 2))

    // CRITICAL: Save to Supabase with detailed logging
    console.log("💾 ATTEMPTING SUPABASE INSERT...")
    console.log("Target table: trademark_searches")
    console.log("Insert data keys:", Object.keys(verificationData))
    console.log("Insert data size:", JSON.stringify(verificationData).length, "characters")

    try {
      console.log("🚀 Calling supabase.from('trademark_searches').insert()...")

      const { data, error } = await supabase.from("trademark_searches").insert([verificationData]).select()

      console.log("📊 Supabase insert response received:")
      console.log("Response data:", data)
      console.log("Response error:", error)

      if (error) {
        console.error("❌ SUPABASE INSERT FAILED:")
        console.error("Error code:", error.code)
        console.error("Error message:", error.message)
        console.error("Error details:", error.details)
        console.error("Error hint:", error.hint)
        console.error("Full error object:", JSON.stringify(error, null, 2))

        // Check for common error patterns
        if (error.message?.includes("permission denied")) {
          console.error("🔒 RLS POLICY ISSUE: Check your Row Level Security policies")
        }
        if (error.message?.includes("column") && error.message?.includes("does not exist")) {
          console.error("📋 SCHEMA ISSUE: Table schema doesn't match expected columns")
        }
        if (error.message?.includes("invalid input syntax")) {
          console.error("🔤 DATA TYPE ISSUE: Data type mismatch in insert")
        }

        // Don't fail the request if database save fails, but log it prominently
        console.log("⚠️ CONTINUING WITH EMAIL SEND DESPITE DATABASE ERROR")
      } else {
        console.log("✅ SUPABASE INSERT SUCCESSFUL!")
        console.log("Inserted record count:", data?.length || 0)
        if (data && data.length > 0) {
          console.log("Inserted record ID:", data[0]?.id)
          console.log("Inserted record data:", JSON.stringify(data[0], null, 2))
        }
      }
    } catch (insertException) {
      console.error("💥 EXCEPTION DURING SUPABASE INSERT:")
      console.error("Exception type:", typeof insertException)
      console.error("Exception name:", insertException instanceof Error ? insertException.name : "Unknown")
      console.error(
        "Exception message:",
        insertException instanceof Error ? insertException.message : String(insertException),
      )
      console.error("Exception stack:", insertException instanceof Error ? insertException.stack : "No stack trace")

      // Check if it's a network/connection issue
      if (insertException instanceof Error && insertException.message.includes("fetch")) {
        console.error("🌐 NETWORK ISSUE: Problem connecting to Supabase")
      }

      console.log("⚠️ CONTINUING WITH EMAIL SEND DESPITE EXCEPTION")
    }

    // Send confirmation emails to both addresses
    const recipients = ["lacortgaston@gmail.com", "gflacort@gmail.com"]

    try {
      console.log("📧 Sending verification form emails to:", recipients)

      const emailPromises = recipients.map((recipient) =>
        resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: [recipient],
          subject: `New Trademark Verification Form Submission - ${trademarkName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">New Trademark Verification Form Submission</h2>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Client Information:</h3>
                <ul style="color: #6B7280;">
                  <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
                </ul>
              </div>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Trademark Details:</h3>
                <ul style="color: #6B7280;">
                  <li><strong>Trademark Name:</strong> ${trademarkName}</li>
                  <li><strong>Goods and Services:</strong> ${goodsAndServices}</li>
                  <li><strong>Trademark Type:</strong> ${trademarkType}</li>
                  <li><strong>Countries:</strong> ${countries.map((c: any) => c.name || c).join(", ")}</li>
                  <li><strong>Classes:</strong> ${selectedClasses.join(", ")}</li>
                </ul>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                <p style="color: #9CA3AF; font-size: 14px;">
                  Submitted: ${new Date().toLocaleString()}<br>
                  Form Type: Trademark Verification<br>
                  <a href="https://justprotected.com/admin" style="color: #4F46E5;">View in Admin Panel</a>
                </p>
              </div>
            </div>
          `,
        }),
      )

      const emailResults = await Promise.allSettled(emailPromises)

      emailResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`✅ Email sent successfully to ${recipients[index]}:`, result.value)
        } else {
          console.error(`❌ Email failed to ${recipients[index]}:`, result.reason)
        }
      })

      // Also send confirmation to the client if email is provided
      if (email) {
        await resend.emails.send({
          from: "Just Protected <noreply@justprotected.com>",
          to: [email],
          subject: "Trademark Application Received - Next Steps",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">Thank you for your trademark application!</h2>
              
              <p>Dear ${firstName} ${lastName},</p>
              
              <p>We have received your trademark application for "<strong>${trademarkName}</strong>" and our team will begin processing it immediately.</p>
              
              <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">What happens next?</h3>
                <ol style="color: #6B7280;">
                  <li>Our team will review your application within 24-48 hours</li>
                  <li>We'll prepare and file your trademark application</li>
                  <li>You'll receive confirmation once filing is complete</li>
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
      }
    } catch (emailException) {
      console.error("💥 Email sending exception:", emailException)
    }

    console.log("=== VERIFICATION FORM SUBMISSION END ===")

    return NextResponse.json({
      success: true,
      message: "Verification form submitted successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("💥 CRITICAL ERROR IN VERIFICATION FORM SUBMISSION:")
    console.error("Error type:", typeof error)
    console.error("Error name:", error instanceof Error ? error.name : "Unknown")
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    // Log the full error object for debugging
    if (error instanceof Error) {
      console.error("Full error object:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      })
    }

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
