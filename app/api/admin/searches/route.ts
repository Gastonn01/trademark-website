import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Admin API Debug ===")

    const status = request.nextUrl.searchParams.get("status") || "all"
    console.log("Status filter:", status)

    // Create Supabase client with restored database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        data: [],
        error: "Missing Supabase environment variables",
        source: "env-error",
        success: false,
        timestamp: new Date().toISOString(),
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("Testing database connection...")

    // Test connection first
    const { data: testData, error: testError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (testError) {
      console.error("Database connection test failed:", testError)

      // Check for specific error types
      if (testError.message?.includes("relation") && testError.message?.includes("does not exist")) {
        return NextResponse.json({
          data: [],
          error: "Table 'trademark_searches' does not exist - please run the database setup script",
          source: "table-missing",
          success: false,
          timestamp: new Date().toISOString(),
          setup_required: true,
        })
      }

      return NextResponse.json({
        data: [],
        error: `Database error: ${testError.message}`,
        source: "database-error",
        success: false,
        timestamp: new Date().toISOString(),
      })
    }

    console.log("Connection successful, fetching data...")

    // Build the query
    let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Data fetch error:", error)
      return NextResponse.json({
        data: [],
        error: `Data fetch failed: ${error.message}`,
        source: "fetch-error",
        success: false,
        timestamp: new Date().toISOString(),
      })
    }

    console.log(`Successfully fetched ${data?.length || 0} records`)

    // Handle empty data
    if (!data || data.length === 0) {
      return NextResponse.json({
        data: [],
        error: null,
        source: "empty-database",
        success: true,
        timestamp: new Date().toISOString(),
        message: "Database connected successfully but no records found",
      })
    }

    // Transform the data
    const transformedData = data.map((search, index) => {
      let searchResults = {}

      // Safely parse search_results if it's stored as JSON string
      if (search.search_results) {
        if (typeof search.search_results === "string") {
          try {
            searchResults = JSON.parse(search.search_results)
          } catch (parseError) {
            console.warn(`Failed to parse search_results for record ${search.id}`)
            searchResults = { raw: search.search_results }
          }
        } else if (typeof search.search_results === "object") {
          searchResults = search.search_results
        }
      }

      return {
        id: search.id || `record-${index}`,
        form_type: search.form_type || search.notes || "free-search",
        search_data: {
          name: searchResults.firstName || searchResults.name || "",
          surname: searchResults.lastName || searchResults.surname || "",
          email: search.email || searchResults.email || "",
          trademarkName: search.trademark_name || searchResults.trademarkName || "",
          goodsAndServices: searchResults.goodsAndServices || searchResults.description || "",
          ...searchResults,
        },
        created_at: search.created_at || new Date().toISOString(),
        status: search.status || "pending",
      }
    })

    return NextResponse.json({
      data: transformedData,
      error: null,
      source: "supabase-success",
      success: true,
      timestamp: new Date().toISOString(),
      count: transformedData.length,
    })
  } catch (error) {
    console.error("Critical error in admin API:", error)

    return NextResponse.json(
      {
        data: [],
        error: error instanceof Error ? error.message : String(error),
        source: "critical-error",
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json(
        {
          error: "Missing required fields: searchId and status",
          success: false,
        },
        { status: 400 },
      )
    }

    console.log(`Updating search ${searchId} to status: ${status}`)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase configuration",
          success: false,
        },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Update error:", error)
      return NextResponse.json(
        {
          error: `Failed to update status: ${error.message}`,
          success: false,
        },
        { status: 500 },
      )
    }

    console.log("Update successful:", data)

    return NextResponse.json({
      data: data,
      error: null,
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Critical error in PATCH:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
