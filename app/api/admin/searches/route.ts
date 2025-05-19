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

  try {
    // Set a timeout for the operation
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Operation timed out")), 15000)
    })

    // Get the data with a race against the timeout
    const dataPromise = getAllSearchData(limit, offset, status)
    const result = await Promise.race([dataPromise, timeoutPromise]).catch((error) => {
      console.error("Error or timeout in getAllSearchData:", error)
      // Return empty data instead of throwing
      return { data: [], error: `Request timed out or failed: ${error.message}`, source: "error-fallback" }
    })

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
