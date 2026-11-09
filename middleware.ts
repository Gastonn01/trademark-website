import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const APEX_HOST = "justprotected.com"

/** Weaker duplicate guides. The stronger page stays; this path returns 301. */
const LEGACY_BLOG: Record<string, string> = {
  "/blog/register-trademark-european-union": "/blog/register-trademark-eu",
  "/blog/trademark-registration-china": "/blog/register-trademark-china",
  "/blog/trademark-registration-united-kingdom": "/blog/register-trademark-united-kingdom",
  "/blog/trademark-registration-germany": "/blog/register-trademark-germany",
  "/blog/trademark-registration-india": "/blog/register-trademark-india",
}

/**
 * www → apex is a 308 on the production host only.
 * Localhost and preview hosts are left on their own host so previews keep working.
 * Duplicate blog paths 301 on every host, including previews.
 */
export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || ""
  const hostname = hostHeader.split(":")[0].toLowerCase()
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const proto = (forwardedProto || request.nextUrl.protocol.replace(":", "")).split(",")[0].trim()

  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/"
  const legacyTarget = LEGACY_BLOG[pathname]

  const isWww = hostname === `www.${APEX_HOST}`
  const isApex = hostname === APEX_HOST
  const needsHostCanonical = (isWww || isApex) && (isWww || proto === "http")

  if (!legacyTarget && !needsHostCanonical) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  if (needsHostCanonical) {
    url.protocol = "https:"
    url.hostname = APEX_HOST
    url.port = ""
  }
  if (legacyTarget) {
    url.pathname = legacyTarget
  }

  // A duplicate guide is a content move (301). Host canonicalisation alone is 308.
  const status = legacyTarget ? 301 : 308
  return NextResponse.redirect(url, status)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|txt|xml|woff2?)$).*)"],
}
