import { NextResponse } from "next/server"
import { updateSearchResults } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, updatedResults } = body

    if (!searchId || !updatedResults) {
      return NextResponse.json({ error: "Search ID and updated results are required" }, { status: 400 })
    }

    console.log("API route: Updating search results:", { searchId })
    const result = await updateSearchResults(searchId, updatedResults)
    console.log("API route: Update result:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API route: Error updating search results:", error)
    return NextResponse.json({ error: "Error updating search results", details: String(error) }, { status: 500 })
  }
}
