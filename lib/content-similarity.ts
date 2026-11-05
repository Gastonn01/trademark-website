// Content-duplication spot check for the Clone Scan report.
//
// Different shape from the trademark/registry checks: instead of searching
// broadly for "who might be copying this brand", we start from the
// requester's OWN YouTube channel (given directly in the form), pull a
// couple of their recent video transcripts, extract a few distinctive
// sentences (not generic niche language — two skincare channels both saying
// "use SPF daily" isn't plagiarism), and search YouTube for near-verbatim
// use of those exact phrases elsewhere.
//
// This is a lightweight spot check, not an exhaustive scan: it only looks
// at a handful of recent videos and phrases, and a miss doesn't mean
// nothing exists. Matches are reported as "worth a look", never as an
// automated accusation — the same caution applied to impersonation/fake
// accounts elsewhere in this report.

export type ContentMatch = {
  matchedPhrase: string
  videoTitle: string
  channelTitle: string
  videoUrl: string
  channelUrl: string
}

export type ContentSimilarityFindings = {
  checked: boolean
  ownChannelFound: boolean
  videosScanned: number
  matches: ContentMatch[]
}

const EMPTY: ContentSimilarityFindings = { checked: false, ownChannelFound: false, videosScanned: 0, matches: [] }

function handleFromInput(input: string): string {
  const trimmed = input.trim()
  const m = trimmed.match(/youtube\.com\/(@[\w.-]+)/i)
  if (m) return m[1]
  return trimmed.startsWith("@") ? trimmed : `@${trimmed.replace(/^@/, "")}`
}

async function resolveChannelId(handle: string, key: string): Promise<{ id: string; title: string } | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${encodeURIComponent(handle)}&key=${key}`,
    { signal: AbortSignal.timeout(8000) },
  )
  if (!res.ok) return null
  const data = await res.json()
  const item = data?.items?.[0]
  if (!item?.id) return null
  return { id: item.id, title: item.snippet?.title ?? handle }
}

async function getRecentVideos(channelId: string, key: string, max: number): Promise<{ id: string; title: string }[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=${max}&type=video&key=${key}`,
    { signal: AbortSignal.timeout(8000) },
  )
  if (!res.ok) return []
  const data = await res.json()
  const items: any[] = Array.isArray(data?.items) ? data.items : []
  return items.map((it) => ({ id: it?.id?.videoId, title: it?.snippet?.title ?? "" })).filter((v) => v.id)
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

// YouTube blocks caption scraping (the timedtext endpoint, the watch-page
// player response) from datacenter IPs — confirmed directly: fetching a
// real video's watch page from this environment got redirected to Google's
// "unusual traffic" block page, the same bot-detection wall already hit
// with Instagram elsewhere in this project. Routed through Apify instead
// (same vendor already used for the Google-presence check), which handles
// IP reputation on its own infrastructure.
async function fetchTranscript(videoId: string): Promise<string | null> {
  const token = process.env.APIFY_API_TOKEN
  if (!token) return null
  try {
    const res = await fetch(`https://api.apify.com/v2/acts/karamelo~youtube-transcripts/run-sync-get-dataset-items?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        urls: [`https://www.youtube.com/watch?v=${videoId}`],
        outputFormat: "singleStringText",
      }),
      signal: AbortSignal.timeout(25000),
    })
    if (!res.ok) {
      console.error("[content-similarity] Apify transcript error:", res.status, (await res.text()).slice(0, 200))
      return null
    }
    const rows = await res.json()
    const first = Array.isArray(rows) ? rows[0] : null
    const text = first?.captions
    if (typeof text !== "string" || !text.trim()) return null
    // Auto-captions come as short overlapping fragments glued with raw
    // newlines, not prose — collapse to single-spaced text before trying to
    // split it into sentences, or "sentences" end up being multi-line
    // fragments that never occur verbatim anywhere else.
    return decodeHtmlEntities(text.replace(/\s+/g, " ")).trim()
  } catch (err) {
    console.error("[content-similarity] transcript fetch failed:", err instanceof Error ? err.message : err)
    return null
  }
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim()
}

// Picks a couple of longer, more specific sentences instead of short/common
// ones — a crude but effective proxy for "distinctive" without needing NLP.
function extractDistinctivePhrases(transcript: string, count: number): string[] {
  const sentences = transcript
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 45 && s.length <= 140)
  const sorted = [...new Set(sentences)].sort((a, b) => b.length - a.length)
  return sorted.slice(0, count)
}

type Candidate = { videoId: string; videoTitle: string; channelTitle: string; channelId: string; matchedPhrase: string }

// YouTube's search `q` param is a relevance-ranked keyword search, not a
// true exact-phrase match — quoting the phrase does NOT guarantee it
// actually appears in the result (confirmed directly: this returned totally
// unrelated videos for a distinctive laptop-review sentence). So search
// results here are only *candidates*; checkContentSimilarity verifies each
// one's own transcript before calling it a match.
async function searchCandidates(phrase: string, key: string, excludeChannelId: string): Promise<Candidate[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(`"${phrase}"`)}&key=${key}`,
    { signal: AbortSignal.timeout(8000) },
  )
  if (!res.ok) return []
  const data = await res.json()
  const items: any[] = Array.isArray(data?.items) ? data.items : []
  return items
    .filter((it) => it?.id?.videoId && it?.snippet?.channelId && it.snippet.channelId !== excludeChannelId)
    .map((it) => ({
      videoId: it.id.videoId,
      videoTitle: String(it?.snippet?.title ?? ""),
      channelTitle: String(it?.snippet?.channelTitle ?? ""),
      channelId: it.snippet.channelId,
      matchedPhrase: phrase,
    }))
}

export async function checkContentSimilarity(youtubeInput: string): Promise<ContentSimilarityFindings> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key || !youtubeInput?.trim()) return EMPTY
  try {
    const handle = handleFromInput(youtubeInput)
    const channel = await resolveChannelId(handle, key)
    if (!channel) return { ...EMPTY, checked: true, ownChannelFound: false }

    const videos = await getRecentVideos(channel.id, key, 2)
    const transcripts = await Promise.all(videos.map((v) => fetchTranscript(v.id)))
    const videosScanned = transcripts.filter(Boolean).length

    const phrases = [...new Set(transcripts.flatMap((t) => (t ? extractDistinctivePhrases(t, 2) : [])))].slice(0, 4)
    if (phrases.length === 0) return { checked: true, ownChannelFound: true, videosScanned, matches: [] }

    const candidateLists = await Promise.all(phrases.map((p) => searchCandidates(p, key, channel.id)))
    const candidates = new Map<string, Candidate>()
    for (const c of candidateLists.flat()) if (!candidates.has(c.videoId)) candidates.set(c.videoId, c)
    const toVerify = [...candidates.values()].slice(0, 5)

    const candidateTranscripts = await Promise.all(toVerify.map((c) => fetchTranscript(c.videoId)))
    const matches: ContentMatch[] = []
    toVerify.forEach((c, i) => {
      const candidateText = candidateTranscripts[i]
      if (candidateText && normalize(candidateText).includes(normalize(c.matchedPhrase))) {
        matches.push({
          matchedPhrase: c.matchedPhrase,
          videoTitle: c.videoTitle,
          channelTitle: c.channelTitle,
          videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`,
          channelUrl: `https://www.youtube.com/channel/${c.channelId}`,
        })
      }
    })

    return { checked: true, ownChannelFound: true, videosScanned, matches }
  } catch (err) {
    console.error("[content-similarity] failed:", err instanceof Error ? err.message : err)
    return EMPTY
  }
}
