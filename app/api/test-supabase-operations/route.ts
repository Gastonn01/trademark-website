import { NextResponse } from "next/server"
import { getAllSearchData, saveSearchData, updateSearchStatus, getSearchData } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("=== TESTING SUPABASE OPERATIONS ===")

    const results = {
      getAllSearchData: null as any,
      saveSearchData: null as any,
      getSearchData: null as any,
      updateSearchStatus: null as any,
      errors: [] as string[],
    }

    // Test 1: Get all search data
    try {
      console.log("Testing getAllSearchData...")
      const allData = await getAllSearchData(10, 0, "all")
      results.getAllSearchData = {
        success: true,
        count: allData.data?.length || 0,
        source: allData.source,
        error: allData.error,
      }
      console.log("getAllSearchData result:", results.getAllSearchData)
    } catch (error) {
      results.getAllSearchData = { success: false, error: error instanceof Error ? error.message : String(error) }
      results.errors.push(`getAllSearchData failed: ${error}`)
    }

    // Test 2: Save search data
    try {
      console.log("Testing saveSearchData...")
      const testSearchData = {
        name: "Test",
        surname: "User",
        email: "test@operations.com",
        trademarkName: "Operations Test Mark",
        goodsAndServices: "Testing services",
      }
      const saveResult = await saveSearchData("test-operations-" + Date.now(), testSearchData, "free-search")
      results.saveSearchData = {
        success: saveResult.success,
        source: saveResult.source,
        error: saveResult.error,
      }
      console.log("saveSearchData result:", results.saveSearchData)
    } catch (error) {
      results.saveSearchData = { success: false, error: error instanceof Error ? error.message : String(error) }
      results.errors.push(`saveSearchData failed: ${error}`)
    }

    // Test 3: Get specific search data
    try {
      console.log("Testing getSearchData...")
      const searchResult = await getSearchData("sample-trademark-1")
      results.getSearchData = {
        success: !!searchResult,
        found: !!searchResult,
        hasSearchResults: !!searchResult?.search_results,
      }
      console.log("getSearchData result:", results.getSearchData)
    } catch (error) {
      results.getSearchData = { success: false, error: error instanceof Error ? error.message : String(error) }
      results.errors.push(`getSearchData failed: ${error}`)
    }

    // Test 4: Update search status
    try {
      console.log("Testing updateSearchStatus...")
      const updateResult = await updateSearchStatus("sample-trademark-1", "completed")
      results.updateSearchStatus = {
        success: !updateResult.error,
        source: updateResult.source,
        error: updateResult.error,
      }
      console.log("updateSearchStatus result:", results.updateSearchStatus)
    } catch (error) {
      results.updateSearchStatus = { success: false, error: error instanceof Error ? error.message : String(error) }
      results.errors.push(`updateSearchStatus failed: ${error}`)
    }

    return NextResponse.json({
      success: results.errors.length === 0,
      message: results.errors.length === 0 ? "All operations working correctly" : "Some operations failed",
      results,
      summary: {
        totalTests: 4,
        passed: Object.values(results).filter((r) => r && typeof r === "object" && r.success).length,
        failed: results.errors.length,
      },
    })
  } catch (error) {
    console.error("Test operations error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to test operations",
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
