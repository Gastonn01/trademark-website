import { type NextRequest, NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    console.log("API: Starting search data fetch...")

    // Get status filter from query params
    const status = request.nextUrl.searchParams.get("status") || "all"
    console.log("API: Status filter:", status)

    // Get search data with bulletproof error handling
    const result = await getAllSearchData(100, 0, status)

    console.log("API: Search data result:", {
      dataCount: result.data?.length || 0,
      error: result.error,
      source: result.source,
    })

    // Always return a valid JSON response
    const response = {
      data: result.data || [],
      error: result.error,
      source: result.source || "unknown",
      success: !result.error,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Critical error in GET /api/admin/searches:", error)

    // Import mock data dynamically to avoid any import issues
    try {
      const { getMockSearchData } = await import("@/lib/mock-data")
      return NextResponse.json({
        data: getMockSearchData(),
        error: error instanceof Error ? error.message : String(error),
        source: "api-critical-error-fallback",
        success: false,
        timestamp: new Date().toISOString(),
      })
    } catch (importError) {
      // Ultimate fallback
      return NextResponse.json({
        data: [
          {
            id: "emergency-fallback",
            form_type: "emergency",
            search_data: {
              name: "Emergency",
              surname: "Fallback",
              email: "emergency@example.com",
              trademarkName: "Emergency Data",
            },
            created_at: new Date().toISOString(),
            status: "pending",
          },
        ],
        error: "Critical system error",
        source: "emergency-fallback",
        success: false,
        timestamp: new Date().toISOString(),
      })
    }
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json(
        {
          error: "Missing required fields: searchId and status",
          success: false,
        },
        { status: 400 },
      )
    }

    const result = await updateSearchStatus(searchId, status)

    return NextResponse.json({
      ...result,
      success: !result.error,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in PATCH /api/admin/searches:", error)
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
