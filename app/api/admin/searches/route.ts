import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

// Configure this route for dynamic rendering
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "auto"
export const runtime = "nodejs"
export const preferredRegion = "auto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")
  const status = searchParams.get("status") || undefined

  console.log(`API route: Fetching searches with limit=${limit}, offset=${offset}, status=${status || "all"}`)

  try {
    // Try to get the search data
    const result = await getAllSearchData(limit, offset, status)
    console.log(`API route: Fetched ${result.data?.length || 0} searches from ${result.source || "unknown source"}`)

    // Return a consistent response format
    return NextResponse.json({
      data: result.data || [],
      count: result.data?.length || 0,
      source: result.source || "unknown",
      error: result.error || null,
      message: result.message || null,
    })
  } catch (error) {
    console.error("Error in API route:", error)

    // Return a proper JSON error response
    return NextResponse.json(
      {
        data: [],
        count: 0,
        error: "Error fetching search data",
        details: error instanceof Error ? error.message : String(error),
        source: "error",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json({ error: "Search ID and status are required" }, { status: 400 })
    }

    console.log(`API route: Updating search ${searchId} status to ${status}`)
    const result = await updateSearchStatus(searchId, status)

    if (result.error) {
      return NextResponse.json(
        {
          error: "Error updating search status",
          details: result.error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating search status:", error)
    return NextResponse.json(
      {
        error: "Error updating search status",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
