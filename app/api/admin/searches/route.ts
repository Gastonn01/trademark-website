import { NextResponse } from "next/server"
import { getAllSearchData, updateSearchStatus } from "@/lib/supabase"

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
    return NextResponse.json({ error: "Error fetching search data" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const { searchId, status } = body

  if (!searchId || !status) {
    return NextResponse.json({ error: "Search ID and status are required" }, { status: 400 })
  }

  try {
    const result = await updateSearchStatus(searchId, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating search status:", error)
    return NextResponse.json({ error: "Error updating search status" }, { status: 500 })
  }
}
