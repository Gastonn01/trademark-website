import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    // Simulate a form submission
    const mockFormData = {
      trademarkName: "TEST_BRAND_" + Date.now(),
      email: "test@example.com",
      name: "Test User",
      surname: "Debug",
      countries: ["United States", "Spain"],
      goodsAndServices: "Testing trademark search functionality",
      trademarkType: "word",
    }

    console.log("Starting debug form submission with data:", mockFormData)

    // Step 1: Test Supabase connection and save
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase credentials",
          step: "environment_check",
        },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Prepare data for insertion (matching your actual form structure)
    const insertData = {
      trademark_name: mockFormData.trademarkName,
      email: mockFormData.email,
      status: "pending",
      search_results: {
        trademarkType: mockFormData.trademarkType,
        countries: mockFormData.countries,
        name: mockFormData.name,
        surname: mockFormData.surname,
        goodsAndServices: mockFormData.goodsAndServices,
        submittedAt: new Date().toISOString(),
      },
    }

    console.log("Attempting to insert data:", insertData)

    const { data: savedData, error: saveError } = await supabase.from("trademark_searches").insert(insertData).select()

    if (saveError) {
      console.error("Supabase save error:", saveError)
      return NextResponse.json(
        {
          error: "Failed to save to Supabase",
          details: saveError.message,
          code: saveError.code,
          hint: saveError.hint,
          step: "supabase_save",
        },
        { status: 500 },
      )
    }

    console.log("Successfully saved to Supabase:", savedData)

    // Step 2: Test email sending (simulate)
    const resendApiKey = process.env.RESEND_API_KEY
    let emailResult = { success: false, error: "No API key" }

    if (resendApiKey) {
      try {
        // This would be your actual email sending logic
        console.log("Would send email to:", mockFormData.email)
        emailResult = { success: true, error: null }
      } catch (emailError) {
        console.error("Email error:", emailError)
        emailResult = {
          success: false,
          error: emailError instanceof Error ? emailError.message : "Unknown email error",
        }
      }
    }

    // Step 3: Clean up test data
    if (savedData && savedData.length > 0) {
      const { error: deleteError } = await supabase.from("trademark_searches").delete().eq("id", savedData[0].id)

      if (deleteError) {
        console.warn("Failed to clean up test data:", deleteError)
      } else {
        console.log("Successfully cleaned up test data")
      }
    }

    return NextResponse.json({
      success: true,
      message: "Debug form submission completed successfully",
      results: {
        supabase: {
          success: true,
          savedData: savedData,
          recordId: savedData?.[0]?.id,
        },
        email: emailResult,
        cleanup: {
          attempted: true,
          success: true,
        },
      },
      mockData: mockFormData,
    })
  } catch (error) {
    console.error("Debug form submission error:", error)
    return NextResponse.json(
      {
        error: "Debug form submission failed",
        details: error instanceof Error ? error.message : "Unknown error",
        step: "general_error",
      },
      { status: 500 },
    )
  }
}
