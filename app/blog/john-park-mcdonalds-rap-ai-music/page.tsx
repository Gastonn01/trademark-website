import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/john-park-mcdonalds-rap-ai-music"
const title = "John Park’s McDonald’s Order Rap Showed Up Under Another Name"
const description =
  "SBS News reported that John Park’s unreleased McDonald’s Order Rap was uploaded to Spotify and YouTube Music under another artist’s name."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "John Park McDonald's Order Rap, Yoyotina, AI voice cloning Spotify, Music Farm, unreleased song impersonation",
})

const faqs: FaqItem[] = [
  {
    question: "Was John Park’s McDonald’s Order Rap an official release?",
    answer:
      "SBS News reported that the track, made with Kwak Jin-eon, had not been officially released. The upload SBS described was a separate registration on Spotify and YouTube Music under the name Yoyotina.",
  },
  {
    question: "Did SBS report that a court found AI voice cloning?",
    answer:
      "No. SBS reported that the upload adds a chorus that is not in the original, which raised suspicions that AI voice cloning was used to mimic Park’s voice. That is a suspicion in the reporting, not a judgment.",
  },
]

export default function JohnParkAiRapNews() {
  return (
    <BlogArticle
      kicker="News · November 11, 2026"
      title={title}
      dek="SBS News reported an unreleased viral rap, registered on streaming services under someone else’s name. The agency says it did not consent. No court has decided the case."
      path={path}
      description={description}
      datePublished="2026-11-20"
      faqs={faqs}
      ctaHref="/free-search?audience=musician"
    >
      <h2>What happened</h2>
      <p>
        On November 11, 2026, SBS News reported that singer John Park’s “McDonald’s Order Rap,” made with Kwak Jin-eon,
        had been registered on overseas streaming services without permission. The English-language report is{" "}
        <a href="https://news.sbs.co.kr/english/article.do?news_id=N1008840959">
          “Singer John Park’s McDonald’s Order Rap Plagiarized Overseas… Agency Taking Steps to Remove Track”
        </a>
        . This page stays inside that reporting.
      </p>
      <p>
        SBS says Music Farm Entertainment confirmed that the track, written by Park and Kwak and composed and arranged
        by Park, was registered and distributed without prior consent from the agency or the original creators. The
        upload went up on November 2 on Spotify and YouTube Music, under the title “McDonald’s” and the artist name
        “Yoyotina,” through Jungle Entertainment Ventures, a distributor based in Nigeria. The rap itself was never
        officially released.
      </p>
      <p>
        SBS also reported a difference between the viral version and the file on the platforms. The upload adds a
        chorus that is not in the original. That addition raised suspicions that AI voice cloning was used to mimic
        Park’s voice. A suspicion in a news report is not a forensic finding, and SBS did not report a judgment.
      </p>
      <p>
        Music Farm says no consent was given. The agency said it is in discussions with the platforms and relevant
        organizations to remove the track and stop further distribution, and that it is reviewing what else is needed
        to protect the creators. Those are the steps the agency described. They are not a confirmation that the file
        is already gone.
      </p>

      <h2>Why it matters</h2>
      <p>
        The song did not have to be on sale to be taken. It had to be recognizable. A clip that spreads because people
        like the voice is also a clip someone can re-title, add a section to, and send through a distributor under a
        different artist name. Park’s name is not even the name on the release. Yoyotina is. Listeners who search the
        song may never see the person who made it, and the person who made it finds a finished track they did not
        deliver.
      </p>
      <p>
        Spotify’s own answer to the neighboring problem, music that shows up on the right profile by mistake or on
        purpose, is{" "}
        <Link href="/blog/spotify-artist-profile-protection">Artist Profile Protection</Link>. That tool lets an artist
        take their name off a bad credit on Spotify. It does not stop a distributor from uploading an unreleased
        performance under a new name, and it does not cover YouTube Music. Musicians and creators hit the same wall
        when a voice preset ships without a conversation, which is what Voice Over Herald reported about{" "}
        <Link href="/blog/voicemod-cyn-voice-allanah-fitzgerald">Voicemod and Allanah Fitzgerald</Link>.
      </p>
      <p>
        Going viral is the moment the file is easiest to lift, and it is also the moment a platform will ask you to
        prove the name and the recording are yours. The <Link href="/for-musicians">musician page</Link> and the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link> are written for that
        proof. The <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link> is
        the one to read before you call a suspicion a legal conclusion.
      </p>

      <h2>Practical protection steps</h2>
      <h3>Trademark the name on the music</h3>
      <p>
        Register the artist name you want on the recording, the channel, and the merch. An unreleased song can still
        be a brand problem the day someone else releases it under a name that points at you, or strips your name off
        and keeps the performance. A registration is evidence for the goods and services you listed. It is not a
        copyright in the rap, and it does not by itself prove that a chorus was synthesized. The{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link> is the filing
        overview. A <Link href="/free-search?audience=musician">free name check</Link> is a starting point, not a
        clearance and not legal advice.
      </p>
      <h3>Keep the original, with a date, before the clip spreads</h3>
      <p>
        Save the session, the video, and the upload date of the version you actually made. When a later file adds a
        chorus, the comparison is the evidence. Search your name, the song’s nickname, and the collaborator’s name on
        Spotify, YouTube Music, and anywhere else you distribute. Do it again after a video blows up, not only on
        release day.
      </p>
      <h3>Report the copy with the original attached</h3>
      <p>
        Screenshot the fake release, the artist name on it, the distributor credit, and the date. Report it to the
        platform as impersonation or as copyright, depending on what was taken: your name as the brand, or a specific
        recording you own. Include the link to your original and the date you posted it. Music Farm’s path, as SBS
        described it, is a removal request plus a request to stop further distribution. Keep every confirmation. A
        request is not a court order.
      </p>
      <h3>Say what a collaborator may do with the voice</h3>
      <p>
        A feature, a brand film, or a distributor agreement should say whether anyone else may release the
        performance, add new sections, or train a model on the vocal. Consent to appear in a video is not consent to
        a streaming release under another artist’s name. Write the limit down while the relationship is friendly.
        You will need that page if the file shows up somewhere you did not send it.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/spotify-artist-profile-protection">Spotify Artist Profile Protection</Link>
        </li>
        <li>
          <Link href="/blog/voicemod-cyn-voice-allanah-fitzgerald">
            Voicemod’s Cyn voice and Allanah Fitzgerald
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
        “Singer John Park’s McDonald’s Order Rap Plagiarized Overseas… Agency Taking Steps to Remove Track,” SBS News,
        November 11, 2026.{" "}
        <a href="https://news.sbs.co.kr/english/article.do?news_id=N1008840959">Read the SBS News article</a>.
      </p>
    </BlogArticle>
  )
}
