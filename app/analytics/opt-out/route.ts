import { NextRequest, NextResponse } from "next/server"
import { ANALYTICS_EXCLUSION_COOKIE } from "@/lib/analytics-preference"

export function GET(request: NextRequest) {
  const response = new NextResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Visits excluded | Just Protected</title></head><body style="margin:0;padding:64px 24px;background:#0a1a36;color:#fff;font:18px/1.6 system-ui"><main style="max-width:620px;margin:auto"><h1>Your visits are excluded.</h1><p>This browser will no longer send visits or events to Google Tag Manager or Vercel Analytics on Just Protected.</p><p>The setting lasts one year unless you clear your cookies. Open this link on each browser or device you use. Previous visits remain in historical reports.</p><a href="/" style="color:#d8b774">Return to Just Protected</a></main></body></html>`, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  })
  const hostname = request.nextUrl.hostname
  response.cookies.set(ANALYTICS_EXCLUSION_COOKIE, "1", {
    path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    ...(hostname === "justprotected.com" || hostname.endsWith(".justprotected.com") ? { domain: "justprotected.com" } : {}),
  })
  return response
}
