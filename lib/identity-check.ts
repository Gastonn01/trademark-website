import { generateText } from "ai"

// ---- Shared identity/trademark-check engine ----
// Used by both /api/trademark-check (the on-site instant widget) and the
// Clone Scan report email (submit-free-search). Runs EUIPO + USPTO + web
// presence in parallel and returns the raw structured findings from each,
// so callers can either flatten it into a short verdict (the widget) or
// render a full multi-section report (the email) from the same real data.

export const GOOGLE_DAILY_CALL_CAP = 1000 // 1000 * $0.0005 = $0.50/day ceiling
const USAGE_STORE_ID = "yE2H6rgwPWINTE8ke" // just-protected-usage key-value store

export type GooglePresence = { checked: boolean; recognizedEntity: boolean | null; topResults: number }
export type WebPresence = {
  domain: { slug: string; taken: boolean | null }
  instagram: { taken: boolean | null }
  youtube: { taken: boolean | null }
  google: GooglePresence | null
}

export type CheckResult = {
  name: string
  status: "conflict" | "clear" | "weak"
  message: string
  detail: string
  source: "live" | "preliminary"
  disclaimer: string
  webPresence?: WebPresence
}

export type RegistryHit = { name: string; office: string; status: string; classes: number[] }
export type EuipoFindings = {
  checked: boolean
  exact: RegistryHit[]
  totalRelated: number
  classes: number[]
  offices: string
}
export type UsptoFindings = { checked: boolean; exact: RegistryHit[]; exactCount: number; totalRelated: number }
// Per-registry read on whether any exact-match hit falls in the classes the
// requester actually operates in — null when no category was supplied, so
// callers can tell "not relevant" apart from "checked, no overlap".
export type CategoryOverlap = { classes: number[]; euipo: boolean | null; uspto: boolean | null }
export type AiFindings = { checked: boolean; verdict: "conflict" | "clear" | null; match: string | null; reason: string | null }

// Full structured findings — the report's source of truth.
export type IdentityFindings = {
  name: string
  euipo: EuipoFindings
  uspto: UsptoFindings
  ai: AiFindings
  webPresence: WebPresence
  known: boolean
  // null when the caller didn't supply a business category.
  category: CategoryOverlap | null
  // Same shape the on-site widget has always returned, derived from the above.
  legacy: CheckResult
}

async function withinDailyBudget(service: string, cap: number, token: string): Promise<boolean> {
  const key = `${service}_${new Date().toISOString().slice(0, 10)}` // UTC date
  const url = `https://api.apify.com/v2/key-value-stores/${USAGE_STORE_ID}/records/${key}?token=${token}`
  try {
    const getRes = await fetch(url, { signal: AbortSignal.timeout(5000) })
    const current: number = getRes.ok ? Number((await getRes.json())?.count ?? 0) : 0
    if (current >= cap) return false
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: current + 1 }),
      signal: AbortSignal.timeout(5000),
    })
    return true
  } catch (err) {
    console.error("[budget] check failed:", err instanceof Error ? err.message : err)
    return false // fail closed: any error, no spend
  }
}

// This SERP actor never returns a knowledge-panel field, so "recognized
// entity" is inferred from real signals available in the payload instead:
// an official-looking top result with sitelinks (Google only expands
// sitelinks for established/branded sites), or a Wikipedia entry in the
// top 3 (a decent proxy for "this is a known name", not just a domain).
function hasRecognizedEntitySignal(results: any[], slug: string): boolean {
  if (!Array.isArray(results) || results.length === 0 || !slug) return false
  const top = results[0]
  let topHost = ""
  try {
    topHost = new URL(String(top?.url ?? "")).hostname.replace(/^www\./, "")
  } catch {
    // ignore malformed URL
  }
  const topIsBrandSiteWithSitelinks = topHost.includes(slug) && Array.isArray(top?.sitelinks) && top.sitelinks.length > 0
  const hasWikipedia = results.slice(0, 3).some((r) => /wikipedia\.org/i.test(String(r?.url ?? "")))
  return topIsBrandSiteWithSitelinks || hasWikipedia
}

