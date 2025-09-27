import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Admin searches API called")

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get("status") || "all"
    const formTypeFilter = searchParams.get("formType") || "all"
    const tableType = (searchParams.get("tableType") as "trademark_searches" | "verification_requests" | "all") || "all"

    console.log("📊 Filters:", { statusFilter, formTypeFilter, tableType })

    // Import dynamically to avoid module loading issues
    const { getAllSearches } = await import("@/lib/supabase")

    // Get data from both tables
    const allData = await getAllSearches(tableType)

    console.log(`✅ Retrieved ${allData?.length || 0} total records from both tables`)

    // Apply frontend filtering
    let filteredData = allData || []

    // Filter by status
    if (statusFilter !== "all") {
      filteredData = filteredData.filter((item) => item.status === statusFilter)
    }

    // Filter by form type
    if (formTypeFilter !== "all") {
      filteredData = filteredData.filter((item) => {
        const formType = item.form_type || item.search_results?.formType
        return formType === formTypeFilter
      })
    }

    console.log(`📋 After filtering: ${filteredData.length} records`)

    // Transform the data to ensure consistent structure
    const transformedData = filteredData.map((item) => ({
      id: item.id,
      trademark_name: item.trademark_name,
      email: item.email,
      status: item.status || "pending",
      created_at: item.created_at,
      updated_at: item.updated_at,
      search_results: item.search_results || {},
      table_type: item.table_type,
      form_type: item.form_type,
      // Verification-specific fields (will be null for trademark_searches)
      estimated_price: item.estimated_price || null,
      files_count: item.files_count || null,
      selected_countries: item.selected_countries || null,
      selected_classes: item.selected_classes || null,
      trademark_type: item.trademark_type || null,
      contact_phone: item.contact_phone || null,
      marketing_consent: item.marketing_consent || null,
    }))

    return NextResponse.json({
      data: transformedData,
      source: "both-tables",
      total: allData.length,
      filtered: filteredData.length,
      filters: { statusFilter, formTypeFilter, tableType },
    })
  } catch (err) {
    console.error("💥 Critical error in admin searches API:", err)

    // Return more detailed error information for debugging
    const errorMessage = err instanceof Error ? err.message : String(err)
    const errorStack = err instanceof Error ? err.stack : undefined

    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
        data: [],
        source: "critical-error",
      },
      { status: 500 },
    )
  }
}
