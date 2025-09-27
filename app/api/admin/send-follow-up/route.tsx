import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { recipients } = await request.json()

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "No recipients provided" }, { status: 400 })
    }

    const results = []
    const errors = []

    // Process emails with 1 second delay between each to respect rate limits
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i]

      try {
        // Add delay before each email (except the first one)
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        const result = await sendEmailWithRetry(recipient)
        results.push(result)
      } catch (error) {
        console.error(`Error sending email to ${recipient.email}:`, error)
        errors.push({
          email: recipient.email,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    return NextResponse.json({
      success: true,
      sent: results.length,
      errors: errors.length,
      results,
      errors,
    })
  } catch (error) {
    console.error("Follow-up email error:", error)
    return NextResponse.json({ error: "Failed to send follow-up emails" }, { status: 500 })
  }
}

async function sendEmailWithRetry(recipient: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await resend.emails.send({
        from: "JustProtected <noreply@justprotected.com>",
        to: [recipient.email],
        subject: "Complete Your Trademark Filing - Time Sensitive",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <p>Hi there,</p>
            
            <p>You started a trademark search with us but didn't complete the filing. Brand names move fast—waiting increases the chance someone else files first.</p>
            
            <p><strong>Check pricing:</strong> <a href="https://justprotected.com/detailed-pricelist" style="color: #0066cc;">https://justprotected.com/detailed-pricelist</a></p>
            
            <p>To proceed, email <a href="mailto:trademarks@justprotected.com" style="color: #0066cc;">trademarks@justprotected.com</a> and we'll send your filing summary and next steps today.</p>
            
            <p>— JustProtected</p>
          </div>
        `,
      })

      return {
        email: recipient.email,
        trademark: recipient.trademark_name,
        messageId: result.data?.id,
        status: "sent",
      }
    } catch (error: any) {
      if (error.message?.includes("Too many requests") && attempt < maxRetries) {
        // Wait progressively longer for each retry
        const delay = attempt * 2000 // 2s, 4s, 6s
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }

      throw error
    }
  }
}
