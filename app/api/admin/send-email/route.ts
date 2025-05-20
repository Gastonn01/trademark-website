import { NextResponse } from "next/server"
import { getSearchData, sendSearchResultsEmail } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)
    if (!searchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    // Send the email
    const result = await sendSearchResultsEmail(searchId, recipientEmail, customMessage)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error sending email", details: String(error) }, { status: 500 })
  }
}
