import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    })

    const { data: conversations, error } = await supabase
      .from("chat_conversations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      console.error("[v0] Error fetching chat conversations:", error)
      return NextResponse.json({ error: "Error al cargar conversaciones" }, { status: 500 })
    }

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error("[v0] Error in chat transcripts API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
