import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  try {
    // Get token from query parameters
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ success: false, message: "Token is required" }, { status: 400 })
    }

    // Check if we're in a preview environment
    const isPreviewEnvironment =
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let registrationData = null

    if (!isPreviewEnvironment) {
      // Try to get data from Supabase
      const { data, error } = await supabase.from("registration_info").select("*").eq("id", token).single()

      if (error) {
        console.error("Error fetching registration data:", error)
      } else if (data) {
        registrationData = data.data
      }
    } else {
      // In preview mode, return mock data
      registrationData = {
        id: token,
        owners: [
          {
            id: "preview1",
            type: "person",
            name: "John Doe",
            country: "US",
            address: "123 Preview St, Demo City, CA 12345",
            email: "john@example.com",
            ownershipPercentage: 100,
            stateProvince: "California",
            taxId: "123-45-6789",
            documents: [],
          },
        ],
      }
    }

    if (!registrationData) {
      return NextResponse.json({ success: false, message: "Registration data not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      registrationData,
    })
  } catch (error) {
    console.error("Error retrieving registration data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while retrieving registration data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
