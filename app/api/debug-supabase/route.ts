import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Log environment variables (without exposing sensitive values)
    console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase credentials",
        envVars: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check connection by listing tables
    const { data: tableData, error: tableError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (tableError) {
      // If table doesn't exist, check if we can list all tables
      const { data: allTables, error: schemaError } = await supabase.rpc("get_all_tables")

      return NextResponse.json({
        success: false,
        error: tableError.message,
        details: "Could not access trademark_searches table",
        allTables: allTables || [],
        schemaError: schemaError ? schemaError.message : null,
      })
    }

    // Try to get all tables in the database
    let tables = []
    try {
      const { data: allTables } = await supabase.rpc("get_all_tables")
      tables = allTables || []
    } catch (e) {
      console.error("Could not get all tables:", e)
    }

    // Try to get actual search data
    const { data: searches, error: searchError } = await supabase.from("trademark_searches").select("*").limit(10)

    return NextResponse.json({
      success: true,
      connection: "Successful",
      tableExists: true,
      tables,
      sampleData: searches || [],
      recordCount: searches ? searches.length : 0,
      error: searchError ? searchError.message : null,
    })
  } catch (error) {
    console.error("Debug Supabase error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
    })
  }
}
