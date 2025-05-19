import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"

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

    // In a real implementation, you would update a 'viewed_at' field in the database
    // For now, we'll just log it
    console.log(`Search ${searchId} viewed at ${new Date().toISOString()}`)

    return NextResponse.json({
      success: true,
      message: "View recorded successfully",
    })
  } catch (error) {
    console.error("Error recording view:", error)
    return NextResponse.json(
      {
        error: "Error recording view",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
