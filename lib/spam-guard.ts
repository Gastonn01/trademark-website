// Lightweight bot/spam defenses for public form submissions.
//
// Confirmed abuse pattern (2026-07-31, 3 submissions in one day): random
// mixed-case alphanumeric junk in every free-text field, dot-trick Gmail
// addresses (a.b.c@gmail.com == abc@gmail.com, used to fake "unique"
// senders past naive dedup). Each of these burns real API budget
// (EUIPO/USPTO/Gemini/Apify) for nothing, so this rejects them up front,
// before any of that runs.

const USAGE_STORE_ID = "yE2H6rgwPWINTE8ke" // just-protected-usage key-value store (shared with identity-check.ts)

export function isHoneypotTripped(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0
  // A file dropped into the honeypot is just as non-human as typed text.
  if (typeof File !== "undefined" && value instanceof File) return value.size > 0
  return false
}

const MIN_SUBMISSION_MS = 3000
const MAX_SUBMISSION_AGE_MS = 90 * 24 * 60 * 60 * 1000

// Pages send the time the form rendered. Anything quicker than a few seconds
// is a bot. Missing, empty, or nonsense timestamps count too: the real forms
// always include one, and a direct post to the API does not. A value of 0
// (or any other ancient time) is not a render timestamp.
export function isSubmittedTooFast(value: unknown, now = Date.now(), minMs = MIN_SUBMISSION_MS): boolean {
  let started = Number.NaN
  if (typeof value === "number" && Number.isFinite(value)) started = value
  else if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim())) started = Number(value.trim())
  if (!Number.isFinite(started)) return true
  const elapsed = now - started
  if (elapsed > MAX_SUBMISSION_AGE_MS) return true
  return elapsed < minMs
}

export type SpamDropReason = "honeypot" | "too-fast" | "heuristic"

export function submissionSpamReason(hp: unknown, startedAt: unknown, now = Date.now()): SpamDropReason | null {
  if (isHoneypotTripped(hp)) return "honeypot"
  if (isSubmittedTooFast(startedAt, now)) return "too-fast"
  return null
}

function letterVowelRatio(token: string): number {
  const letters = token.replace(/[^a-zA-Z]/g, "")
  if (letters.length === 0) return 1
  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length
  return vowels / letters.length
}

function isConsonantSoup(token: string): boolean {
  // Long enough that ordinary given names and surnames ("Smith", "Clark")
  // fall through, and vowel-light enough to skip normal words.
  return token.length >= 6 && /^[A-Za-z]+$/.test(token) && letterVowelRatio(token) < 0.25
}

// Contact-form pattern from the bot mail: a single random subject token, a
// one- or two-word consonant-soup name (for example "Attcvr Mtyywaajn"), and
// a message that is only digits. All three have to match. A normal name, a
// subject with spaces, or a message with any words is left alone.
export function looksLikeAutomatedContact(input: {
  name?: unknown
  subject?: unknown
  message?: unknown
}): boolean {
  const message = typeof input.message === "string" ? input.message.trim() : ""
  const subject = typeof input.subject === "string" ? input.subject.trim() : ""
  const name = typeof input.name === "string" ? input.name.trim() : ""

  if (!/^\d{5,}$/.test(message)) return false
  if (!/^[A-Za-z0-9]{8,}$/.test(subject)) return false

  const subjectLetters = subject.replace(/[^A-Za-z]/g, "")
  const internalCaps = /[a-z]/.test(subject) && /[A-Z]/.test(subject.slice(1))
  const subjectRandom =
    letterVowelRatio(subjectLetters) < 0.15 ||
    (subject.length >= 12 && internalCaps && letterVowelRatio(subjectLetters) < 0.4)
  if (!subjectRandom) return false

  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length < 1 || parts.length > 2) return false
  return parts.every((part) => isConsonantSoup(part))
}

// Bot-generated field values are typically long, mixed-case, vowel-less
// runs of letters with no spaces — real brand/product names almost always
// have a normal vowel ratio or contain a space.
export function looksLikeGibberish(text: string): boolean {
  const t = text.trim()
  if (t.length < 8 || t.includes(" ")) return false
  const letters = t.replace(/[^a-zA-Z]/g, "")
  if (letters.length < 8) return false
  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length
  const hasMixedCase = /[a-z]/.test(t) && /[A-Z]/.test(t)
  return hasMixedCase && vowels / letters.length < 0.2
}

export async function withinSubmissionRateLimit(ip: string, cap: number): Promise<boolean> {
  const token = process.env.APIFY_API_TOKEN
  if (!token || !ip) return true // fail open — don't block real users if this check itself is unavailable
  const key = `submit_${ip.replace(/[^a-zA-Z0-9.:]/g, "")}_${new Date().toISOString().slice(0, 10)}`
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
    console.error("[spam-guard] rate limit check failed:", err instanceof Error ? err.message : err)
    return true // fail open
  }
}
