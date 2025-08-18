import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { users, subject } = body

    if (!users || !Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: "No users provided" }, { status: 400 })
    }

    if (!subject) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 })
    }

    console.log(`Sending follow-up emails to ${users.length} users`)

    let successCount = 0
    let failureCount = 0
    const results = []

    // Send emails one by one to handle individual failures
    for (const user of users) {
      if (!user.email) {
        console.log(`Skipping user ${user.id} - no email address`)
        failureCount++
        continue
      }

      let retryCount = 0
      const maxRetries = 3

      while (retryCount <= maxRetries) {
        try {
          // Create personalized HTML email
          const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            background-color: #ffffff; 
            line-height: 1.6;
            color: #333333;
        }
        .email-container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 40px 20px;
        }
        .content { 
            font-size: 16px;
            line-height: 1.7;
        }
        .trademark-name { 
            background: #f8f9fa;
            padding: 12px; 
            border-radius: 6px; 
            font-weight: 600; 
            margin: 15px 0; 
            font-size: 18px;
            color: #2c3e50;
            border-left: 4px solid #3498db;
        }
        .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
        }
        .contact-info {
            background: #f0f8ff;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            font-size: 15px;
            border-left: 4px solid #2196f3;
        }
        @media only screen and (max-width: 600px) {
            .email-container { 
                padding: 20px 15px !important; 
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="content">
            ${user.name ? `<p>Hi ${user.name},</p>` : "<p>Hi there,</p>"}
            
            ${user.trademarkName ? `<div class="trademark-name">Regarding: "${user.trademarkName}"</div>` : ""}
            
            <div style="white-space: pre-line;">
                Hi there,

                You started a trademark search with us but didn't complete the filing. Brand names move fast—waiting increases the chance someone else files first.

                Check pricing: https://justprotected.com/detailed-pricelist

                To proceed, email trademarks@justprotected.com and we'll send your filing summary and next steps today.

                — JustProtected
            </div>
            
            <div class="contact-info">
                <strong>Ready to proceed?</strong><br>
                Please email us at: <strong>trademarks@justprotected.com</strong><br>
                We'll get back to you within 24 hours with next steps.
            </div>
            
            <div class="signature">
                <p>Best regards,<br>
                <strong>Sarah Mitchell</strong><br>
                Trademark Specialist<br>
                Just Protected</p>
                
                <p style="font-size: 12px; color: #888; margin-top: 15px;">
                This email was sent to ${user.email} regarding your trademark inquiry.<br>
                If you no longer wish to receive these emails, please reply with "UNSUBSCRIBE".
                </p>
            </div>
        </div>
    </div>
</body>
</html>`

          // Create plain text version
          const plainTextContent = `
${user.name ? `Hi ${user.name},` : "Hi there,"}

${user.trademarkName ? `Regarding: "${user.trademarkName}"` : ""}

Hi there,

You started a trademark search with us but didn't complete the filing. Brand names move fast—waiting increases the chance someone else files first.

Check pricing: https://justprotected.com/detailed-pricelist

To proceed, email trademarks@justprotected.com and we'll send your filing summary and next steps today.

— JustProtected

---
This email was sent to ${user.email} regarding your trademark inquiry.
If you no longer wish to receive these emails, please reply with "UNSUBSCRIBE".
`

          const { data, error } = await resend.emails.send({
            from: "Just Protected <hello@justprotected.com>",
            to: [user.email],
            subject: subject,
            html: htmlContent,
            text: plainTextContent,
            reply_to: "support@justprotected.com",
            headers: {
              "List-Unsubscribe": `<mailto:trademarks@justprotected.com?subject=Unsubscribe>`,
              "X-Entity-Ref-ID": `follow-up-${user.id}`,
            },
            tags: [
              {
                name: "category",
                value: "follow-up-campaign",
              },
              {
                name: "user_id",
                value: user.id.toString(),
              },
            ],
          })

          if (error) {
            if (error.message.includes("Too many requests") && retryCount < maxRetries) {
              retryCount++
              console.log(`Rate limit hit for ${user.email}, retrying in ${retryCount * 2} seconds...`)
              await new Promise((resolve) => setTimeout(resolve, retryCount * 2000))
              continue
            }

            console.error(`Error sending email to ${user.email}:`, error)
            failureCount++
            results.push({ email: user.email, success: false, error: error.message })
            break
          } else {
            console.log(`Successfully sent email to ${user.email}`)
            successCount++
            results.push({ email: user.email, success: true, emailId: data?.id })
            break
          }
        } catch (emailError) {
          if (
            emailError instanceof Error &&
            emailError.message.includes("Too many requests") &&
            retryCount < maxRetries
          ) {
            retryCount++
            console.log(`Rate limit hit for ${user.email}, retrying in ${retryCount * 2} seconds...`)
            await new Promise((resolve) => setTimeout(resolve, retryCount * 2000))
            continue
          }

          console.error(`Exception sending email to ${user.email}:`, emailError)
          failureCount++
          results.push({
            email: user.email,
            success: false,
            error: emailError instanceof Error ? emailError.message : String(emailError),
          })
          break
        }
      }

      // Small delay to avoid rate limiting - increased to 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log(`Follow-up campaign completed: ${successCount} successful, ${failureCount} failed`)

    return NextResponse.json({
      success: true,
      message: `Follow-up emails sent successfully`,
      successCount,
      failureCount,
      totalUsers: users.length,
      results,
    })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        error: "Error processing follow-up email request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
