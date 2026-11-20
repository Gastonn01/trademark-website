import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/paris-hilton-defiance-act-ai-likeness"
const title = "Paris Hilton and the Defiance Act Fight Over AI Deepfakes"
const description =
  "CNBC reported that Paris Hilton pressed the House to pass the Defiance Act after Loti AI found more than 100,000 explicit deepfakes of her."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "Paris Hilton Defiance Act, Paris Hilton deepfake, Loti AI, AI deepfake likeness, explicit deepfake bill",
})

const faqs: FaqItem[] = [
  {
    question: "Is the Defiance Act law?",
    answer:
      "Not as of CNBC’s November 18, 2026 report. CNBC said the Senate passed the latest version by unanimous consent in January 2026, and that the bill has never received a vote in the House.",
  },
  {
    question: "How many explicit deepfakes did Paris Hilton describe?",
    answer:
      "CNBC reported that Hilton, chief advocacy officer at Loti AI, said the company had detected more than 100,000 explicit deepfakes depicting her and helped remove more than 60,000.",
  },
]

export default function ParisHiltonDefianceActNews() {
  return (
    <BlogArticle
      kicker="News · November 18, 2026"
      title={title}
      dek="CNBC reported a Capitol push for the Defiance Act and the deepfake counts Paris Hilton gave for her own likeness. The bill is not a right you can file on today."
      path={path}
      description={description}
      datePublished="2026-11-20"
      faqs={faqs}
      ctaHref="/free-search?audience=creator"
    >
      <h2>What happened</h2>
      <p>
        On November 18, 2026, Corynn Winston at CNBC reported that Paris Hilton joined Rep. Alexandria Ocasio-Cortez
        and Rep. Laurel Lee at the U.S. Capitol to press the House to pass the Defiance Act. The event CNBC describes
        was on Tuesday, November 17. The source is{" "}
        <a href="https://www.cnbc.com/2026/11/18/paris-hilton-aoc-defiance-act-ai-porn-deep-fake-congress.html">
          “Paris Hilton, Alexandria Ocasio-Cortez press House to pass Defiance Act to fight AI deepfake pornography”
        </a>
        . This page stays inside that report.
      </p>
      <p>
        CNBC says the Defiance Act, the Disrupt Explicit Forged Images And Non-Consensual Edits Act, would expand an
        existing federal right to sue over sexually explicit deepfakes. In the article’s key points, the bill would
        let victims seek civil damages from people who knowingly create and distribute them. In the body, CNBC says
        that if the bill passed, survivors could sue people who create, share, publish, solicit, or threaten to
        distribute that content without consent, recover legal costs, and seek court orders requiring the content to
        be removed.
      </p>
      <p>
        The Senate passed the most recent version by unanimous consent in January 2026. CNBC says the bill has never
        received a vote in the House. As of the article, it had 70 House cosponsors, evenly split between 35 Democrats
        and 35 Republicans. Those are counts of support, not a vote.
      </p>
      <p>
        Hilton is chief advocacy officer at Loti AI, which CNBC describes as a digital identity firm that helps
        people find unauthorized uses of their likeness or voice and file takedown requests. She told CNBC the company
        has detected more than 100,000 explicit deepfakes depicting her and helped remove more than 60,000. “I’m very
        fortunate that I have a team of lawyers. I have people helping me. But a lot of these young girls and women
        don’t have that support,” she said.
      </p>
      <p>
        CNBC also describes a law that is already on the books. The Take It Down Act, signed in May 2025, made certain
        disclosures of nonconsensual intimate images, including AI-generated deepfakes, a federal crime, and requires
        covered platforms to remove the material and known identical copies within 48 hours of a valid request. Hilton
        told CNBC that current federal law sometimes “doesn’t work,” which is why she wants a civil route. That is
        her view of the gap. It is not a ruling that a particular takedown failed.
      </p>

      <h2>Why it matters</h2>
      <p>
        The counts are the part working creators should sit with. Hilton has a company looking for copies and a legal
        team filing requests, and CNBC still reports more than 100,000 explicit deepfakes found and more than 60,000
        removed. Removal is not the same thing as a right to sue the person who made the file. CNBC presents the
        Defiance Act as that second tool, and it also reports that the House has not voted on it.
      </p>
      <p>
        Until a bill becomes law, the tools you actually have are the ones already in force: platform rules, whatever
        state publicity law applies to the facts, copyright if a specific photo or video you own was copied, and
        trademark if your name is used as a brand. The{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link> separates
        those routes and explains why a proposed federal bill is not something to cite in a takedown as if it had
        passed. A face used in a fake endorsement ad is a different report from an explicit deepfake, which is what{" "}
        <Link href="/blog/google-ads-ai-public-figure-impersonation">Google’s ads clarification</Link> and the{" "}
        <Link href="/blog/stolen-faces-tiktok-instagram-ai-likeness">stolen-faces report</Link> are about.
      </p>
      <p>
        Name protection still belongs in the same week as the takedown. People search you by name. A registration does
        not erase an explicit fake, and it does not replace the civil claim the Defiance Act would create if the House
        passed it and it became law. It does give you a public record when a platform asks who owns the name on the
        account. The <Link href="/for-creators">creator page</Link> is the service page next to the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link>.
      </p>

      <h2>Practical protection steps</h2>
      <h3>Trademark the name people search</h3>
      <p>
        File on the name, and the handle if you use it as a brand, for the work you sell. A registration helps when
        someone uses that name as a source of goods or services or to suggest you approved them. It is the wrong tool,
        by itself, for an explicit image that never uses the name as a brand. Read the{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link>, then run a{" "}
        <Link href="/free-search?audience=creator">free name check</Link>. The check is not a clearance and not legal
        advice.
      </p>
      <h3>Monitor for fakes, including ones that never say your name</h3>
      <p>
        Search your name, your handles, and the phrases fans use. Explicit copies are often posted under unrelated
        captions. Hilton’s numbers come from a firm that looks for the face, not from a search of her name alone. Save
        the URL, the account, the date, and a copy. Do not wait for a bill to pass before you keep that record.
      </p>
      <h3>Use the takedown that matches the harm</h3>
      <p>
        Ask the platform to remove impersonation or nonconsensual intimate imagery under its own rules, and keep the
        confirmation. CNBC’s account of the Take It Down Act is that covered platforms have a 48-hour removal duty
        after a valid request for material the statute covers. A copyright report fits when someone copied a photo or
        video you own. A trademark report fits when the name or logo is used as a brand. Those are different forms.
      </p>
      <h3>Write consent for likeness before you need it</h3>
      <p>
        If you license a photo, a face, or a voice, the contract should say whether the other side may make a
        synthetic version, train a model, or allow anyone else to do that. Consent for a campaign is not consent for
        an explicit replica. Get it in writing, including what happens when the relationship ends. A platform policy
        is not that contract, and a bill that has not passed the House is not a substitute for the paperwork you can
        put in place now.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">
            Protecting your voice and likeness from AI deepfakes
          </Link>
        </li>
        <li>
          <Link href="/blog/stolen-faces-tiktok-instagram-ai-likeness">
            Stolen faces on TikTok and Instagram
          </Link>
        </li>
        <li>
          <Link href="/blog/how-creators-protect-name-brand-and-likeness">
            How creators protect a name, brand, and likeness
          </Link>
        </li>
      </ul>

      <h2>Source</h2>
      <p>
        Corynn Winston, “Paris Hilton, Alexandria Ocasio-Cortez press House to pass Defiance Act to fight AI deepfake
        pornography,” CNBC, November 18, 2026.{" "}
        <a href="https://www.cnbc.com/2026/11/18/paris-hilton-aoc-defiance-act-ai-porn-deep-fake-congress.html">
          Read the CNBC article
        </a>
        .
      </p>
    </BlogArticle>
  )
}
