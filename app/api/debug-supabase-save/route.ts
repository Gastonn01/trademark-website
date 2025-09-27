import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "missing",
    })

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase environment variables",
          hasUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseServiceKey,
        },
        { status: 500 },
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Test 1: Check if we can connect to Supabase
    const { data: connectionTest, error: connectionError } = await supabase
      .from("trademark_searches")
      .select("count", { count: "exact", head: true })

    if (connectionError) {
      return NextResponse.json(
        {
          error: "Failed to connect to Supabase",
          details: connectionError.message,
          code: connectionError.code,
          hint: connectionError.hint,
        },
        { status: 500 },
      )
    }

    // Test 2: Try to fetch existing data
    const { data: existingData, error: fetchError } = await supabase.from("trademark_searches").select("*").limit(5)

    // Test 3: Try to insert test data
    const testData = {
      trademark_name: "TEST_TRADEMARK_" + Date.now(),
      email: "test@example.com",
      status: "pending",
      search_results: {
        test: true,
        timestamp: new Date().toISOString(),
      },
    }

    const { data: insertData, error: insertError } = await supabase.from("trademark_searches").insert(testData).select()

    // Test 4: If insert was successful, delete the test record
    let deleteResult = null
    if (insertData && insertData.length > 0) {
      const { error: deleteError } = await supabase.from("trademark_searches").delete().eq("id", insertData[0].id)

      deleteResult = { success: !deleteError, error: deleteError?.message }
    }

    return NextResponse.json({
      success: true,
      tests: {
        connection: {
          success: !connectionError,
          totalRecords: connectionTest || 0,
          error: connectionError?.message,
        },
        fetch: {
          success: !fetchError,
          recordsFound: existingData?.length || 0,
          sampleData: existingData?.slice(0, 2),
          error: fetchError?.message,
        },
        insert: {
          success: !insertError,
          insertedData: insertData,
          error: insertError?.message,
        },
        delete: deleteResult,
      },
      environment: {
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
        nodeEnv: process.env.NODE_ENV,
      },
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json(
      {
        error: "Unexpected error during debug",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
