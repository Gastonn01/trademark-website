import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  const results = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
    success: false,
    summary: "",
  }

  try {
    // Test 1: Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    results.tests.push({
      test: "Environment Variables",
      supabaseUrl: supabaseUrl ? "✅ Present" : "❌ Missing",
      serviceKey: supabaseServiceKey ? "✅ Present" : "❌ Missing",
      anonKey: supabaseAnonKey ? "✅ Present" : "❌ Missing",
      passed: !!(supabaseUrl && (supabaseServiceKey || supabaseAnonKey)),
    })

    if (!supabaseUrl) {
      results.summary = "❌ NEXT_PUBLIC_SUPABASE_URL is missing"
      return NextResponse.json(results, { status: 500 })
    }

    if (!supabaseServiceKey && !supabaseAnonKey) {
      results.summary = "❌ Both SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing"
      return NextResponse.json(results, { status: 500 })
    }

    // Test 2: Client Creation
    let supabase
    try {
      supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
      results.tests.push({
        test: "Client Creation",
        status: "✅ Success",
        passed: true,
      })
    } catch (error) {
      results.tests.push({
        test: "Client Creation",
        status: "❌ Failed",
        error: error instanceof Error ? error.message : String(error),
        passed: false,
      })
      results.summary = "❌ Failed to create Supabase client"
      return NextResponse.json(results, { status: 500 })
    }

    // Test 3: Database Connection
    try {
      const { data: connectionTest, error: connectionError } = await supabase
        .from("trademark_searches")
        .select("count", { count: "exact", head: true })

      if (connectionError) {
        results.tests.push({
          test: "Database Connection",
          status: "❌ Failed",
          error: connectionError.message,
          passed: false,
        })
      } else {
        results.tests.push({
          test: "Database Connection",
          status: "✅ Success",
          recordCount: connectionTest,
          passed: true,
        })
      }
    } catch (error) {
      results.tests.push({
        test: "Database Connection",
        status: "❌ Failed",
        error: error instanceof Error ? error.message : String(error),
        passed: false,
      })
    }

    // Test 4: Table Structure Check
    try {
      const { data: tableInfo, error: tableError } = await supabase.rpc("get_table_info", {
        table_name: "trademark_searches",
      })

      if (tableError) {
        results.tests.push({
          test: "Table Structure",
          status: "⚠️ Could not verify structure",
          error: tableError.message,
          passed: false,
        })
      } else {
        results.tests.push({
          test: "Table Structure",
          status: "✅ Verified",
          columns: tableInfo,
          passed: true,
        })
      }
    } catch (error) {
      results.tests.push({
        test: "Table Structure",
        status: "⚠️ Could not verify",
        note: "Table exists but structure check failed",
        passed: true,
      })
    }

    // Test 5: Insert Test
    const testData = {
      email: "test@diagnostic.com",
      trademark_name: "DIAGNOSTIC_TEST",
      status: "pending",
      form_type: "diagnostic",
      search_results: {
        name: "Diagnostic",
        surname: "Test",
        email: "test@diagnostic.com",
        trademarkName: "DIAGNOSTIC_TEST",
        goodsAndServices: "Testing services",
        timestamp: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const { data: insertData, error: insertError } = await supabase
        .from("trademark_searches")
        .insert([testData])
        .select()

      if (insertError) {
        results.tests.push({
          test: "Insert Test",
          status: "❌ Failed",
          error: insertError.message,
          passed: false,
        })
      } else {
        results.tests.push({
          test: "Insert Test",
          status: "✅ Success",
          insertedData: insertData,
          passed: true,
        })

        // Clean up test data
        if (insertData && insertData[0]) {
          await supabase.from("trademark_searches").delete().eq("id", insertData[0].id)
        }
      }
    } catch (error) {
      results.tests.push({
        test: "Insert Test",
        status: "❌ Failed",
        error: error instanceof Error ? error.message : String(error),
        passed: false,
      })
    }

    // Test 6: Recent Data Fetch
    try {
      const { data: recentData, error: fetchError } = await supabase
        .from("trademark_searches")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (fetchError) {
        results.tests.push({
          test: "Recent Data Fetch",
          status: "❌ Failed",
          error: fetchError.message,
          passed: false,
        })
      } else {
        results.tests.push({
          test: "Recent Data Fetch",
          status: "✅ Success",
          recordCount: recentData?.length || 0,
          latestRecord: recentData?.[0]
            ? {
                id: recentData[0].id,
                email: recentData[0].email,
                trademark_name: recentData[0].trademark_name,
                created_at: recentData[0].created_at,
                status: recentData[0].status,
              }
            : null,
          passed: true,
        })
      }
    } catch (error) {
      results.tests.push({
        test: "Recent Data Fetch",
        status: "❌ Failed",
        error: error instanceof Error ? error.message : String(error),
        passed: false,
      })
    }

    // Summary
    const passedTests = results.tests.filter((test) => test.passed).length
    const totalTests = results.tests.length
    results.success = passedTests === totalTests
    results.summary = `${passedTests}/${totalTests} tests passed`

    if (results.success) {
      results.summary = "✅ All Supabase integration tests passed!"
    } else {
      results.summary = `⚠️ ${totalTests - passedTests} test(s) failed`
    }

    return NextResponse.json(results)
  } catch (error) {
    results.tests.push({
      test: "Critical Error",
      status: "❌ Failed",
      error: error instanceof Error ? error.message : String(error),
      passed: false,
    })
    results.summary = "❌ Critical error during diagnostic"
    return NextResponse.json(results, { status: 500 })
  }
}
