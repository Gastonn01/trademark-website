import { FUNNEL_PATH, isAudience } from "@/lib/funnel"

export const NAME_CHECK_EMAIL_INTENT = "name-check-email"
const STORAGE_KEY = "jp-name-check-lead"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type NameCheckLead = {
  email: string
  name: string
  audience: string
  at: string
}

export function isValidEmail(value: string) {
  const email = value.trim()
  return email.length <= 254 && EMAIL_PATTERN.test(email)
}

export function readNameCheckLead(): NameCheckLead | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as NameCheckLead
    if (!parsed || !isValidEmail(parsed.email || "") || !parsed.name?.trim()) return null
    return parsed
  } catch {
    return null
  }
}

export function writeNameCheckLead(lead: NameCheckLead) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead))
}

export function namesMatch(left: string, right: string) {
  return left.trim().toLowerCase() === right.trim().toLowerCase()
}

export function leadForName(name: string) {
  const lead = readNameCheckLead()
  if (!lead || !name.trim() || !namesMatch(lead.name, name)) return null
  return lead
}

export function nameCheckSearch(params: {
  q?: string | null
  audience?: string | null
  from?: string | null
  lang?: string | null
}) {
  const search = new URLSearchParams()
  const q = params.q?.trim().slice(0, 80)
  if (q) search.set("q", q)
  if (isAudience(params.audience)) search.set("audience", params.audience)
  if (params.from && params.from.startsWith("/") && params.from.length <= 200) search.set("from", params.from)
  if (params.lang === "es") search.set("lang", "es")
  const query = search.toString()
  return query ? `?${query}` : ""
}

export function nameCheckEmailHref(params: {
  q?: string | null
  audience?: string | null
  from?: string | null
  lang?: string | null
}) {
  return `${FUNNEL_PATH.nameCheckEmail}${nameCheckSearch(params)}`
}

export function nameCheckDetailsHref(params: {
  q?: string | null
  audience?: string | null
  from?: string | null
  lang?: string | null
}) {
  return `${FUNNEL_PATH.nameCheckDetails}${nameCheckSearch(params)}`
}
