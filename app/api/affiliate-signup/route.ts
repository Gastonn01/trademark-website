import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, platform, handle, followers, niche } = body

    if (!name || !email || !handle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase.from("affiliate_signups").insert({
      id: uuidv4(),
      name,
      email,
      platform: platform || null,
      handle,
      followers: followers || null,
      niche: niche || null,
      status: "pending",
    })

    if (error) {
      console.error("[affiliate-signup] insert failed:", error.message)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    return NextResponse.json({ message: "Signup received" })
  } catch (error) {
    console.error("[affiliate-signup] error:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
