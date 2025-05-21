import { type NextRequest, NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Get status filter from query params
    const status = request.nextUrl.searchParams.get("status") || "all"

    // Force disable mock data for this endpoint
    process.env.USE_MOCK_DATA = "false"

    // Get search data
    const result = await getAllSearchData(100, 0, status)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/admin/searches:", error)
    return NextResponse.json(
      {
        data: [],
        error: error instanceof Error ? error.message : String(error),
        source: "error",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json({ error: "Missing required fields: searchId and status" }, { status: 400 })
    }

    const result = await updateSearchStatus(searchId, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in PATCH /api/admin/searches:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
