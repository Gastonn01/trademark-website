import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/stolen-faces-tiktok-instagram-ai-likeness"
const title = "Stolen Faces: A TikTok and Instagram Network Using Real Creators"
const description =
  "The Globe and Mail reported a McGill study of 293 TikTok and Instagram accounts that reused real creators’ faces in AI videos."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "stolen faces deepfake, McGill TikTok Instagram deepfake, creator face theft, AI lip sync impersonation",
})

const faqs: FaqItem[] = [
  {
    question: "What did McGill researchers say the network did?",
    answer:
      "The Globe and Mail reported that McGill’s Centre for Media, Technology and Democracy identified 293 TikTok and Instagram accounts that “steals real people’s faces.” More than 3,000 videos added AI-drawn lips and AI-generated voices reading AI-written scripts, and drew upwards of 20 million views in three months.",
  },
  {
    question: "Did TikTok’s AI label catch the videos?",
    answer:
      "The Globe and Mail reported that TikTok’s AI-labelling system flagged just 4 percent of the videos. TikTok told the Globe it had permanently banned the TikTok accounts named in the report. The article does not say every copy, or the same method on another platform, is gone.",
  },
]

export default function StolenFacesDeepfakeNews() {
  return (
    <BlogArticle
      kicker="News · November 12, 2026"
      title={title}
      dek="The Globe and Mail reported a McGill study of accounts that start from real footage, then add a new mouth and a new voice. A ban of named accounts is not a ban of the method."
      path={path}
      description={description}
      datePublished="2026-11-20"
      faqs={faqs}
      ctaHref="/free-search?audience=creator"
    >
      <h2>What happened</h2>
      <p>
        On November 12, 2026, Murad Hemmadi at The Globe and Mail reported a study from McGill University’s Centre for
        Media, Technology and Democracy. The article is{" "}
        <a href="https://www.theglobeandmail.com/business/article-ai-deepfake-campaign-stole-influencers-faces-trade-war-alberta/">
          “AI deepfake campaign stole influencers’ faces to push trade war, Alberta referendum claims: study”
        </a>
        . The centre’s report, “Stolen Faces,” is linked from its site as{" "}
        <a href="https://mediatechdemocracy.com/files/publications/stolen-faces-incident.pdf">a PDF</a>. This page stays
        inside the Globe’s account of that report.
      </p>
      <p>
        The Globe says the centre identified a network of 293 TikTok and Instagram accounts that “steals real people’s
        faces.” More than 3,000 videos took creators’ footage and, in the form the researchers describe as typical,
        added AI-drawn lips and AI-generated voices reading AI-written scripts. The videos drew upwards of 20 million
        views in three months. The Globe says the content focused on politically sensitive topics. The centre did not
        identify who was running the network.
      </p>
      <p>
        Detection missed most of it. The Globe says TikTok’s AI-labelling system flagged just 4 percent of the videos.
        The Globe’s account of the method is that the videos start from real footage and then change the mouth and the
        voice. The same article says both human and automated viewers failed to detect the use of AI. A label that is
        looking for a fully invented face is a poor match for a real person whose lips and voice were replaced.
      </p>
      <p>
        TikTok responded. Spokesperson Danielle Morgan told the Globe: “We have permanently banned the TikTok accounts
        named in the report and, through our own investigation, we have identified and removed additional violative
        content and accounts for breaking our rules on deceptive behaviours and misleading AI-generated content.” That
        is TikTok’s statement about the accounts named to it. The Globe’s story is also about Instagram. A ban of
        named TikTok accounts is not a finding that the footage is gone everywhere.
      </p>

      <h2>Why it matters</h2>
      <p>
        You do not have to be the subject of the script to be the face in the video. The network took footage that
        already existed and changed what the person appeared to say. Creators who post their face for a living are the
        raw material. The political topic in the Globe’s story is one use. The same edit can sell a product, which is
        the fact pattern in{" "}
        <Link href="/blog/google-ads-ai-public-figure-impersonation">Google’s public-figure ad rule</Link>, or put
        words in a musician’s mouth, which is the fact pattern in the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link>.
      </p>
      <p>
        The 4 percent figure is the operational lesson. If you wait for the platform’s AI label to flag your face,
        the Globe’s account says you will miss almost all of this kind of video. Search has to be something you do.
        So does the report, with your original clip attached, because the fake is close enough to the original that a
        reviewer can treat it as real unless you show the earlier file.
      </p>
      <p>
        A trademark on your name does not put the original video back in your mouth. It is the record you attach when
        the report asks who owns the name on the real account. The{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link> and the{" "}
        <Link href="/for-creators">creator page</Link> are that part of the work. Explicit copies are a different harm,
        covered in the <Link href="/blog/paris-hilton-defiance-act-ai-likeness">Paris Hilton Defiance Act report</Link>.
      </p>

      <h2>Practical protection steps</h2>
      <h3>Trademark the name on the account</h3>
      <p>
        Register the name and the handle you use as a brand, for the channel, the appearances, and the products you
        sell. When a fake account speaks in your face, the platform question is often “prove this name is yours.” A
        registration is one way to show that. It does not copyright your face, and it does not replace a publicity
        claim. The <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link>{" "}
        walks through the filing. A <Link href="/free-search?audience=creator">free name check</Link> is a starting
        point, not a clearance and not legal advice.
      </p>
      <h3>Search for words you never said</h3>
      <p>
        Search your name and your handle, then watch for reposts that keep your face and change the script. The Globe’s
        network was found by shared titles, captions, formats, and typos, not because each video named the original
        creator. Look past the accounts you already know. Save the URL, the account, and the date the day you find it.
      </p>
      <h3>Report impersonation with the original attached</h3>
      <p>
        Report the video as impersonation. Include a link to your original video and the date you posted it. That pair,
        original and fake, is what shows the mouth and the voice were added. Add proof the name is yours, such as a
        registration or other documented ownership. Keep the confirmation. TikTok’s statement to the Globe was about
        accounts named in the report. Your report still has to be filed for a video that uses you.
      </p>
      <h3>Limit what a license may do to your face and voice</h3>
      <p>
        If you license footage, the contract should say whether the licensee may change the words, redraw the mouth,
        replace the voice, or let someone else train a model on the file. A license to repost a sketch is not a
        license to make you deliver a script you never read. Write that limit down. A platform ban after the fact is
        not the contract, and an AI label that catches 4 percent of this method is not a monitoring plan.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/google-ads-ai-public-figure-impersonation">
            Google Ads and AI impersonation of public figures
          </Link>
        </li>
        <li>
          <Link href="/blog/paris-hilton-defiance-act-ai-likeness">
            Paris Hilton and the Defiance Act
          </Link>
        </li>
        <li>
          <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">
            Protecting your voice and likeness from AI deepfakes
          </Link>
        </li>
      </ul>

      <h2>Source</h2>
      <p>
        Murad Hemmadi, “AI deepfake campaign stole influencers’ faces to push trade war, Alberta referendum claims:
        study,” The Globe and Mail, November 12, 2026.{" "}
        <a href="https://www.theglobeandmail.com/business/article-ai-deepfake-campaign-stole-influencers-faces-trade-war-alberta/">
          Read the Globe and Mail article
        </a>
        . McGill Centre for Media, Technology and Democracy, “Stolen Faces: An Inauthentic TikTok and Instagram Network
        Inflaming the U.S.–Canada Trade War.”{" "}
        <a href="https://mediatechdemocracy.com/files/publications/stolen-faces-incident.pdf">Read the report</a>.
      </p>
    </BlogArticle>
  )
}
