import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    console.log("=== SUPABASE CONNECTION DEBUG START ===")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment variables check:")
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✅ Present" : "❌ Missing")
    console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✅ Present" : "❌ Missing")
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Present" : "❌ Missing")

    if (!supabaseUrl) {
      return NextResponse.json({
        success: false,
        error: "NEXT_PUBLIC_SUPABASE_URL is missing",
        timestamp: new Date().toISOString(),
      })
    }

    const keyToUse = supabaseServiceKey || supabaseAnonKey
    if (!keyToUse) {
      return NextResponse.json({
        success: false,
        error: "No Supabase key available (neither service role nor anon key)",
        timestamp: new Date().toISOString(),
      })
    }

    console.log("Using key type:", supabaseServiceKey ? "Service Role" : "Anon")
    console.log("Key preview:", keyToUse.substring(0, 20) + "...")

    // Create Supabase client
    const supabase = createClient(supabaseUrl, keyToUse, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("✅ Supabase client created")

    // Test 1: Check if table exists
    console.log("🔍 Testing table access...")
    const { data: tableData, error: tableError } = await supabase
      .from("trademark_searches")
      .select("count", { count: "exact", head: true })

    if (tableError) {
      console.error("❌ Table access failed:", tableError)
      return NextResponse.json({
        success: false,
        error: "Table access failed",
        details: {
          code: tableError.code,
          message: tableError.message,
          hint: tableError.hint,
        },
        timestamp: new Date().toISOString(),
      })
    }

    console.log("✅ Table access successful, record count:", tableData)

    // Test 2: Try to insert test data
    console.log("💾 Testing insert operation...")
    const testData = {
      email: "test@example.com",
      trademark_name: "TEST_TRADEMARK_" + Date.now(),
      status: "test",
      form_type: "debug_test",
      search_results: {
        test: true,
        timestamp: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: insertData, error: insertError } = await supabase
      .from("trademark_searches")
      .insert([testData])
      .select()

    if (insertError) {
      console.error("❌ Insert test failed:", insertError)
      return NextResponse.json({
        success: false,
        error: "Insert operation failed",
        details: {
          code: insertError.code,
          message: insertError.message,
          hint: insertError.hint,
          details: insertError.details,
        },
        timestamp: new Date().toISOString(),
      })
    }

    console.log("✅ Insert test successful:", insertData)

    // Test 3: Clean up test data
    if (insertData && insertData[0]?.id) {
      console.log("🧹 Cleaning up test data...")
      const { error: deleteError } = await supabase.from("trademark_searches").delete().eq("id", insertData[0].id)

      if (deleteError) {
        console.warn("⚠️ Failed to clean up test data:", deleteError)
      } else {
        console.log("✅ Test data cleaned up")
      }
    }

    return NextResponse.json({
      success: true,
      message: "All Supabase tests passed successfully",
      details: {
        url: supabaseUrl.substring(0, 30) + "...",
        keyType: supabaseServiceKey ? "service_role" : "anon",
        tableAccess: "✅ Working",
        insertTest: "✅ Working",
        recordCount: tableData,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("💥 Debug test exception:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Debug test failed with exception",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
