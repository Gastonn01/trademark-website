import { NextResponse } from "next/server"
import { updateSearchResults } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "default"
export const runtime = "nodejs"
export const preferredRegion = "auto"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, results } = body

    if (!searchId || !results) {
      return NextResponse.json({ error: "Search ID and results are required" }, { status: 400 })
    }

    const result = await updateSearchResults(searchId, results)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating search results:", error)
    return NextResponse.json({ error: "Error updating search results", details: String(error) }, { status: 500 })
  }
}
