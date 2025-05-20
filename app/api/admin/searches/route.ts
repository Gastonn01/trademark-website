import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

// Configure this route for static export
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "force-no-store"
export const runtime = "nodejs"
export const preferredRegion = "auto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")
  const status = searchParams.get("status") || undefined

  try {
    console.log("API route: Fetching search data with params:", { limit, offset, status })
    const result = await getAllSearchData(limit, offset, status)
    console.log(`API route: Fetched ${result.data?.length || 0} records from ${result.source}`)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API route: Error fetching search data:", error)
    // Return a proper JSON error response
    return NextResponse.json({ error: "Error fetching search data", details: String(error) }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json({ error: "Search ID and status are required" }, { status: 400 })
    }

    console.log("API route: Updating search status:", { searchId, status })
    const result = await updateSearchStatus(searchId, status)
    console.log("API route: Update result:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API route: Error updating search status:", error)
    return NextResponse.json({ error: "Error updating search status", details: String(error) }, { status: 500 })
  }
}
