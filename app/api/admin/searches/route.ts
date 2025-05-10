import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

// Configure this route for static export
export const dynamic = "force-dynamic"
export const dynamicParams = true // Changed from false to true
export const revalidate = 0 // Changed from false to 0
export const fetchCache = "default" // Changed from "only-no-store" to "default"
export const runtime = "nodejs"
export const preferredRegion = "auto"

// En un entorno de producción, deberías implementar autenticación y autorización aquí
// Esta es una implementación básica sin seguridad

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")
  const status = searchParams.get("status") || undefined

  try {
    const result = await getAllSearchData(limit, offset, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching search data:", error)
    // Return a proper JSON error response
    return NextResponse.json({ error: "Error fetching search data", details: String(error) }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { searchId, status } = body

    if (!searchId || !status) {
      return NextResponse.json({ error: "Search ID and status are required" }, { status: 400 })
    }

    const result = await updateSearchStatus(searchId, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating search status:", error)
    return NextResponse.json({ error: "Error updating search status", details: String(error) }, { status: 500 })
  }
}
