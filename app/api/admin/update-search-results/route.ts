import { NextResponse } from "next/server"
import { updateSearchResults } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, results } = body

    if (!searchId || !results) {
      return NextResponse.json({ error: "Search ID and results are required" }, { status: 400 })
    }

    // Update the search results
    const result = await updateSearchResults(searchId, results)

    return NextResponse.json({
      success: true,
      message: "Search results updated successfully",
      data: result,
    })
  } catch (error) {
    console.error("Error updating search results:", error)
    return NextResponse.json(
      {
        error: "Error updating search results",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
