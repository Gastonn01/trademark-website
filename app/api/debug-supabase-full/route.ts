import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    console.log("=== FULL SUPABASE DEBUG ===")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment variables check:")
    console.log("NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl, supabaseUrl?.substring(0, 30) + "...")
    console.log("SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey, supabaseServiceKey?.substring(0, 30) + "...")
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", !!supabaseAnonKey, supabaseAnonKey?.substring(0, 30) + "...")

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase credentials",
        details: {
          hasUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseServiceKey,
          hasAnonKey: !!supabaseAnonKey,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    })

    console.log("Supabase client created successfully")

    // Test 1: Basic connection
    console.log("Testing basic connection...")
    const { data: connectionTest, error: connectionError } = await supabase
      .from("trademark_searches")
      .select("count", { count: "exact", head: true })

    console.log("Connection test result:", { connectionTest, connectionError })

    // Test 2: Check if table exists
    console.log("Checking if trademark_searches table exists...")
    const { data: tableCheck, error: tableError } = await supabase.from("trademark_searches").select("id").limit(1)

    console.log("Table check result:", { tableCheck, tableError })

    // Test 3: Try to create table if it doesn't exist
    if (tableError && tableError.message.includes("does not exist")) {
      console.log("Table doesn't exist, attempting to create...")

      const { data: createResult, error: createError } = await supabase.rpc("execute_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS trademark_searches (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            trademark_name TEXT,
            email TEXT,
            status TEXT DEFAULT 'pending',
            notes TEXT,
            search_results JSONB,
            search_data JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Create index for better performance
          CREATE INDEX IF NOT EXISTS idx_trademark_searches_status ON trademark_searches(status);
          CREATE INDEX IF NOT EXISTS idx_trademark_searches_created_at ON trademark_searches(created_at);
        `,
      })

      console.log("Table creation result:", { createResult, createError })

      if (createError) {
        // Try alternative table creation method
        console.log("Trying alternative table creation...")
        const { data: altCreateResult, error: altCreateError } = await supabase.from("trademark_searches").insert([
          {
            id: "test-id-" + Date.now(),
            trademark_name: "Test Trademark",
            email: "test@example.com",
            status: "pending",
            notes: "test",
            search_results: { test: true },
            search_data: { test: true },
          },
        ])

        console.log("Alternative creation result:", { altCreateResult, altCreateError })
      }
    }

    // Test 4: Try to insert test data
    console.log("Testing data insertion...")
    const testId = "debug-test-" + Date.now()
    const { data: insertResult, error: insertError } = await supabase
      .from("trademark_searches")
      .insert([
        {
          id: testId,
          trademark_name: "Debug Test Trademark",
          email: "debug@test.com",
          status: "pending",
          notes: "debug-test",
          search_results: {
            exactMatch: "no",
            similarCount: "0",
            trademarkStrength: "strong",
            riskLevel: "low",
            detailedSummary: "This is a debug test entry",
          },
          search_data: {
            name: "Debug",
            surname: "Test",
            email: "debug@test.com",
            trademarkName: "Debug Test Trademark",
            goodsAndServices: "Testing services",
          },
        },
      ])
      .select()

    console.log("Insert test result:", { insertResult, insertError })

    // Test 5: Try to read data
    console.log("Testing data retrieval...")
    const { data: selectResult, error: selectError } = await supabase
      .from("trademark_searches")
      .select("*")
      .limit(5)
      .order("created_at", { ascending: false })

    console.log("Select test result:", {
      count: selectResult?.length || 0,
      selectError,
      sampleData: selectResult?.[0] || null,
    })

    // Test 6: Try to update data
    if (insertResult && insertResult.length > 0) {
      console.log("Testing data update...")
      const { data: updateResult, error: updateError } = await supabase
        .from("trademark_searches")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", testId)
        .select()

      console.log("Update test result:", { updateResult, updateError })
    }

    // Test 7: Clean up test data
    if (insertResult && insertResult.length > 0) {
      console.log("Cleaning up test data...")
      const { error: deleteError } = await supabase.from("trademark_searches").delete().eq("id", testId)

      console.log("Delete test result:", { deleteError })
    }

    // Test 8: Get table schema
    console.log("Getting table schema...")
    const { data: schemaResult, error: schemaError } = await supabase
      .rpc("get_table_schema", { table_name: "trademark_searches" })
      .catch(() => ({ data: null, error: "Schema function not available" }))

    console.log("Schema result:", { schemaResult, schemaError })

    // Final summary
    const summary = {
      success: true,
      environment: {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
        hasAnonKey: !!supabaseAnonKey,
        urlDomain: supabaseUrl?.split(".")[0] || "unknown",
      },
      connection: {
        success: !connectionError,
        error: connectionError?.message || null,
      },
      table: {
        exists: !tableError,
        error: tableError?.message || null,
      },
      operations: {
        canInsert: !insertError,
        canSelect: !selectError,
        insertError: insertError?.message || null,
        selectError: selectError?.message || null,
        recordCount: selectResult?.length || 0,
      },
      recommendations: [],
    }

    // Add recommendations based on test results
    if (connectionError) {
      summary.recommendations.push("Check Supabase URL and credentials")
    }
    if (tableError) {
      summary.recommendations.push("Create trademark_searches table manually in Supabase dashboard")
    }
    if (insertError) {
      summary.recommendations.push("Check table permissions and RLS policies")
    }
    if (!selectResult || selectResult.length === 0) {
      summary.recommendations.push("No data found - this might be normal for a new setup")
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error("Full Supabase debug error:", error)
    return NextResponse.json({
      success: false,
      error: "Debug test failed",
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null,
    })
  }
}
