import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const runtime = "nodejs"

const MONTHLY_CAP = 20

// Real count, not a hardcoded "20" — the landing page's scarcity copy
// ("X spots left this month") should reflect actual Clone Scan submissions,
// not an evergreen number that never moves.
export async function GET() {
  const now = new Date()
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
  try {
    const { count, error } = await supabase
      .from("trademark_searches")
      .select("id", { count: "exact", head: true })
      .eq("form_type", "clone-scan")
      .gte("created_at", monthStart)
    if (error) throw error
    const claimed = count ?? 0
    const remaining = Math.max(0, MONTHLY_CAP - claimed)
    return NextResponse.json({ claimed, remaining, cap: MONTHLY_CAP })
  } catch (err) {
    console.error("[scan-count] failed:", err instanceof Error ? err.message : err)
    return NextResponse.json({ claimed: 0, remaining: MONTHLY_CAP, cap: MONTHLY_CAP })
  }
}
