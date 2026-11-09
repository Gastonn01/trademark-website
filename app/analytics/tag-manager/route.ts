import { NextRequest, NextResponse } from "next/server"
import { ANALYTICS_EXCLUSION_COOKIE } from "@/lib/analytics-preference"

export function GET(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" }
  if (request.cookies.get(ANALYTICS_EXCLUSION_COOKIE)?.value === "1") {
    return new NextResponse(null, { status: 204, headers })
  }
  const response = NextResponse.redirect("https://www.googletagmanager.com/ns.html?id=GTM-5DDZ4XHV", 307)
  for (const [key, value] of Object.entries(headers)) response.headers.set(key, value)
  return response
}
