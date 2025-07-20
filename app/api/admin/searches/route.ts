import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Admin searches API called")

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get("status") || "all"
    const formTypeFilter = searchParams.get("formType") || "all"

    console.log("📊 Filters:", { statusFilter, formTypeFilter })

    // Query all rows from trademark_searches table (no filtering on Supabase side)
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Supabase query error:", error)
      return NextResponse.json(
        {
          error: "Database query failed",
          details: error.message,
          data: [],
          source: "supabase-error",
        },
        { status: 500 },
      )
    }

    console.log(`✅ Retrieved ${data?.length || 0} total records from trademark_searches`)

    // Transform the data to match the expected format
    const transformedData = (data || []).map((item) => ({
      id: item.id,
      trademark_name: item.trademark_name,
      email: item.email,
      status: item.status || "pending",
      created_at: item.created_at,
      search_results: item.search_results || {},
    }))

    // Apply frontend filtering based on the formType inside search_results
    let filteredData = transformedData

    // Filter by status
    if (statusFilter !== "all") {
      filteredData = filteredData.filter((item) => item.status === statusFilter)
    }

    // Filter by form type (from search_results.formType)
    if (formTypeFilter !== "all") {
      filteredData = filteredData.filter((item) => item.search_results?.formType === formTypeFilter)
    }

    console.log(`📋 After filtering: ${filteredData.length} records`)
    console.log(
      "🔍 Sample data structure:",
      filteredData[0]
        ? {
            id: filteredData[0].id,
            trademark_name: filteredData[0].trademark_name,
            email: filteredData[0].email,
            status: filteredData[0].status,
            formType: filteredData[0].search_results?.formType,
          }
        : "No data",
    )

    return NextResponse.json({
      data: filteredData,
      source: "trademark-searches-table",
      total: transformedData.length,
      filtered: filteredData.length,
      filters: { statusFilter, formTypeFilter },
    })
  } catch (err) {
    console.error("💥 Critical error in admin searches API:", err)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : String(err),
        data: [],
        source: "critical-error",
      },
      { status: 500 },
    )
  }
}
