import { NextResponse } from "next/server"

export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      return NextResponse.json(
        {
          error: "Resend API key not found",
          hasApiKey: false,
        },
        { status: 500 },
      )
    }

    // Get emails from Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          error: "Failed to fetch emails from Resend",
          status: response.status,
          statusText: response.statusText,
          details: errorText,
          hasApiKey: true,
        },
        { status: response.status },
      )
    }

    const emailsData = await response.json()

    // Filter for free search emails (emails that contain trademark search info)
    const freeSearchEmails =
      emailsData.data?.filter(
        (email: any) =>
          email.subject?.includes("Trademark Search") ||
          email.subject?.includes("Free Search") ||
          email.to?.some((recipient: any) => recipient.email),
      ) || []

    return NextResponse.json({
      success: true,
      totalEmails: emailsData.data?.length || 0,
      freeSearchEmails: freeSearchEmails.length,
      emails: freeSearchEmails.map((email: any) => ({
        id: email.id,
        to: email.to,
        subject: email.subject,
        created_at: email.created_at,
        status: email.last_event,
      })),
      rawData: emailsData,
    })
  } catch (error) {
    console.error("Error fetching Resend emails:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        hasApiKey: !!process.env.RESEND_API_KEY,
      },
      { status: 500 },
    )
  }
}
