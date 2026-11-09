import type { IdentityFindings } from "./identity-check"
import { classLabel } from "./nice-classes"
import type { ContentSimilarityFindings } from "./content-similarity"

// Renders the automated portion of a Brand Clone Scan as a standalone HTML
// email. Built only from real findings returned by runIdentityCheck() —
// never fabricates specific claims (e.g. "found these 3 fake accounts").
// Impersonation/counterfeit hunting stays a declared manual-review item.

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function pill(label: string, tone: "flag" | "clear" | "neutral") {
  const styles = {
    flag: "background:#f7ece8;color:#9a3324;",
    clear: "background:#eef3ec;color:#3d6b47;",
    neutral: "background:#efece4;color:#6b6558;",
  }[tone]
  return `<span style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:5px 11px;border-radius:100px;white-space:nowrap;${styles}">${esc(label)}</span>`
}

function findingRow(title: string, sub: string, pillHtml: string, note?: string) {
  return `
  <tr>
    <td style="background:#FAF8F4;padding:14px 16px;border-bottom:1px solid #e6e1d6;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>
          <div style="font-size:14.5px;font-weight:600;color:#1c1c1a;margin-bottom:2px;">${esc(title)}</div>
          <div style="font-size:12.5px;color:#6b6558;">${esc(sub)}</div>
          ${note ? `<div style="font-size:12px;margin-top:6px;">${note}</div>` : ""}
        </td>
        <td align="right" style="white-space:nowrap;">${pillHtml}</td>
      </tr></table>
    </td>
  </tr>`
}

// Plain-language read on whether a registry hit actually overlaps the
// requester's own business — trademarks are class-specific, so "registered"
// alone can be misleading without this context.
function categoryNote(hits: { classes: number[] }[], overlap: boolean | null, yourClasses: number[]): string {
  if (hits.length === 0 || overlap === null || yourClasses.length === 0) return ""
  const yourLabel = yourClasses.map(classLabel).join(", ")
  if (overlap) {
    return `<span style="color:#9a3324;">Overlaps your category (${esc(yourLabel)}) — worth a closer look.</span>`
  }
  const theirLabel = [...new Set(hits.flatMap((h) => h.classes))].map(classLabel).join(", ") || "an unlisted category"
  return `<span style="color:#6b6558;">Registered in ${esc(theirLabel)}, not your category (${esc(yourLabel)}) — likely doesn't block you, though it's still worth a quick attorney check since class boundaries can be nuanced.</span>`
}

function matchRow(m: { matchedPhrase: string; videoTitle: string; channelTitle: string; videoUrl: string; channelUrl: string }) {
  return `
  <tr><td style="padding:12px 0;border-top:1px solid #e6e1d6;">
    <div style="font-size:14px;font-weight:600;color:#1c1c1a;margin-bottom:3px;">${esc(m.channelTitle)}</div>
    <div style="font-size:12.5px;color:#6b6558;margin-bottom:5px;">Used the phrase: <em>"${esc(m.matchedPhrase)}"</em></div>
    <div style="font-size:12px;">
      <a href="${esc(m.videoUrl)}" style="color:#B8862E;text-decoration:none;">View video →</a>
      &nbsp;·&nbsp;
      <a href="${esc(m.channelUrl)}" style="color:#B8862E;text-decoration:none;">View channel →</a>
    </div>
  </td></tr>`
}

// Deliberately framed as "worth a look", never "this channel copied you" —
// a phrase-overlap hit could be coincidence, fair use, or a licensed
// re-post, and only a human reviewer can tell the difference.
function contentSection(cs: ContentSimilarityFindings | undefined, hasInput: boolean): string {
  if (!hasInput) return ""
  let pillHtml: string
  let sub: string
  let extra = ""
  if (!cs || !cs.checked) {
    pillHtml = pill("Not checked", "neutral")
    sub = "We couldn't run this check for this request."
  } else if (!cs.ownChannelFound) {
    pillHtml = pill("Channel not found", "neutral")
    sub = "We couldn't find a channel matching what you gave us — double check the handle."
  } else if (cs.matches.length === 0) {
    pillHtml = pill("No matches found", "clear")
    sub = `Quick check of ${cs.videosScanned} recent video${cs.videosScanned === 1 ? "" : "s"} — no other channel is using the same wording.`
  } else {
    pillHtml = pill(`${cs.matches.length} possible match${cs.matches.length === 1 ? "" : "es"}`, "flag")
    sub = `Found near-identical wording from your videos on other channels — worth a look, not a confirmed case of copying.`
    extra = `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">${cs.matches.map(matchRow).join("")}</table>`
  }
  return `
  <tr><td style="padding:28px 8px;border-bottom:1px solid #e6e1d6;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="font-family:'SF Mono',monospace;font-size:12px;color:#B8862E;padding-right:10px;">§3</td>
      <td style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1c1c1a;">Content duplication spot check</td>
    </tr></table>
    <p style="font-size:13px;color:#6b6558;max-width:52ch;margin:0 0 16px;">A lightweight scan of a few recent videos and distinctive phrases from your own channel — not exhaustive, and not a substitute for a full review.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e1d6;border-radius:3px;padding:14px 16px;"><tr><td>
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td>${sub}</td><td align="right" style="white-space:nowrap;">${pillHtml}</td></tr></table>
      ${extra}
    </td></tr></table>
  </td></tr>`
}

