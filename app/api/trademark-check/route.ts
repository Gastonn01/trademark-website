import { NextResponse } from "next/server"
import { runIdentityCheck } from "@/lib/identity-check"
import { classesForCategory } from "@/lib/nice-classes"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: Request) {
  let name = ""
  let category: string | undefined
  try {
    const body = await req.json()
    name = (body?.name || "").toString().slice(0, 80)
    category = body?.category ? String(body.category) : undefined
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
  if (!name.trim()) {
    return NextResponse.json({ error: "Please enter a name." }, { status: 400 })
  }

  const classes = classesForCategory(category)
  const findings = await runIdentityCheck(name, classes.length ? { classes } : undefined)
  return NextResponse.json(findings.legacy)
}
