import { type NextRequest, NextResponse } from "next/server"
import { updateSearchResults } from "@/lib/supabase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchId, updatedResults } = body

    if (!searchId || !updatedResults) {
      return NextResponse.json(
        {
          error: "Missing required fields: searchId and updatedResults",
          success: false,
        },
        { status: 400 },
      )
    }

    console.log("Updating search results for:", searchId)
    console.log("Updated results:", updatedResults)

    const result = await updateSearchResults(searchId, updatedResults)

    return NextResponse.json({
      data: result,
      error: null,
      source: "supabase",
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in POST /api/admin/update-search:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
