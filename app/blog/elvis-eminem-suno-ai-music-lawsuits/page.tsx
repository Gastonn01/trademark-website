import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/elvis-eminem-suno-ai-music-lawsuits"
const title = "Elvis and Eminem Rightsholders Sue the AI Music Generator Suno"
const description =
  "Variety reported that Elvis Presley rightsholders and Eminem publisher Eight Mile Style sued the AI music generator Suno in federal court."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords: "Elvis Suno lawsuit, Eminem Eight Mile Style, ELVIS Act Suno, AI music generator lawsuit",
})

const faqs: FaqItem[] = [
  {
    question: "Who sued Suno, according to Variety?",
    answer:
      "Variety reported a case by Elvis Presley music rightsholders, including Authentic Brands Group and Raleigh Music Publishing, in the Northern District of California, and a separate case by Eight Mile Style, which controls many Eminem recordings. Variety said Eminem is not individually participating.",
  },
  {
    question: "Has a court decided the cases?",
    answer:
      "The Variety story reports new filings and allegations, plus a statement from Suno denying that it trades on name or likeness. It does not report a judgment.",
  },
]

export default function ElvisEminemSunoNews() {
  return (
    <BlogArticle
      kicker="News · November 7, 2026"
      title={title}
      dek="Variety reported two new federal lawsuits against Suno, one of them invoking Tennessee’s ELVIS Act. The claims are allegations. Suno disputes them."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search?audience=musician"
    >
      <p>
        On November 7, 2026, Corbin Bolies at Variety reported that Elvis Presley music rightsholders and the publisher
        of many Eminem recordings filed separate federal lawsuits against the AI music generator Suno. The source is{" "}
        <a href="https://variety.com/2026/music/news/elvis-eminem-sue-suno-ai-music-generator-1236941798/">
          “Elvis Music Owners, Eminem Publisher File Sprawling New Lawsuits Against AI Music Generator Suno”
        </a>
        . This page stays inside that report.
      </p>
      <p>
        Variety says the Presley lawsuit was brought by a group that includes Authentic Brands Group, Raleigh Music
        Publishing, and others, in the Northern District of California. The story says the complaint accuses Suno of
        copyright infringement and of exploiting Presley’s identity when users cite his name to generate songs. It
        says the plaintiffs claimed, in a 51-page filing, that Suno violated Tennessee’s Ensuring Likeness Voice and
        Image Security Act, the ELVIS Act, a 2024 law, by allowing users to generate tracks that mirror Presley’s
        vocal timbre without permission. Variety describes the ELVIS Act as a law that prevents AI companies from
        cloning singers’ voices. What the statute itself says is covered in the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link>, which cites
        the governor’s office and the code.
      </p>
      <p>
        Eight Mile Style filed its own case. Variety says the company controls hundreds of Eminem recordings,
        including “Lose Yourself,” “Without Me,” and “The Real Slim Shady,” and alleges copyright infringement from
        songs and lyrics that mirror those tracks. Eminem is not individually participating.
      </p>
      <p>
        A Suno spokesperson told Variety the product is for new, original music, that Suno prohibits unauthorized use
        of an artist’s work, and that it does not allow prompts for specific artists’ names and songs. That is the
        company’s position. The complaints are allegations. Variety does not report a judgment.
      </p>

      <h2>What this means for you</h2>
      <p>
        Variety describes two kinds of claims. Copyright is about particular songs and lyrics. The ELVIS Act allegation
        is about a voice, under a Tennessee statute, in a California federal case. Neither claim is a ruling, and a
        similar musical style is not what the story says the plaintiffs pleaded.
      </p>
      <p>
        What you can do now is more ordinary. A stage name used on recordings and merch can be a trademark for those
        goods and services. That registration helps when someone uses the name as a brand. It does not replace a
        copyright in a song, and it does not enact the ELVIS Act outside its own terms. Read the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">deepfake guide</Link> before you cite a bill or
        a state statute, and the{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link> if the thing
        you need to lock down is the name. The <Link href="/for-musicians">musician page</Link> and the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link> sit next to both.
      </p>
      <p>
        If the name is the brand, run a <Link href="/free-search?audience=musician">free name check</Link> before a
        lookalike files first. The check is a starting point, not a clearance and not legal advice.
      </p>

      <h2>Source</h2>
      <p>
        Corbin Bolies, “Elvis Music Owners, Eminem Publisher File Sprawling New Lawsuits Against AI Music Generator
        Suno,” Variety, November 7, 2026.{" "}
        <a href="https://variety.com/2026/music/news/elvis-eminem-sue-suno-ai-music-generator-1236941798/">
          Read the Variety article
        </a>
        .
      </p>
    </BlogArticle>
  )
}
