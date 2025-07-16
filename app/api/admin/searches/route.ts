import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    console.log("=== Admin Searches API Debug ===")
    console.log("Request URL:", request.url)
    console.log("Request headers:", Object.fromEntries(request.headers.entries()))

    const status = request.nextUrl.searchParams.get("status") || "all"
    const timestamp = request.nextUrl.searchParams.get("t") || "none"
    const refresh = request.nextUrl.searchParams.get("refresh") || "false"

    console.log("Query params:", { status, timestamp, refresh })

    // Log environment variables (without exposing sensitive data)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment check:")
    console.log("- NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "MISSING")
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Present" : "Missing")
    console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing")

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({
        data: [],
        error: "Missing Supabase environment variables - check Vercel deployment settings",
        source: "env-error",
        success: false,
        timestamp: new Date().toISOString(),
        debug: {
          supabaseUrl: !!supabaseUrl,
          supabaseKey: !!supabaseKey,
          nodeEnv: process.env.NODE_ENV,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("Supabase client created successfully")

    // Test connection with a simple query first
    console.log("Testing database connection...")
    const { data: testData, error: testError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (testError) {
      console.error("Database connection test failed:", testError)

      // Check for specific error types
      if (testError.message?.includes("relation") && testError.message?.includes("does not exist")) {
        return NextResponse.json({
          data: [],
          error: "Table 'trademark_searches' does not exist in Supabase database",
          source: "table-missing",
          success: false,
          timestamp: new Date().toISOString(),
          setup_required: true,
          debug: {
            errorCode: testError.code,
            errorMessage: testError.message,
            errorDetails: testError.details,
          },
        })
      }

      if (testError.message?.includes("permission") || testError.message?.includes("policy")) {
        return NextResponse.json({
          data: [],
          error: "Database permission denied - check RLS policies and API keys",
          source: "permission-error",
          success: false,
          timestamp: new Date().toISOString(),
          debug: {
            errorCode: testError.code,
            errorMessage: testError.message,
            suggestion: "Check if RLS is enabled and policies allow read access",
          },
        })
      }

      return NextResponse.json({
        data: [],
        error: `Database error: ${testError.message}`,
        source: "database-error",
        success: false,
        timestamp: new Date().toISOString(),
        debug: {
          errorCode: testError.code,
          errorMessage: testError.message,
          errorDetails: testError.details,
        },
      })
    }

    console.log("Database connection successful")

    // Build the main query
    let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
      console.log(`Filtering by status: ${status}`)
    }

    console.log("Executing main query...")
    const { data, error } = await query

    if (error) {
      console.error("Main query error:", error)
      return NextResponse.json({
        data: [],
        error: `Data fetch failed: ${error.message}`,
        source: "fetch-error",
        success: false,
        timestamp: new Date().toISOString(),
        debug: {
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
        },
      })
    }

    console.log(`Successfully fetched ${data?.length || 0} records from trademark_searches table`)

    // Handle empty data
    if (!data || data.length === 0) {
      return NextResponse.json({
        data: [],
        error: null,
        source: "empty-database",
        success: true,
        timestamp: new Date().toISOString(),
        message: "Database connected successfully but no records found",
        debug: {
          tableExists: true,
          queryStatus: "success",
          recordCount: 0,
        },
      })
    }

    // Transform the data to match expected format
    const transformedData = data.map((search, index) => {
      let searchResults = {}

      // Safely parse search_results if it's stored as JSON string
      if (search.search_results) {
        if (typeof search.search_results === "string") {
          try {
            searchResults = JSON.parse(search.search_results)
          } catch (parseError) {
            console.warn(`Failed to parse search_results for record ${search.id}:`, parseError)
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
          name: searchResults.name || searchResults.firstName || "",
          surname: searchResults.surname || searchResults.lastName || "",
          email: search.email || searchResults.email || "",
          trademarkName: search.trademark_name || searchResults.trademarkName || "",
          goodsAndServices: searchResults.goodsAndServices || searchResults.description || "",
          ...searchResults,
        },
        created_at: search.created_at || new Date().toISOString(),
        status: search.status || "pending",
      }
    })

    console.log("Data transformation completed successfully")

    return NextResponse.json({
      data: transformedData,
      error: null,
      source: "supabase-success",
      success: true,
      timestamp: new Date().toISOString(),
      count: transformedData.length,
      debug: {
        tableExists: true,
        queryStatus: "success",
        recordCount: transformedData.length,
        statusFilter: status,
        refreshRequested: refresh === "true",
      },
    })
  } catch (error) {
    console.error("Critical error in admin searches API:", error)

    return NextResponse.json(
      {
        data: [],
        error: error instanceof Error ? error.message : String(error),
        source: "critical-error",
        success: false,
        timestamp: new Date().toISOString(),
        debug: {
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          stack: error instanceof Error ? error.stack : undefined,
        },
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    console.log("=== Admin Searches PATCH API ===")

    const body = await request.json()
    const { searchId, status } = body

    console.log("PATCH request body:", { searchId, status })

    if (!searchId || !status) {
      return NextResponse.json(
        {
          error: "Missing required fields: searchId and status",
          success: false,
        },
        { status: 400 },
      )
    }

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

    console.log(`Updating search ${searchId} to status: ${status}`)

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
          debug: {
            errorCode: error.code,
            errorMessage: error.message,
            searchId,
            status,
          },
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
