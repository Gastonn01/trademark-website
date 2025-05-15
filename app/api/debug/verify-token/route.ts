import { NextResponse } from "next/server"
import { getSearchDataByToken } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const fetchCache = "auto"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    console.log("Debug: Verifying token:", token)

    // Try to get search data by token
    const searchData = await getSearchDataByToken(token)

    if (!searchData) {
      return NextResponse.json(
        {
          error: "No search data found for this token",
          token,
          searchData: null,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      token,
      searchData,
    })
  } catch (error) {
    console.error("Error in verify-token API:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
        token: req.url.split("token=")[1]?.split("&")[0] || "unknown",
      },
      { status: 500 },
    )
  }
}
