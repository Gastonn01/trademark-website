import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const searchId = searchParams.get("searchId")

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    // Return the complete data structure for debugging
    return NextResponse.json({
      searchId,
      searchData,
      hasSearchResults: !!searchData.search_results,
      searchResultsKeys: searchData.search_results ? Object.keys(searchData.search_results) : [],
      hasAnalysis: !!(
        searchData.search_results?.detailedSummary ||
        searchData.search_results?.recommendations ||
        searchData.search_results?.trademarkStrength ||
        searchData.search_results?.riskLevel
      ),
      analysisFields: {
        detailedSummary: !!searchData.search_results?.detailedSummary,
        recommendations: !!searchData.search_results?.recommendations,
        trademarkStrength: !!searchData.search_results?.trademarkStrength,
        riskLevel: !!searchData.search_results?.riskLevel,
        exactMatch: !!searchData.search_results?.exactMatch,
        conflictingMarks: !!searchData.search_results?.conflictingMarks,
        classesAnalysis: !!searchData.search_results?.classesAnalysis,
      },
    })
  } catch (error) {
    console.error("Debug endpoint error:", error)
    return NextResponse.json(
      {
        error: "Error fetching search data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
