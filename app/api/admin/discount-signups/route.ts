import { type NextRequest, NextResponse } from "next/server"
import { getAllDiscountSignups } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const result = await getAllDiscountSignups()

    if (result.data) {
      return NextResponse.json({
        success: true,
        data: result.data,
        source: result.source,
        count: result.data.length,
      })
    } else {
      return NextResponse.json({ error: "Failed to fetch discount signups" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in discount signups API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