async function checkGooglePresence(name: string): Promise<GooglePresence | null> {
  const token = process.env.APIFY_API_TOKEN
  if (!token) return null
  const underCap = await withinDailyBudget("google_serp", GOOGLE_DAILY_CALL_CAP, token)
  if (!underCap) {
    console.error("[google-presence] daily budget cap reached, skipping")
    return null
  }
  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/scraperlink~google-search-results-serp-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: name, limit: "10" }),
        signal: AbortSignal.timeout(15000),
      },
    )
    if (!res.ok) {
      console.error("[google-presence] Apify error:", res.status, (await res.text()).slice(0, 200))
      return null
    }
    const rows = await res.json()
    const first = Array.isArray(rows) ? rows[0] : null
    if (!first) return { checked: true, recognizedEntity: null, topResults: 0 }
    const results: any[] = Array.isArray(first.results) ? first.results : []
    return {
      checked: true,
      recognizedEntity: hasRecognizedEntitySignal(results, slugify(name)),
      topResults: results.length,
    }
  } catch (err) {
    console.error("[google-presence] failed:", err instanceof Error ? err.message : err)
    return null
  }
}

const WELL_KNOWN = new Set(
  [
    "nike","apple","google","amazon","coca cola","cocacola","coke","pepsi","adidas","puma",
    "gucci","prada","chanel","rolex","tesla","microsoft","meta","facebook","instagram","tiktok",
    "youtube","netflix","disney","starbucks","mcdonalds","spotify","samsung","sony","mrbeast",
    "red bull","redbull","louis vuitton","supreme","balenciaga","ferrari","lamborghini","bmw",
    "audi","mercedes","uber","airbnb","paypal","visa","mastercard","intel","nvidia","openai",
    "chatgpt","stanley","hermes","north face","jordan","yeezy","fenty","kardashian","drake",
  ].map((s) => s.toLowerCase()),
)

function slugify(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "")
}
function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "")
}

async function checkDomain(slug: string): Promise<boolean | null> {
  if (!slug) return null
  try {
    const res = await fetch(`https://rdap.verisign.com/com/v1/domain/${slug}.com`, { signal: AbortSignal.timeout(6000) })
    if (res.status === 404) return false
    if (res.status === 200) return true
    return null
  } catch {
    return null
  }
}

async function checkYouTube(slug: string): Promise<boolean | null> {
  if (!slug) return null
  try {
    const res = await fetch(`https://www.youtube.com/@${slug}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(6000),
    })
    if (res.status === 404) return false
    if (res.status === 200) return true
    return null
  } catch {
    return null
  }
}

// Verified 2026-07: Instagram serves Vercel's datacenter IPs a generic
// logged-out shell (never the real profile), regardless of headers — IP-
// reputation bot detection, not fixable without residential proxies
// impersonating a visitor, which we won't do. Always "unknown".
async function checkInstagram(_slug: string): Promise<boolean | null> {
  return null
}

async function checkWebPresence(name: string): Promise<WebPresence> {
  const slug = slugify(name)
  const [domain, instagram, youtube, google] = await Promise.all([
    checkDomain(slug),
    checkInstagram(slug),
    checkYouTube(slug),
    checkGooglePresence(name),
  ])
  return { domain: { slug, taken: domain }, instagram: { taken: instagram }, youtube: { taken: youtube }, google }
}

async function usptoSearch(key: string, query: string): Promise<any[]> {
  const res = await fetch(`https://uspto-trademark.p.rapidapi.com/v1/trademarkSearch/${encodeURIComponent(query)}/active`, {
    headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": "uspto-trademark.p.rapidapi.com" },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) {
    console.error("[uspto] search error:", res.status, (await res.text()).slice(0, 150))
    return []
  }
  const data = await res.json()
  return Array.isArray(data?.items) ? data.items : []
}

function usptoClasses(item: any): number[] {
  const rows: any[] = Array.isArray(item?.classification) ? item.classification : []
  return [...new Set(rows.map((r) => Number(r?.international_code)).filter((c) => Number.isFinite(c)))].sort(
    (a, b) => a - b,
  )
}

async function checkUspto(name: string): Promise<UsptoFindings> {
  const key = process.env.RAPIDAPI_USPTO_KEY
  if (!key) return { checked: false, exact: [], exactCount: 0, totalRelated: 0 }
  try {
    const trimmed = name.trim()
    const bare = trimmed.replace(/'/g, "")
    // This API's search is a literal prefix match, so it can't cross an
    // apostrophe: querying "lays" will never surface "LAY'S". Possessive
    // brand names (Lay's, Kellogg's, Hershey's...) are common enough to be
    // worth a second query on the name minus its trailing "s".
    const queries = new Set([trimmed])
    if (/s$/i.test(bare) && bare.length > 2) queries.add(bare.slice(0, -1))

    const seen = new Map<string, any>()
    for (const q of queries) {
      for (const item of await usptoSearch(key, q)) {
        seen.set(`${item?.keyword}|${item?.serial_number}`, item)
      }
    }
    const items = [...seen.values()]
    const totalRelated = items.length
    const lowNorm = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "")
    const exact = items
      .filter(
        (t) =>
          String(t?.keyword ?? "").toLowerCase().replace(/[^a-z0-9]/g, "") === lowNorm &&
          String(t?.status_label ?? "").startsWith("Live"),
      )
      .map((t) => ({ name: String(t?.keyword ?? ""), office: "US", status: String(t?.status_label ?? ""), classes: usptoClasses(t) }))
    return { checked: true, exact, exactCount: exact.length, totalRelated }
  } catch (err) {
    console.error("[uspto] search failed:", err instanceof Error ? err.message : err)
    return { checked: false, exact: [], exactCount: 0, totalRelated: 0 }
  }
}

const LIVE_STATUSES = new Set([
  "received", "under_examination", "application_published", "registration_pending",
  "registered", "opposition_pending", "appealed", "appealable",
  "start_of_opposition_period", "acceptance_pending", "accepted",
])

let euipoToken: { value: string; exp: number } | null = null

async function getEuipoToken(): Promise<string | null> {
  const id = process.env.EUIPO_CLIENT_ID
  const secret = process.env.EUIPO_CLIENT_SECRET
  if (!id || !secret) return null
  const now = Date.now()
  if (euipoToken && euipoToken.exp > now + 60_000) return euipoToken.value
  const tokenUrl = process.env.EUIPO_TOKEN_URL || "https://auth-sandbox.euipo.europa.eu/oidc/accessToken"
  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
        Accept: "application/json",
      },
      body: "grant_type=client_credentials&scope=uid",
      signal: AbortSignal.timeout(9000),
    })
    if (!res.ok) {
      console.error("[euipo] token error:", res.status, (await res.text()).slice(0, 200))
      return null
    }
    const data = await res.json()
    const tok = data?.access_token
    if (!tok) return null
    euipoToken = { value: tok, exp: now + Number(data?.expires_in ?? 3600) * 1000 }
    return tok
  } catch (err) {
    console.error("[euipo] token failed:", err instanceof Error ? err.message : err)
    return null
  }
}

