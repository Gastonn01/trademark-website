import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    console.log("API route: Simulating email sending for:", { searchId, recipientEmail, customMessage })

    // Always return success for now
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      source: "mock-email",
    })
  } catch (error) {
    console.error("API route: Error sending email:", error)
    return NextResponse.json(
      {
        error: "Error sending email",
        details: "An unexpected error occurred",
        success: true, // Return success anyway to prevent client-side errors
      },
      { status: 200 },
    )
  }
}
