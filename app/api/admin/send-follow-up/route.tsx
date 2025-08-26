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

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i]

      try {
        // Wait 1 second between emails to respect rate limits
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        let attempt = 0
        const maxAttempts = 3
        let success = false

        while (attempt < maxAttempts && !success) {
          try {
            const { data, error } = await resend.emails.send({
              from: "JustProtected <noreply@justprotected.com>",
              to: [recipient.email],
              subject: "Complete Your Trademark Filing - Time Sensitive",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <p>Hi there,</p>
                  
                  <p>You started a trademark search with us but didn't complete the filing. Brand names move fast—waiting increases the chance someone else files first.</p>
                  
                  <p>Check pricing: <a href="https://justprotected.com/detailed-pricelist" style="color: #1a4bff;">https://justprotected.com/detailed-pricelist</a></p>
                  
                  <p>To proceed, email <a href="mailto:trademarks@justprotected.com" style="color: #1a4bff;">trademarks@justprotected.com</a> and we'll send your filing summary and next steps today.</p>
                  
                  <p>— JustProtected</p>
                </div>
              `,
            })

            if (error) {
              throw error
            }

            success = true
            results.push({
              email: recipient.email,
              trademark: recipient.trademark_name,
              status: "success",
              messageId: data?.id,
            })
          } catch (error: any) {
            attempt++

            if (error.message?.includes("rate limit") || error.message?.includes("Too many requests")) {
              // Wait progressively longer for rate limit errors
              const waitTime = attempt * 2000 // 2s, 4s, 6s
              console.log(`Rate limited, waiting ${waitTime}ms before retry ${attempt}/${maxAttempts}`)
              await new Promise((resolve) => setTimeout(resolve, waitTime))
            } else {
              // For other errors, don't retry
              break
            }
          }
        }

        if (!success) {
          results.push({
            email: recipient.email,
            trademark: recipient.trademark_name,
            status: "failed",
            error: "Failed after multiple attempts",
          })
        }
      } catch (error: any) {
        console.error(`Error sending email to ${recipient.email}:`, error)
        results.push({
          email: recipient.email,
          trademark: recipient.trademark_name,
          status: "failed",
          error: error.message,
        })
      }
    }

    const successCount = results.filter((r) => r.status === "success").length
    const failedCount = results.filter((r) => r.status === "failed").length

    return NextResponse.json({
      success: true,
      message: `Sent ${successCount} emails successfully, ${failedCount} failed`,
      results,
    })
  } catch (error: any) {
    console.error("Error in send-follow-up:", error)
    return NextResponse.json({ error: "Failed to send follow-up emails", details: error.message }, { status: 500 })
  }
}
