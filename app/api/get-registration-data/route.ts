import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const searchId = searchParams.get("search_id")

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    console.log("Fetching registration data for search ID:", searchId)

    // Get the search data from Supabase
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    console.log("Found search data:", searchData.id)

    // Return the search data in the expected format
    return NextResponse.json({
      id: searchData.id,
      search_data: searchData.search_results || {},
      status: searchData.status || "pending",
      created_at: searchData.created_at || new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching registration data:", error)
    return NextResponse.json({ error: "Failed to fetch registration data" }, { status: 500 })
  }
}