function manualItem(title: string, sub: string) {
  return `
  <tr><td style="padding:12px 0;border-top:1px solid #e6e1d6;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td width="22" valign="top" style="padding-top:2px;">
        <div style="width:20px;height:20px;border-radius:50%;border:1.5px dashed #6b6558;"></div>
      </td>
      <td style="padding-left:12px;">
        <div style="font-size:14px;font-weight:600;color:#1c1c1a;margin-bottom:2px;">${esc(title)}</div>
        <div style="font-size:12.5px;color:#6b6558;max-width:440px;">${esc(sub)}</div>
      </td>
    </tr></table>
  </td></tr>`
}

export function renderCloneScanReportHtml(
  findings: IdentityFindings,
  opts: { reportId: string; requestedDate: string; contentSimilarity?: ContentSimilarityFindings; youtubeChannelInput?: string },
): string {
  const { name, euipo, uspto, webPresence } = findings
  const hasConflict = euipo.exact.length > 0 || uspto.exactCount > 0 || findings.ai.verdict === "conflict" || findings.known

  const verdictPill = hasConflict
    ? pill("Active registrations found — review recommended", "flag")
    : pill("No conflicting registration found", "clear")

  const yourClasses = findings.category?.classes ?? []
  const registryRows: string[] = []
  if (euipo.checked) {
    registryRows.push(
      euipo.exact.length > 0
        ? findingRow(
            "EU register (EUIPO)",
            `${euipo.exact.length} live filing${euipo.exact.length === 1 ? "" : "s"} under the exact name "${name}"`,
            pill("Registered", "flag"),
            categoryNote(euipo.exact, findings.category?.euipo ?? null, yourClasses),
          )
        : findingRow("EU register (EUIPO)", euipo.totalRelated > 0 ? `No exact match; ${euipo.totalRelated} related record(s) found` : "No records found", pill("No exact match", "clear")),
    )
  }
  if (uspto.checked) {
    registryRows.push(
      uspto.exactCount > 0
        ? findingRow(
            "US register (USPTO)",
            `${uspto.exactCount} live filing(s) under the exact name "${name}"`,
            pill("Registered", "flag"),
            categoryNote(uspto.exact, findings.category?.uspto ?? null, yourClasses),
          )
        : findingRow("US register (USPTO)", uspto.totalRelated > 0 ? `No exact match; ${uspto.totalRelated} related mark(s) found` : "No records found", pill("No exact match", "clear")),
    )
  }
  if (registryRows.length === 0) {
    registryRows.push(findingRow("Official registries", "EUIPO/USPTO were not reachable for this check", pill("Unavailable", "neutral")))
  }

  const classesLine =
    euipo.classes.length > 0
      ? `<div style="margin-top:14px;"><span style="font-family:'SF Mono',monospace;font-size:11.5px;padding:4px 9px;border:1px solid #e6e1d6;border-radius:3px;color:#6b6558;">${euipo.classes.length} of 45 Nice classes</span>${euipo.offices ? ` <span style="font-family:'SF Mono',monospace;font-size:11.5px;padding:4px 9px;border:1px solid #e6e1d6;border-radius:3px;color:#6b6558;">${esc(euipo.offices)} office</span>` : ""}</div>`
      : ""

  const presenceRows = [
    findingRow(
      `${webPresence.domain.slug}.com`,
      "Domain registration status",
      webPresence.domain.taken === null ? pill("Unknown", "neutral") : webPresence.domain.taken ? pill("Registered", "flag") : pill("Available", "clear"),
    ),
    findingRow(
      `youtube.com/@${webPresence.domain.slug}`,
      "Exact-handle availability",
      webPresence.youtube.taken === null ? pill("Unknown", "neutral") : webPresence.youtube.taken ? pill("Taken", "flag") : pill("Handle open", "clear"),
    ),
    findingRow(
      "Google recognition",
      webPresence.google?.checked ? `${webPresence.google.topResults} organic results reviewed` : "Not checked for this request",
      !webPresence.google?.checked ? pill("Not checked", "neutral") : webPresence.google.recognizedEntity ? pill("Established identity", "flag") : pill("No strong presence", "clear"),
    ),
    findingRow("Instagram", "Profile existence check", pill("Not determinable", "neutral")),
  ].join("")

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Identity Protection Report — ${esc(name)}</title></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#FAF8F4;color:#1c1c1a;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:20px auto;background-color:#FAF8F4;">

  <tr><td style="background:#0A1A36;padding:36px 32px 30px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#B8862E;font-weight:700;">Just Protected</td>
      <td align="right" style="font-family:'SF Mono',monospace;font-size:11px;color:rgba(242,239,230,0.55);">REPORT&nbsp;#${esc(opts.reportId)}</td>
    </tr></table>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:30px;color:#f2efe6;margin:22px 0 6px;">Identity Protection Report</h1>
    <p style="color:rgba(242,239,230,0.7);font-size:15px;margin:0;">Automated preliminary findings for "${esc(name)}"</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(242,239,230,0.15);"><tr>
      <td><div style="font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,239,230,0.5);margin-bottom:3px;">Subject</div><div style="font-size:14px;color:#f2efe6;">${esc(name)}</div></td>
      <td><div style="font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,239,230,0.5);margin-bottom:3px;">Requested</div><div style="font-size:14px;color:#f2efe6;">${esc(opts.requestedDate)}</div></td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:20px 8px;border-bottom:1px solid #e6e1d6;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6558;">Overall automated read</td>
      <td align="right">${verdictPill}</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:28px 8px;border-bottom:1px solid #e6e1d6;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="font-family:'SF Mono',monospace;font-size:12px;color:#B8862E;padding-right:10px;">§1</td>
      <td style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1c1c1a;">Trademark registry status</td>
    </tr></table>
    <p style="font-size:13px;color:#6b6558;max-width:52ch;margin:0 0 16px;">Live lookups against the EU (EUIPO) and US (USPTO) trademark registers, run at the moment this report was generated.${
      yourClasses.length > 0 ? ` Checked against your category: <strong>${esc(yourClasses.map(classLabel).join(", "))}</strong>.` : ""
    }</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e1d6;border-radius:3px;overflow:hidden;">${registryRows.join("")}</table>
    ${classesLine}
    ${
      hasConflict
        ? `<div style="background:#f2e9d5;border-left:3px solid #B8862E;padding:14px 16px;border-radius:0 4px 4px 0;font-size:13px;margin-top:16px;color:#1c1c1a;"><strong>What this means —</strong> a registration doesn't cover every category. If sought outside those classes, or the filer isn't the rights holder for this use, there may still be room to register or to challenge. That judgment call needs a licensed attorney.</div>`
        : ""
    }
  </td></tr>

  <tr><td style="padding:28px 8px;border-bottom:1px solid #e6e1d6;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="font-family:'SF Mono',monospace;font-size:12px;color:#B8862E;padding-right:10px;">§2</td>
      <td style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1c1c1a;">Digital presence signals</td>
    </tr></table>
    <p style="font-size:13px;color:#6b6558;max-width:52ch;margin:0 0 16px;">Lightweight, real-time checks — not a content scrape — used to gauge how established the name is online.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e1d6;border-radius:3px;overflow:hidden;">${presenceRows}</table>
  </td></tr>

  ${contentSection(opts.contentSimilarity, Boolean(opts.youtubeChannelInput?.trim()))}

  <tr><td style="padding:28px 8px;">
    <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
      <td style="font-family:'SF Mono',monospace;font-size:12px;color:#B8862E;padding-right:10px;">§4</td>
      <td style="font-family:Georgia,serif;font-size:20px;font-weight:400;color:#1c1c1a;">Outside automated scope</td>
    </tr></table>
    <p style="font-size:13px;color:#6b6558;max-width:52ch;margin:0 0 4px;">These require a human reviewer and are not in this automated pass — included so nothing is silently skipped.</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${manualItem("Impersonation & fake-account sweep", "Identifying look-alike or fraudulent profiles across Instagram, TikTok and Facebook — including the Ad Library — requires manual review to confirm intent before any claim is made about a real account.")}
      ${manualItem("Counterfeit & marketplace listings", "Cross-referencing marketplace listings against the rights holder is done by the review team, not generated automatically.")}
      ${manualItem("Ownership & standing confirmation", "Confirming who any existing registrations belong to, and whether this request has standing to act on them.")}
    </table>
  </td></tr>

  <tr><td style="background:#0A1A36;padding:36px 32px 40px;text-align:center;border-radius:0 0 4px 4px;">
    <h3 style="font-family:Georgia,serif;font-weight:400;font-size:22px;color:#f2efe6;margin:0 0 10px;">An attorney takes it from here</h3>
    <p style="color:rgba(242,239,230,0.65);font-size:14px;margin:0 0 22px;max-width:400px;margin-left:auto;margin-right:auto;">The items in §3 are queued for manual review. You'll hear back with the full picture soon.</p>
    <a href="https://justprotected.com" style="display:inline-block;background:#B8862E;color:#0A1A36;font-weight:700;font-size:14px;padding:13px 26px;border-radius:100px;text-decoration:none;">Track this request →</a>
    <p style="font-size:11.5px;color:rgba(242,239,230,0.4);margin-top:16px;">Report #${esc(opts.reportId)} · Automated portion only · Not legal advice</p>
  </td></tr>

</table>
</body>
</html>`
}