function rsqlQuote(s: string) {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

function toHits(rows: any[]): RegistryHit[] {
  return rows.map((t) => ({
    name: String(t?.wordMarkSpecification?.verbalElement ?? ""),
    office: String(t?.applicants?.[0]?.office ?? "EM"),
    status: String(t?.status ?? ""),
    classes: Array.isArray(t?.niceClasses) ? t.niceClasses.filter((c: any) => Number.isFinite(c)) : [],
  }))
}

async function euipoFetch(token: string, id: string, rsql: string): Promise<{ rows: any[]; total: number } | null> {
  const base = process.env.EUIPO_SEARCH_URL || "https://api-sandbox.euipo.europa.eu/trademark-search/trademarks"
  const url = `${base}?query=${encodeURIComponent(rsql)}&size=25`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "X-IBM-Client-Id": id, Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) {
    console.error("[euipo] search error:", res.status, (await res.text()).slice(0, 300))
    return null
  }
  const data = await res.json()
  const rows: any[] = Array.isArray(data?.trademarks) ? data.trademarks : []
  return { rows, total: Number(data?.totalElements ?? rows.length) }
}

function officesSummary(hits: RegistryHit[]): string {
  const byOffice = new Map<string, number>()
  for (const h of hits) byOffice.set(h.office || "EM", (byOffice.get(h.office || "EM") ?? 0) + 1)
  return [...byOffice.entries()].map(([o, c]) => (c > 1 ? `${o} (${c})` : o)).join(", ")
}

