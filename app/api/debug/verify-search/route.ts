import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const fetchCache = "auto"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const searchId = searchParams.get("search_id")

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    console.log("Debug: Verifying search ID:", searchId)

    // Try to get search data by ID
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json(
        {
          error: "No search data found for this ID",
          searchId,
          searchData: null,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      searchId,
      searchData,
      verificationToken: searchData.results?.verificationToken || null,
    })
  } catch (error) {
    console.error("Error in verify-search API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
        searchId: req.url.split("search_id=")[1]?.split("&")[0] || "unknown",
      },
      { status: 500 },
    )
  }
}
