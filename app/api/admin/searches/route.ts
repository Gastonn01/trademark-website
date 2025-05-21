import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"
import { getMockSearchData } from "@/lib/mock-data"

// Configure this route for static export
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "force-no-store"
export const runtime = "nodejs"
export const preferredRegion = "auto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") || undefined
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  console.log("API route: Fetching search data with status filter:", status)

  try {
    // Fetch actual data from Supabase with robust error handling
    const result = await getAllSearchData(limit, offset, status)

    console.log(`API route: Returning ${result.data?.length || 0} records from source: ${result.source}`)

    // Return the result, which may contain real data or fallback mock data
    return NextResponse.json({
      data: result.data || [],
      error: result.error,
      source: result.source,
    })
  } catch (error) {
    console.error("API route: Unhandled error fetching data:", error)

    // Return mock data as ultimate fallback
    const mockData = getMockSearchData(status)
    return NextResponse.json({
      data: mockData,
      error: error instanceof Error ? error.message : "Unknown error",
      source: "mock-api-error",
    })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json({ error: "Search ID and status are required" }, { status: 400 })
    }

    console.log("API route: Updating status for:", { searchId, status })

    try {
      // Update the status in Supabase
      const result = await updateSearchStatus(searchId, status)

      return NextResponse.json({
        data: result.data,
        error: result.error,
        source: result.source,
      })
    } catch (updateError) {
      console.error("API route: Error updating search status:", updateError)

      // Return a success response with error details to prevent UI errors
      return NextResponse.json({
        data: { id: searchId, status: status },
        error: updateError instanceof Error ? updateError.message : "Error updating status",
        source: "mock-update-error",
      })
    }
  } catch (parseError) {
    console.error("API route: Error parsing request body:", parseError)
    return NextResponse.json(
      {
        error: "Error parsing request",
        details: parseError instanceof Error ? parseError.message : "Invalid request format",
        success: false,
      },
      { status: 400 },
    )
  }
}
