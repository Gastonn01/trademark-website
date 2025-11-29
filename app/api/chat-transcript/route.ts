import { Resend } from "resend"

let resend: Resend | null = null
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

export async function POST(request: Request) {
  try {
    const { conversationHistory, userEmail, timestamp } = await request.json()

    if (!conversationHistory) {
      return Response.json({ error: "Conversation history required" }, { status: 400 })
    }

    if (!resend) {
      return Response.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Send chat transcript to team
    await resend.emails.send({
      from: "JustProtected Chatbot <noreply@justprotected.com>",
      to: ["trademarks@justprotected.com"],
      subject: `Chat Transcript - ${new Date(timestamp).toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #1e40af;">💬 Chatbot Conversation Transcript</h2>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
            ${userEmail ? `<p style="margin: 5px 0;"><strong>User Email:</strong> ${userEmail}</p>` : ""}
          </div>

          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Conversation</h3>
            <div style="white-space: pre-wrap; line-height: 1.8; font-size: 14px; color: #1f2937;">
              ${conversationHistory.replace(/\*\*/g, "<strong>").replace(/\n/g, "<br>")}
            </div>
          </div>

          <p style="color: #6b7280; font-size: 12px; font-style: italic;">
            This transcript is sent automatically for every chat interaction.
          </p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error: any) {
    console.error("Chat transcript error:", error)
    return Response.json({ error: "Failed to send transcript" }, { status: 500 })
  }
}
