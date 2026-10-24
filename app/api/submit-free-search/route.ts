import { NextResponse } from "next/server"
import { Resend } from "resend"
import { v4 as uuidv4 } from "uuid"
import { saveSearchData, ensureTrademarkSearchesTableExists } from "@/lib/supabase"
import { runIdentityCheck } from "@/lib/identity-check"
import { renderCloneScanReportHtml } from "@/lib/clone-scan-report"
import { classesForCategory } from "@/lib/nice-classes"
import { checkContentSimilarity } from "@/lib/content-similarity"
import { isHoneypotTripped, looksLikeGibberish, withinSubmissionRateLimit } from "@/lib/spam-guard"

export const runtime = "nodejs"
export const maxDuration = 45 // EUIPO/USPTO/Gemini/Apify/YouTube-transcript checks can take several seconds combined

// Initialize Resend with error handling
let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  } else {
    console.log("Resend API key not found, email functionality will be disabled")
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

export async function POST(req: Request) {
  // Always return a success response to the client
  // This ensures the user experience is not disrupted
  const successResponse = (searchId: string) => {
    return NextResponse.json({
      message: "Form submitted successfully",
      searchId,
    })
  }

  try {
    const formData = await req.formData()
    const searchId = (formData.get("searchId") as string) || uuidv4()
    const formType = formData.get("formType") || "free-search"

    // Bot check #1: honeypot field ("hp") is invisible to real users —
    // anything filling it in is automated. Pretend success so the bot
    // doesn't learn to avoid it.
    if (isHoneypotTripped(formData.get("hp"))) {
      console.log("[spam-guard] honeypot tripped, dropping submission silently")
      return successResponse(uuidv4())
    }

    // Create a searchData object with all form values
    const searchData: { [key: string]: any } = {}

    for (const [key, value] of formData.entries()) {
      if (key !== "files" && key !== "formType" && key !== "searchId" && key !== "logo" && key !== "hp" && typeof value === "string") {
        searchData[key] = value
      }
    }

    // Bot check #2: junk brand/trademark names (random mixed-case letters,
    // no vowels, no spaces) — the pattern behind the 2026-07-31 abuse wave.
    const nameToCheck = searchData.brandName || searchData.trademarkName || ""
    if (looksLikeGibberish(nameToCheck)) {
      console.log("[spam-guard] gibberish name detected, dropping submission silently:", nameToCheck)
      return successResponse(uuidv4())
    }

    // Bot check #3: per-IP daily rate limit on Clone Scans specifically —
    // the expensive path (EUIPO/USPTO/Gemini/Apify all run per submission).
    if (formType === "clone-scan") {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || ""
      const withinLimit = await withinSubmissionRateLimit(ip, 5)
      if (!withinLimit) {
        console.log("[spam-guard] rate limit exceeded for IP, dropping submission silently:", ip)
        return successResponse(uuidv4())
      }
    }

    // Log key information
    console.log("Processing search submission:", {
      searchId,
      formType,
      email: searchData.email,
      trademarkName: searchData.trademarkName,
    })

    // Ensure the trademark_searches table exists
    await ensureTrademarkSearchesTableExists()

    try {
      console.log("Saving search data to Supabase...")
      // Save data to Supabase using the corrected format
      const saveResult = await saveSearchData(searchId, searchData, formType as string)
      console.log("Save result:", saveResult)
    } catch (error) {
      console.error("Error saving search data:", error)
      // Continue with the process even if saving fails
    }

    // Try to send emails if Resend is available
    if (resend) {
      try {
        console.log("[v0] Starting email send process...")
        console.log("[v0] Resend is initialized:", !!resend)
        console.log("[v0] User email:", searchData.email)

        // Customize subject with trademark name
        const trademarkName = searchData.trademarkName || "Unnamed Trademark"
        const customSubject =
          formType === "clone-scan"
            ? `🛡️ New Brand Clone Scan request: ${searchData.brandName || trademarkName}`
            : `New free search request received: ${trademarkName}`

        // Build a simple text email body
        let emailBody = `New free search request received: ${formType}\n\n`
        for (const [key, value] of Object.entries(searchData)) {
          emailBody += `${key}: ${value}\n`
        }

        // Send notification email
        console.log("[v0] Sending notification email to admins...")
        const notificationResult = await resend.emails
          .send({
            from: "Just Protected <noreply@justprotected.com>",
            to: ["gflacort@gmail.com"],
            subject: customSubject,
            text: emailBody,
          })
          .catch((e) => {
            console.error("[v0] Error sending notification email:", e)
            return null
          })

        if (notificationResult) {
          console.log("[v0] Notification email sent successfully:", notificationResult)
        } else {
          console.error("[v0] Notification email failed to send")
        }

        // Send confirmation email to user if email exists
        if (searchData.email && formType === "clone-scan") {
          const brandName = searchData.brandName || searchData.trademarkName || "your brand"
          const reportId = `JP-${new Date().getFullYear()}-${searchId.slice(0, 6).toUpperCase()}`
          const requestedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })

          let scanHtml: string
          try {
            console.log("[v0] Running real identity check for clone-scan:", brandName)
            const classes = classesForCategory(searchData.category)
            const [findings, contentSimilarity] = await Promise.all([
              runIdentityCheck(brandName, classes.length ? { classes } : undefined),
              checkContentSimilarity(searchData.youtubeChannel || ""),
            ])
            scanHtml = renderCloneScanReportHtml(findings, {
              reportId,
              requestedDate,
              contentSimilarity,
              youtubeChannelInput: searchData.youtubeChannel,
            })
          } catch (checkError) {
            // If the live checks fail entirely, fall back to a plain
            // acknowledgement rather than losing the email altogether.
            console.error("[v0] Identity check failed, sending fallback confirmation:", checkError)
            scanHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Just Protected</title></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f9fafb;color:#374151;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:20px auto;background-color:#ffffff;border-radius:8px;overflow:hidden;">
    <tr><td style="background-color:#0A1A36;padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Just Protected</h1>
    </td></tr>
    <tr><td style="padding:40px;">
      <h2 style="color:#0A1A36;margin-top:0;margin-bottom:20px;font-size:20px;">Your Brand Clone Scan is underway</h2>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:20px;">We received your request for <strong>${brandName}</strong>. Our automated checks hit a snag, so our team will complete this manually and follow up by email.</p>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:0;"><strong>The Just Protected Team</strong></p>
    </td></tr>
  </table>
</body>
</html>`
          }

          const isEs = searchData.lang === "es"
          const scanSubject = isEs
            ? `Tu Informe de Protección de Identidad — ${brandName}`
            : `Your Identity Protection Report — ${brandName}`

          const scanConfirmation = await resend.emails
            .send({
              from: "Just Protected <noreply@justprotected.com>",
              to: searchData.email,
              bcc: ["gflacort@gmail.com"],
              subject: scanSubject,
              html: scanHtml,
            })
            .catch((e) => {
              console.error("[v0] Error sending clone-scan confirmation email:", e)
              return null
            })
          console.log("[v0] Clone-scan confirmation result:", !!scanConfirmation)
        } else if (searchData.email) {
          console.log("[v0] Sending confirmation email to user...")
          const isReport = formType === "instant-report" || searchData.intent === "instant-report"
          const isDefend = searchData.intent === "defend"

          // The instant on-site checker already computed a real verdict
          // client-side (EUIPO/USPTO/AI) — this email used to just say
          // "our attorneys are reviewing it", discarding that result
          // entirely. Show the actual finding instead.
          const verdictTone = searchData.instantVerdict === "conflict" ? "#9a3324" : searchData.instantVerdict === "clear" ? "#3d6b47" : "#6b6558"
          const verdictBg = searchData.instantVerdict === "conflict" ? "#f7ece8" : searchData.instantVerdict === "clear" ? "#eef3ec" : "#efece4"
          const instantResultBlock =
            isReport && searchData.instantDetail
              ? `
        <div style="background-color:#FAF6EC;border-radius:8px;padding:22px 24px;margin-bottom:24px;">
          <span style="display:inline-block;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:5px 12px;border-radius:100px;background:${verdictBg};color:${verdictTone};margin-bottom:14px;">${searchData.instantVerdict === "conflict" ? "Potential conflict" : searchData.instantVerdict === "clear" ? "No obvious conflict" : "Worth a closer look"}</span>
          <p style="color:#0A1A36;margin:0 0 8px;font-weight:600;">${searchData.instantMessage || ""}</p>
          <p style="color:#4b5563;margin:0;line-height:1.6;font-size:14px;">${searchData.instantDetail}</p>
        </div>`
              : ""

          const confirmationResult = await resend.emails
            .send({
              from: "Just Protected <noreply@justprotected.com>",
              to: searchData.email,
              subject: isReport
                ? `Your trademark report for "${searchData.trademarkName || "your search"}"`
                : "We've received your trademark search request",
              html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Just Protected</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#F7F5F1;color:#374151;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:20px auto;background-color:#ffffff;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="background-color:#0A1A36;padding:36px 40px;text-align:center;">
        <p style="color:#DBA125;margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Just Protected</p>
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:400;font-family:Georgia,'Times New Roman',serif;">${
          isReport ? "Your trademark report" : isDefend ? "We're on it — let's take your name back" : "We've received your request"
        }</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <p style="color:#4b5563;line-height:1.7;margin-bottom:20px;">Dear ${searchData.firstName || searchData.name || "there"},</p>

        <p style="color:#4b5563;line-height:1.7;margin-bottom:20px;">${
          isReport
            ? `Here's the instant result for <strong style="color:#0A1A36;">"${searchData.trademarkName || "your name"}"</strong> from justprotected.com — this is a preliminary AI-assisted screen, not a full attorney search.`
            : isDefend
            ? `We received your request about <strong style="color:#0A1A36;">"${searchData.trademarkName || "your name"}"</strong>. If someone else is using or has registered a name that's rightfully yours, our attorneys will review your options — including opposition or cancellation.`
            : `Thank you for trusting <strong style="color:#0A1A36;">Just Protected</strong> with your trademark protection. We've received your request and our team is already reviewing it.`
        }</p>

        ${instantResultBlock}

        <div style="background-color:#FAF6EC;border-left:4px solid #DBA125;border-radius:0 8px 8px 0;padding:18px 22px;margin-bottom:24px;">
          <p style="color:#0A1A36;margin:0;font-weight:600;">${isReport ? "Want the full picture? Run a free Brand Clone Scan or a full attorney search." : "We'll follow up by email shortly with your results and next steps."}</p>
        </div>

        <p style="color:#4b5563;line-height:1.7;margin-bottom:20px;">Questions in the meantime? Just reply to this email.</p>

        <p style="color:#4b5563;line-height:1.7;margin-bottom:4px;">Best,</p>
        <p style="color:#0A1A36;line-height:1.7;margin:0;font-weight:600;">The Just Protected Team</p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#F7F5F1;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">© ${new Date().getFullYear()} Just Protected. This is a preliminary review, not legal advice.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
            })
            .catch((e) => {
              console.error("[v0] Error sending confirmation email:", e)
              return null
            })

          if (confirmationResult) {
            console.log("[v0] Confirmation email sent successfully:", confirmationResult)
          } else {
            console.error("[v0] Confirmation email failed to send")
          }
        } else {
          console.log("[v0] No user email provided, skipping confirmation email")
        }
      } catch (emailError) {
        console.error("[v0] Error in email sending process:", emailError)
        // Continue with process even if email fails
      }
    } else {
      console.log("[v0] Resend not initialized - emails will not be sent")
    }

    return successResponse(searchId)
  } catch (error) {
    // Log the error but still return a success response
    console.error("Error processing form submission:", error)
    return successResponse(uuidv4())
  }
}