async function checkEuipo(name: string): Promise<EuipoFindings> {
  const id = process.env.EUIPO_CLIENT_ID
  const token = await getEuipoToken()
  if (!token || !id) return { checked: false, exact: [], totalRelated: 0, classes: [], offices: "" }
  const n = name.trim()
  try {
    const exactHit = await euipoFetch(token, id, `wordMarkSpecification.verbalElement==${rsqlQuote(n)}`)
    const exact = exactHit ? toHits(exactHit.rows).filter((m) => !m.status || LIVE_STATUSES.has(m.status.toLowerCase())) : []
    if (exact.length > 0) {
      const classes = [...new Set(exact.flatMap((h) => h.classes))].sort((a, b) => a - b)
      return { checked: true, exact, totalRelated: exactHit?.total ?? exact.length, classes, offices: officesSummary(exact) }
    }
    const cleaned = n.replace(/["\\]/g, "")
    const wildHit = await euipoFetch(token, id, `wordMarkSpecification.verbalElement==*${cleaned}*`)
    return { checked: true, exact: [], totalRelated: wildHit?.total ?? 0, classes: [], offices: "" }
  } catch (err) {
    console.error("[euipo] search failed:", err instanceof Error ? err.message : err)
    return { checked: false, exact: [], totalRelated: 0, classes: [], offices: "" }
  }
}

const SCREEN_SYSTEM = `You are a trademark screening assistant. Given a proposed brand name, assess whether it matches or is confusingly similar to any existing well-known brand, company, artist name, product line, or registered trademark you know of (worldwide, any industry).

Respond with STRICT JSON only, no markdown fences, exactly this shape:
{"verdict":"conflict"|"likely_clear","match":"<the existing brand it clashes with, or null>","reason":"<one sentence, plain English, no legal advice>"}

Rules:
- "conflict" if the name is identical or confusingly similar (spelling, sound, or obvious variation) to a brand you recognize.
- "likely_clear" if you do not recognize it as an existing brand. Never guarantee availability.
- Judge the name as a whole; generic dictionary words alone (e.g. "Sunrise Bakery") are "likely_clear" unless they collide with a famous mark.`

async function askModel(name: string, registryNote?: string): Promise<string | null> {
  const prompt = `Proposed brand name: "${name}"${registryNote ? `\n\nOfficial registry search context: ${registryNote}` : ""}`
  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    for (const model of ["gemini-2.5-flash-lite", "gemini-2.5-flash"]) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SCREEN_SYSTEM }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0, maxOutputTokens: 500, responseMimeType: "application/json" },
          }),
          signal: AbortSignal.timeout(10000),
        })
        if (res.ok) {
          const data = await res.json()
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (typeof text === "string" && text.trim()) return text
        } else {
          console.error(`[identity-check] Gemini ${model} error:`, res.status, (await res.text()).slice(0, 200))
        }
      } catch (err) {
        console.error(`[identity-check] Gemini ${model} failed:`, err instanceof Error ? err.message : err)
      }
    }
  }
  const { text } = await generateText({ model: "openai/gpt-4o-mini", system: SCREEN_SYSTEM, prompt, maxOutputTokens: 150, temperature: 0 })
  return text
}

async function checkAi(name: string, registryNote?: string): Promise<AiFindings> {
  try {
    const text = await askModel(name, registryNote)
    if (!text) return { checked: false, verdict: null, match: null, reason: null }
    // Gemini occasionally emits more than one JSON object in the response
    // despite responseMimeType: application/json. A greedy first-{-to-last-}
    // regex would splice separate objects together into invalid JSON, so
    // extract only the first *balanced* {...} block via brace counting.
    const stripped = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()
    const start = stripped.indexOf("{")
    if (start === -1) return { checked: false, verdict: null, match: null, reason: null }
    let depth = 0, end = -1
    for (let i = start; i < stripped.length; i++) {
      if (stripped[i] === "{") depth++
      else if (stripped[i] === "}") {
        depth--
        if (depth === 0) { end = i; break }
      }
    }
    if (end === -1) return { checked: false, verdict: null, match: null, reason: null }
    const parsed = JSON.parse(stripped.slice(start, end + 1)) as { verdict?: string; match?: string | null; reason?: string }
    if (parsed.verdict === "conflict") return { checked: true, verdict: "conflict", match: parsed.match ?? null, reason: parsed.reason ?? null }
    if (parsed.verdict === "likely_clear") return { checked: true, verdict: "clear", match: null, reason: parsed.reason ?? null }
    return { checked: false, verdict: null, match: null, reason: null }
  } catch (err) {
    console.error("[identity-check] AI screen failed:", err instanceof Error ? err.message : err)
    return { checked: false, verdict: null, match: null, reason: null }
  }
}

const REGISTRY_DISCLAIMER =
  "Live search of the official EU trademark register (EUIPO), including international registrations designating the EU. Preliminary only — a full attorney clearance search confirms availability."

