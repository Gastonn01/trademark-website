import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/google-ads-ai-public-figure-impersonation"
const title = "Google Ads and AI Impersonation of Athletes, Creators, and Musicians"
const description =
  "PPC Land reported Google’s clarification: ads that use AI to impersonate public figures are banned, even when the ad says it was made with AI."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "Google Ads AI impersonation, public figure impersonation policy, athlete deepfake ad, creator likeness ad",
})

const faqs: FaqItem[] = [
  {
    question: "Does labeling an ad as AI-generated make a celebrity impersonation allowed?",
    answer:
      "No. Google’s November 11, 2026 policy update says ads that impersonate public figures using AI are not allowed, even if they disclose that they were generated or edited with AI. PPC Land reported that the update clarifies the existing rule and does not change enforcement.",
  },
  {
    question: "Who counts as a public figure in this Google Ads rule?",
    answer:
      "Google’s policy page says public figures are people who are famous or well known, including government officials, entertainers, athletes, online influencers, and prominent business people.",
  },
]

export default function GoogleAdsAiImpersonationNews() {
  return (
    <BlogArticle
      kicker="News · November 12, 2026"
      title={title}
      dek="PPC Land reported a Google Ads clarification posted November 11, 2026. An AI label does not make a public-figure impersonation ad allowed. The rule is a platform policy, not a court judgment."
      path={path}
      description={description}
      datePublished="2026-11-20"
      faqs={faqs}
      ctaHref="/free-search?audience=creator"
    >
      <h2>What happened</h2>
      <p>
        On November 12, 2026, PPC Land reported that Google had clarified its advertising rules on public-figure
        impersonation. The notice itself is dated November 11, 2026, in Google’s Advertising Policies Help Center,
        under “Updates to Unacceptable Business Practices (November 2026).” PPC Land’s article is{" "}
        <a href="https://ppc.land/ai-labels-wont-save-public-figure-impersonators-from-google-ads-suspension/">
          “AI labels won’t save public figure impersonators from Google Ads suspension”
        </a>
        . The policy text is on{" "}
        <a href="https://support.google.com/adspolicy/answer/15938071?hl=en">Google’s unacceptable business practices page</a>{" "}
        and the update notice is{" "}
        <a href="https://support.google.com/adspolicy/answer/18891933?hl=en">here</a>. This page stays inside those
        sources.
      </p>
      <p>
        Google’s notice says it updated the policy “to clarify that ads that impersonate public figures using AI are
        not allowed, even if they disclose that they were generated or edited using AI.” The same notice says the
        clarification is meant to help advertisers understand the policy and “does not change the enforcement of the
        policy.” An AI label is not a defense.
      </p>
      <p>
        Google defines public figures as people who are famous or well known. The list explicitly includes government
        officials, entertainers, athletes, online influencers, and prominent business people such as founders or CEOs.
        The examples on the policy page are a famous singer’s name or image used without permission to make the singer
        look like a happy client of an investment service, a false claim that a professional athlete sponsors a
        weight-loss product, and AI-generated videos of popular YouTubers made to look like they endorse a get-rich-quick
        scheme.
      </p>
      <p>
        PPC Land describes enforcement of the Unacceptable Business Practices policy as egregious: an account is
        suspended as soon as a violation is detected, with no prior warning. Google’s best-practice line on the same
        page is narrower than a ban on every use of a famous face. Advertisers should have documented permission, and
        be able to prove it, before using a public figure’s name, image, video, or voice to suggest an endorsement.
      </p>

      <h2>Why it matters</h2>
      <p>
        Athletes, musicians, and creators are inside the definition Google wrote down. The examples are the scams
        people already see: a singer on a fake investment testimonial, an athlete on a weight-loss product, a YouTuber
        on a get-rich-quick video. The November 11 note answers one question the examples left open. Saying “this was
        made with AI” does not make that ad allowed.
      </p>
      <p>
        A suspension is Google’s remedy against the advertiser. It is not damages for you, and it is not a court
        finding that your publicity rights were violated. The ad can still be screenshotted, reposted, and run
        somewhere else. That is the same reason a Spotify control is not a trademark, which is the point of the{" "}
        <Link href="/blog/spotify-artist-profile-protection">Artist Profile Protection</Link> report, and why a face
        stolen for a political clip is a different report from an ad, which is what the{" "}
        <Link href="/blog/stolen-faces-tiktok-instagram-ai-likeness">McGill stolen-faces study</Link> describes.
      </p>
      <p>
        Google’s appeal tips for advertisers who say they do have a relationship are a preview of what you will be
        asked for from the other side: contracts, a written agreement, a credible article about the partnership, or a
        public statement from you. If you cannot show the name is yours, the conversation is slower. The{" "}
        <Link href="/for-athletes">athlete page</Link>, the <Link href="/for-creators">creator page</Link>, and the{" "}
        <Link href="/for-musicians">musician page</Link> are the service pages. The{" "}
        <Link href="/blog/athlete-nil-name-image-likeness-protection">NIL guide</Link> and the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link> explain what a
        trademark does and does not cover.
      </p>

      <h2>Practical protection steps</h2>
      <h3>Trademark the name on the endorsement</h3>
      <p>
        Register the name sponsors and scammers both use, for the goods and services you actually offer. A
        registration is the document that matches a trademark report and a “who owns this name” question. It does not
        prohibit every synthetic face, and it is not the Google policy. The policy is Google’s. The registration is
        yours. Read the <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link>{" "}
        and run a <Link href="/free-search?audience=creator">free name check</Link>. Athletes can start from{" "}
        <Link href="/free-search?audience=athlete">the athlete check</Link>, musicians from{" "}
        <Link href="/free-search?audience=musician">the musician check</Link>. A check is not a clearance and not legal
        advice.
      </p>
      <h3>Monitor ads, not only posts</h3>
      <p>
        Search your name next to the products in Google’s examples: investments, weight loss, get-rich-quick schemes,
        and anything else you would never endorse. Check the ad, the account name, and the date. A post on your own
        channel is not the place these ads live.
      </p>
      <h3>Report it as public-figure impersonation, with proof</h3>
      <p>
        If a fake ad uses you, do three things. Screenshot the ad, the account name, and the date. Report it as public
        figure impersonation. Google’s policy page says a public figure can report unauthorized use of their likeness.
        Show proof the name is yours: a registration, or other documented ownership. Keep the confirmation. A
        suspension without warning is what PPC Land says Google does to the advertiser. It is not something you should
        assume has already happened because you sent a report.
      </p>
      <h3>Make consent a document</h3>
      <p>
        Google’s best practice is the contract you wanted anyway. Before anyone uses your name, image, video, or voice
        to suggest you endorse a product, get consent in writing, including whether they may use AI to generate or
        edit that likeness. A real partnership should be easy to prove. A fake one should be easy to deny because the
        paper does not exist. Consent for a photoshoot is not consent for an AI testimonial.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/lebron-james-bron-ai-likeness-cease-and-desist">
            LeBron James, the Bron app, and his likeness
          </Link>
        </li>
        <li>
          <Link href="/blog/stolen-faces-tiktok-instagram-ai-likeness">
            Stolen faces on TikTok and Instagram
          </Link>
        </li>
        <li>
          <Link href="/blog/athlete-nil-name-image-likeness-protection">Athlete NIL protection</Link>
        </li>
      </ul>

      <h2>Source</h2>
      <p>
        “AI labels won’t save public figure impersonators from Google Ads suspension,” PPC Land, November 12, 2026.{" "}
        <a href="https://ppc.land/ai-labels-wont-save-public-figure-impersonators-from-google-ads-suspension/">
          Read the PPC Land article
        </a>
        . Google, “Updates to Unacceptable Business Practices (November 2026),” Advertising Policies Help Center,
        posted November 11, 2026, and “Unacceptable business practices.”{" "}
        <a href="https://support.google.com/adspolicy/answer/18891933?hl=en">Read the update</a>
        {" and "}
        <a href="https://support.google.com/adspolicy/answer/15938071?hl=en">the policy</a>.
      </p>
    </BlogArticle>
  )
}
