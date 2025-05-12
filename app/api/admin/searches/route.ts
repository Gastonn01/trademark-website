import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "default"
export const runtime = "nodejs"
export const preferredRegion = "auto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")
  const status = searchParams.get("status") || undefined

  try {
    const result = await getAllSearchData(limit, offset, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching search data:", error)
    // Return a proper JSON error response with a fallback to empty data
    return NextResponse.json({
      data: [],
      error: "Error fetching search data",
      details: String(error),
      source: "error-fallback",
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

    const result = await updateSearchStatus(searchId, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating search status:", error)
    return NextResponse.json({ error: "Error updating search status", details: String(error) }, { status: 500 })
  }
}
