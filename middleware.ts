import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const APEX_HOST = "justprotected.com"

/**
 * Permanent redirects for the production host only.
 * Localhost and preview hosts are left untouched so `next start` and previews keep working over http.
 * Vercel also redirects http→https at the edge for domains it terminates; this covers www→apex
 * and any request that still reaches the app as http on the production host.
 */
export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || ""
  const hostname = hostHeader.split(":")[0].toLowerCase()
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const proto = (forwardedProto || request.nextUrl.protocol.replace(":", "")).split(",")[0].trim()

  const isWww = hostname === `www.${APEX_HOST}`
  const isApex = hostname === APEX_HOST

  if (!isWww && !isApex) {
    return NextResponse.next()
  }

  if (isWww || proto === "http") {
    const url = request.nextUrl.clone()
    url.protocol = "https:"
    url.hostname = APEX_HOST
    url.port = ""
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)"],
}
