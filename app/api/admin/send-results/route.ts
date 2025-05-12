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

    // In a real implementation, you would send an email here
    // For now, we'll just log the action and return success
    console.log(`Would send results for search ${searchId} to ${searchData.search_results?.email || "unknown email"}`)

    // Update the search status to completed
    await updateSearchStatus(searchId, "completed")

    return NextResponse.json({
      success: true,
      message: "Results sent successfully",
    })
  } catch (error) {
    console.error("Error sending results:", error)
    return NextResponse.json(
      {
        error: "Error sending results",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