function buildLegacy(name: string, known: boolean, euipo: EuipoFindings, uspto: UsptoFindings, ai: AiFindings): CheckResult {
  if (known) {
    return {
      name,
      status: "conflict",
      message: `"${name}" appears to be an existing registered brand.`,
      detail:
        "This name matches a well-known registered trademark. Filing an identical or confusingly similar mark would almost certainly be refused — and could expose you to infringement claims.",
      source: "preliminary",
      disclaimer: "Preliminary check only — not a legal opinion. A full attorney search confirms availability.",
    }
  }
  if (euipo.exact.length > 0) {
    return {
      name,
      status: "conflict",
      message: `"${name}" is already on the EU trademark register.`,
      detail: `We found ${euipo.exact.length} live EU filing${euipo.exact.length === 1 ? "" : "s"} for exactly this name (${euipo.offices})${euipo.classes.length ? `, registered in ${euipo.classes.length} of the 45 trademark classes` : ""}. That doesn't automatically block you — trademarks are class-specific, so it may still be available in your category. And if this is your own name, you may be able to oppose or cancel the filing.`,
      source: "live",
      disclaimer: REGISTRY_DISCLAIMER,
    }
  }
  if (uspto.exactCount > 0) {
    return {
      name,
      status: "conflict",
      message: `"${name}" is already on the US trademark register.`,
      detail: `We found ${uspto.exactCount} live USPTO registration${uspto.exactCount === 1 ? "" : "s"} for exactly this name, among ${uspto.totalRelated} related active US marks. That doesn't automatically block you — trademarks are class-specific, so it may still be available in your category. And if this is your own name, you may be able to oppose or cancel the filing.`,
      source: "live",
      disclaimer: "Live search of the official US register (USPTO). Preliminary only — a full attorney clearance search confirms availability.",
    }
  }
  if (ai.verdict === "conflict") {
    return {
      name,
      status: "conflict",
      message: `"${name}" clashes with an existing brand${ai.match ? `: ${ai.match}` : ""}.`,
      detail: `${ai.reason || "This name appears identical or confusingly similar to an existing brand."} Filing an identical or confusingly similar mark is likely to be refused — and could expose you to infringement claims.`,
      source: "preliminary",
      disclaimer: "AI-assisted preliminary screen — not a legal opinion. A full attorney search confirms availability.",
    }
  }
  const euipoClean = euipo.checked && euipo.totalRelated === 0
  return {
    name,
    status: "clear",
    message: `No obvious conflict found for "${name}".`,
    detail: euipoClean
      ? "The official EU trademark register (EUIPO) returned zero records for this name, and our AI screen found no confusingly similar famous mark. A strong start — a full attorney search across all classes and countries confirms it."
      : `${ai.reason || "Our instant scan didn't flag a well-known clash"} — a promising start. Only a full attorney search across all classes and countries can confirm it's truly available to register.`,
    source: euipoClean ? "live" : "preliminary",
    disclaimer: euipoClean ? REGISTRY_DISCLAIMER : "Preliminary check only — not a legal opinion. Run a full free search to be sure.",
  }
}

// Runs every check in parallel (registries + web presence), independent of
// which one ultimately drives the verdict, so callers needing the full
// picture (the report email) get real EUIPO + USPTO + web data together —
// not just whichever check happened to answer first.
export async function runIdentityCheck(name: string, opts?: { classes?: number[] }): Promise<IdentityFindings> {
  const n = normalize(name)
  const known = WELL_KNOWN.has(n) || [...WELL_KNOWN].some((k) => k.length > 4 && n.includes(k))

  const [euipo, uspto, webPresence] = await Promise.all([
    known ? Promise.resolve({ checked: false, exact: [], totalRelated: 0, classes: [], offices: "" } as EuipoFindings) : checkEuipo(name),
    known ? Promise.resolve({ checked: false, exact: [], exactCount: 0, totalRelated: 0 } as UsptoFindings) : checkUspto(name),
    checkWebPresence(name),
  ])

  const targetClasses = opts?.classes ?? []
  const category: CategoryOverlap | null =
    targetClasses.length === 0
      ? null
      : {
          classes: targetClasses,
          euipo: euipo.exact.length === 0 ? null : euipo.exact.some((h) => h.classes.some((c) => targetClasses.includes(c))),
          uspto: uspto.exact.length === 0 ? null : uspto.exact.some((h) => h.classes.some((c) => targetClasses.includes(c))),
        }

  let ai: AiFindings = { checked: false, verdict: null, match: null, reason: null }
  if (!known && euipo.exact.length === 0 && uspto.exactCount === 0) {
    let registryNote: string | undefined
    if (euipo.checked && euipo.totalRelated > 0) {
      registryNote = `The official EU register (EUIPO) has no identical live mark, but ${euipo.totalRelated.toLocaleString()} related record(s) exist. Weigh whether the proposed name is confusingly similar to any of these or to famous marks.`
    } else if (euipo.checked) {
      registryNote = `The official EU register (EUIPO) returned zero records containing this name. Still check for phonetic or misspelling similarity to famous marks worldwide.`
    }
    if (uspto.checked && uspto.exactCount === 0) {
      registryNote = `${registryNote ?? ""} A live USPTO search also found no active identical US mark.`.trim()
    }
    ai = await checkAi(name, registryNote)
  }

  const legacy = buildLegacy(name, known, euipo, uspto, ai)
  legacy.webPresence = webPresence

  return { name, euipo, uspto, ai, webPresence, known, category, legacy }
}
