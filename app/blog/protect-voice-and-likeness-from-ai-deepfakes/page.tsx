import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/protect-voice-and-likeness-from-ai-deepfakes"
const title = "Protecting Your Voice and Likeness From AI Deepfakes"
const description =
  "A cautious look at US voice and likeness rules, including Tennessee’s ELVIS Act and the proposed federal NO FAKES Act, plus takedowns and trademarks."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "AI deepfake likeness, ELVIS Act, NO FAKES Act, voice cloning trademark, right of publicity deepfake takedown",
})

const faqs: FaqItem[] = [
  {
    question: "Is there a federal law against AI voice clones?",
    answer:
      "Not as a general publicity right that is currently in force. The NO FAKES Act of 2026, S. 4591, is a Senate bill. Congress.gov shows it was placed on the Senate calendar on June 24, 2026. It has not become law. State law, including Tennessee’s ELVIS Act, and ordinary trademark and copyright rules, are what exist today.",
  },
  {
    question: "What does Tennessee’s ELVIS Act cover?",
    answer:
      "Governor Bill Lee signed it on March 21, 2024. His office said it updates Tennessee’s personal-rights law to protect voice from AI misuse, along with name, image, and likeness. The statute defines voice as a sound readily identifiable and attributable to a person, including a simulation. It is a Tennessee law, not a national one.",
  },
  {
    question: "Can I send a copyright takedown for a deepfake of my face or voice?",
    answer:
      "A copyright report fits when someone copied a work you own, such as a recording or a photo. A newly generated face or voice is a different problem. Use the platform’s impersonation or synthetic-media report for that, and keep a copy. A trademark report fits when your name or logo is used as a brand.",
  },
  {
    question: "How does a trademark help?",
    answer:
      "A registration helps when the clone uses your name or logo as a source of goods or services, or when the use is likely to confuse people about sponsorship. It does not, by itself, prohibit every synthetic voice. Publicity law is the closer tool for identity. The USPTO benefits of registration are notice, a presumption of ownership, federal court, the ® symbol, and the option to record with Customs.",
  },
  {
    question: "Do these rules apply outside the United States?",
    answer:
      "A US registration and a Tennessee statute stop at their own borders. The United Kingdom and the European Union have their own trademark systems, and image or voice rules differ by country. Read the country page for the place you actually need cover.",
  },
]

