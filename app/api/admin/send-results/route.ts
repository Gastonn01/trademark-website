import { NextResponse } from "next/server"
import { getSearchData, updateSearchStatus } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId } = body

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search not found" }, { status: 404 })
    }

    // Extract email from search data
    const email = searchData.email || searchData.search_results?.email

    if (!email) {
      return NextResponse.json({ error: "No email found for this search" }, { status: 400 })
    }

    // In a real implementation, you would send an email here
    // For now, we'll just log it and simulate success
    console.log(`[MOCK EMAIL] Sending search results to ${email} for search ID ${searchId}`)
    console.log(`[MOCK EMAIL] Search data:`, JSON.stringify(searchData, null, 2))

    // Update the search status to completed
    await updateSearchStatus(searchId, "completed")

    return NextResponse.json({
      success: true,
      message: `Results sent to ${email}`,
    })
  } catch (error) {
    console.error("Error sending search results:", error)
    return NextResponse.json({ error: "Error sending search results", details: String(error) }, { status: 500 })
  }
}
