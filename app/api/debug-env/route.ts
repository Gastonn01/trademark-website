import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseEnvVars = Object.keys(process.env)
      .filter((key) => key.includes("SUPABASE"))
      .reduce(
        (acc, key) => {
          // Only show first 10 characters for security
          acc[key] = process.env[key] ? process.env[key]!.substring(0, 10) + "..." : "undefined"
          return acc
        },
        {} as Record<string, string>,
      )

    return NextResponse.json({
      supabaseEnvVars,
      totalEnvVars: Object.keys(process.env).length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