export default function VoiceLikenessDeepfakeGuide() {
  return (
    <BlogArticle
      kicker="Guide"
      title={title}
      dek="A cloned voice and a fake face are not automatically a trademark problem. Here is what US law actually says, what is only a bill, and what a registration is good for."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search"
    >
      <p>
        Generative tools can put a stranger’s words in a familiar voice, or build a face that is close enough for an
        ad. The legal response depends on what was copied. A name used as a brand is a trademark question. A copied
        recording is a copyright question. A synthetic voice or face used commercially is, in the United States, mostly
        a state publicity question, plus whatever the platform’s rules say. Those routes use different forms. Filing
        the wrong one wastes the week you needed.
      </p>
      <p>
        This page stays at that level on purpose. It is for creators, athletes, and musicians in the United States.
        The matching pages are <Link href="/for-creators">creators</Link>,{" "}
        <Link href="/for-athletes">athletes</Link>, and <Link href="/for-musicians">musicians</Link>. For the name as a
        brand, use the <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link> and the{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username guide</Link>. An older site piece on{" "}
        <Link href="/blog/ai-voice-cloning-drake-ip-battleground">AI voice cloning and Drake</Link> is background, not
        a source of rules.
      </p>

      <h2>What exists today</h2>
      <p>
        There is no single federal statute, currently in force, that gives every person in the country a right to
        control AI replicas of their voice and likeness. Publicity rights grew up in the states. Some states have a
        statute. Some rely on court decisions. Coverage of voice, of deceased people, and of non-commercial speech is
        not the same everywhere. If you need a rule for a specific state, read that state’s statute or talk to a
        lawyer there. This guide does not turn those differences into a chart.
      </p>
      <p>
        Federal trademark law still matters when the use is about source or sponsorship. The USPTO says a trademark
        identifies goods or services. It does not give you the word in the abstract. Separately,{" "}
        <a href="https://www.law.cornell.edu/uscode/text/15/1125">15 U.S.C. § 1125(a)</a> reaches a false or misleading
        representation likely to cause confusion about affiliation, sponsorship, or approval. A deepfake that also
        uses your name, or that is staged to look like an endorsement, can raise that issue. A deepfake that never
        trades on the name as a brand may not. The statute is not a finding about your clip.
      </p>
      <p>
        Copyright sits beside both. It protects original works, such as a song, a photo, or a video you created. It
        does not automatically give you a copyright in your voice or your face as such. That is why a copyright
        takedown and a likeness complaint are different paperwork.
      </p>

      <h2>Tennessee’s ELVIS Act</h2>
      <p>
        On March 21, 2024, Tennessee Governor Bill Lee signed the Ensuring Likeness Voice and Image Security Act. The
        governor’s office called it an update to the state’s Protection of Personal Rights law, adding protections for
        the voice of songwriters, performers, and music-industry professionals against AI misuse. The office said the
        preexisting law covered name, image, and likeness, and did not specifically address generative tools that let
        users make unauthorized works in another person’s image and voice. It described the act as adding “voice” to
        that protection. The signing announcement is on{" "}
        <a href="https://www.tn.gov/governor/news/2024/3/21/photos--gov--lee-signs-elvis-act-into-law.html">tn.gov</a>.
        The office also called the act first of its kind. That is the state’s description, not a finding by a court.
      </p>
      <p>
        The definition now in the code is specific.{" "}
        <a href="https://law.justia.com/codes/tennessee/title-47/chapter-25/part-11/section-47-25-1102/">
          Tenn. Code Ann. § 47-25-1102
        </a>{" "}
        says “voice” means a sound in a medium that is readily identifiable and attributable to a particular
        individual, regardless of whether the sound contains the actual voice or a simulation of the voice. The
        history note cites 2024, chapter 588. “Likeness” in the same section means the use of an image of an
        individual for commercial purposes. “Individual” includes a human being, living or dead.
      </p>
      <p>
        Read those sentences narrowly. They are definitions in a Tennessee statute. They do not enact the same rule
        in every other state. They do not tell you, by themselves, whether a particular song prompt, parody, or news
        clip is unlawful. Exemptions, remedies, and who can sue are in the rest of that part of the code, and they
        should be read there rather than summarized from memory. If the use has a real connection to Tennessee, that
        statute is one of the first places to look. If it does not, another state’s law may be the one that matters.
      </p>
      <p>
        Variety reported on November 7, 2026 that Elvis Presley rightsholders, including Authentic Brands Group and
        Raleigh Music Publishing, sued Suno in the Northern District of California and alleged both copyright
        infringement and a violation of the ELVIS Act, and that Eminem’s publisher Eight Mile Style filed its own
        case. Those are allegations. Suno denied trading on name or likeness. The report is summarized in{" "}
        <Link href="/blog/elvis-eminem-suno-ai-music-lawsuits">Elvis and Eminem rightsholders sue Suno</Link>.
      </p>

      <h2>The proposed NO FAKES Act</h2>
      <p>
        The NO FAKES Act of 2026 is a bill, not a statute you can enforce. Congress.gov identifies it as S. 4591 in
        the 119th Congress. Senator Christopher Coons introduced it on May 20, 2026. The latest action listed there,
        when this page was written, is June 24, 2026: placed on the Senate legislative calendar under General Orders,
        Calendar No. 446. The tracker has not moved it to “passed Senate,” “passed House,” or “became law.”
      </p>
      <p>
        The Congressional Research Service summary of the version reported to the Senate on June 24, 2026 says the
        bill would create a federal intellectual-property right against unauthorized digital replicas of a person’s
        voice or visual likeness. In that summary, the right would let the individual or right holder authorize a
        digital replica, or authorize use of the voice or likeness for a product or service. The summary says the
        right is not assignable during the person’s lifetime, is licensable, and does not expire at death. It
        describes civil liability for specified uses, such as distributing a digital replica without authorization,
        and exceptions for categories that include news reporting, sports broadcasts, and satire. It also describes a
        notice-and-takedown process, a counter-notice process, and preemption of state digital-replica laws except
        for causes of action under state statutes or common law in existence as of January 2, 2025.
      </p>
      <p>
        That is a summary of a committee version. The text can change. A calendar placement is not a vote of the full
        Senate. Do not plan a business, a contract, or a takedown on the assumption that this bill is law. The record
        is <a href="https://www.congress.gov/bill/119th-congress/senate-bill/4591">S. 4591 on Congress.gov</a>.
      </p>

      <h2>Takedowns</h2>
      <p>
        Platforms write their own reporting tools, and the labels differ. The useful distinction is the right you are
        asserting.
      </p>
      <ul>
        <li>
          Copyright, when a specific work you own was copied. A recording, a photograph, or a video can qualify. A
          synthetic performance that imitates you, without copying a particular recording, often does not fit this
          form. Sending a copyright notice about material you do not own can create its own problem.
        </li>
        <li>
          Trademark, when your name, logo, or other mark is used as a brand, or in a way that suggests you are the
          source or the sponsor. A registration makes that report easier to document. An unregistered mark can still
          be a basis in some forms, with a harder proof problem.
        </li>
        <li>
          Impersonation or synthetic media, when the harm is a fake account or a generated face or voice. This is the
          form that matches many deepfakes. The platform decides whether its policy applies. A policy is not a court.
        </li>
      </ul>
      <p>
        Before you report, save the URL, the date, and a screenshot or recording. Write down what was used: name,
        face, voice, logo, or a specific work. After you report, save the confirmation. If the content stays up, the
        next step might be a demand letter or a lawsuit in a court that actually has power over the user. That choice
        depends on facts this page does not have.
      </p>
      <p>
        A cease-and-desist letter is a demand. It is not a judgment. Front Office Sports reported on November 5, 2026
        that LeBron James’s representatives, and Luka Dončić’s camp, sent that kind of letter to an AI betting app
        over a promo that evoked James. See the{" "}
        <Link href="/blog/lebron-james-bron-ai-likeness-cease-and-desist">Bron AI report</Link>.
      </p>

      <h2>Where a trademark helps, and where it stops</h2>
      <p>
        Registering your name or logo gives you the benefits the USPTO lists: a public record, a legal presumption
        that you own the mark and have the right to use it, a basis for filing abroad, the ability to sue in federal
        court, the ® symbol for the goods and services in the registration, and the option to record with U.S. Customs
        and Border Protection. The office is not an enforcement agency. Those points are from{" "}
        <a href="https://www.uspto.gov/trademarks/basics/why-register-your-trademark">why register your trademark</a>.
      </p>
      <p>
        That package is aimed at brand use. It supports a complaint about merch, a fake store, or an ad that uses the
        name so people think you approved it. It does not confer a property right in a voice. It does not replace the
        ELVIS Act inside Tennessee, and it does not fill the gap the NO FAKES Act is trying to fill nationally,
        because that bill is not law. If the clone never uses the name or logo, start with publicity law and the
        platform’s impersonation tools, and treat the trademark as a separate question about the brand.
      </p>
      <p>
        Common-law trademark rights from use are geographically limited. A federal registration is nationwide in the
        United States and its territories, and nowhere else. The{" "}
        <Link href="/trademark-registration/united-states">United States</Link>,{" "}
        <Link href="/trademark-registration/united-kingdom">United Kingdom</Link>, and{" "}
        <Link href="/trademark-registration/european-union">European Union</Link> pages are separate filings. Voice and
        image rules outside the US are outside this page.
      </p>

      <h2>A practical sequence</h2>
      <ol>
        <li>Preserve the clip and the URL the day you see it.</li>
        <li>Decide which right is actually involved: a copied work, a brand, a face, a voice, or more than one.</li>
        <li>Send the matching platform report. Do not send a copyright notice for a voice you cannot claim as a work.</li>
        <li>
          If the name is the brand people buy, run a <Link href="/free-search">free name check</Link> and read the{" "}
          <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link> before you
          assume you already have paperwork a platform will accept.
        </li>
        <li>
          If the voice or face is the issue, identify the state or country connected to the use before you cite a
          statute. Tennessee’s definition is a starting point only when Tennessee law applies.
        </li>
      </ol>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/elvis-eminem-suno-ai-music-lawsuits">Elvis and Eminem rightsholders sue Suno</Link>
        </li>
        <li>
          <Link href="/blog/lebron-james-bron-ai-likeness-cease-and-desist">Bron AI cease-and-desist report</Link>
        </li>
        <li>
          <Link href="/blog/how-creators-protect-name-brand-and-likeness">Creator name, brand, and likeness</Link>
        </li>
        <li>
          <Link href="/blog/athlete-nil-name-image-likeness-protection">Athlete NIL protection</Link>
        </li>
        <li>
          <Link href="/for-musicians">For musicians</Link>
          {" · "}
          <Link href="/for-creators">for creators</Link>
          {" · "}
          <Link href="/for-athletes">for athletes</Link>
        </li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.tn.gov/governor/news/2024/3/21/photos--gov--lee-signs-elvis-act-into-law.html">
            Tennessee governor’s office, March 21, 2024, ELVIS Act signing
          </a>
        </li>
        <li>
          <a href="https://law.justia.com/codes/tennessee/title-47/chapter-25/part-11/section-47-25-1102/">
            Tenn. Code Ann. § 47-25-1102 (2025)
          </a>
        </li>
        <li>
          <a href="https://www.congress.gov/bill/119th-congress/senate-bill/4591">
            Congress.gov, S. 4591, NO FAKES Act of 2026, including the CRS summary of the version reported June 24,
            2026
          </a>
        </li>
        <li>
          <a href="https://www.uspto.gov/trademarks/basics/what-trademark">USPTO, “What is a trademark?”</a>
        </li>
        <li>
          <a href="https://www.uspto.gov/trademarks/basics/why-register-your-trademark">
            USPTO, “Why register your trademark?”
          </a>
        </li>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/15/1125">15 U.S.C. § 1125(a)</a>
        </li>
        <li>
          <a href="https://variety.com/2026/music/news/elvis-eminem-sue-suno-ai-music-generator-1236941798/">
            Variety, November 7, 2026, Elvis and Eminem rightsholders sue Suno
          </a>
        </li>
        <li>
          <a href="https://frontofficesports.com/article/lebron-james-demands-ai-betting-app-stop-using-his-likeness/">
            Front Office Sports, November 5, 2026, LeBron James and Bron AI
          </a>
        </li>
      </ul>
    </BlogArticle>
  )
}
