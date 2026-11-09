// Lightweight bot/spam defenses for public form submissions.
//
// Confirmed abuse pattern (2026-07-31, 3 submissions in one day): random
// mixed-case alphanumeric junk in every free-text field, dot-trick Gmail
// addresses (a.b.c@gmail.com == abc@gmail.com, used to fake "unique"
// senders past naive dedup). Each of these burns real API budget
// (EUIPO/USPTO/Gemini/Apify) for nothing, so this rejects them up front,
// before any of that runs.

const USAGE_STORE_ID = "yE2H6rgwPWINTE8ke" // just-protected-usage key-value store (shared with identity-check.ts)

export function isHoneypotTripped(value: FormDataEntryValue | null): boolean {
  return typeof value === "string" && value.trim().length > 0
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
