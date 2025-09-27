import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET(req: Request) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.RESEND_API_KEY

    // Check if the API key is available
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY is not defined in environment variables",
      })
    }

    // Initialize Resend with the API key
    const resend = new Resend(apiKey)

    // Try to send a test email
    try {
      const { data, error } = await resend.emails.send({
        from: "Trademark Search <no-reply@yourdomain.com>",
        to: ["test@example.com"], // Replace with a test email
        subject: "Test Email from Trademark Search",
        html: "<p>This is a test email to verify that Resend is working correctly.</p>",
      })

      if (error) {
        return NextResponse.json({
          success: false,
          error: error,
        })
      }

      return NextResponse.json({
        success: true,
        data: data,
        message: "Test email sent successfully",
      })
    } catch (resendError) {
      return NextResponse.json({
        success: false,
        error: resendError instanceof Error ? resendError.message : "Unknown error",
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
