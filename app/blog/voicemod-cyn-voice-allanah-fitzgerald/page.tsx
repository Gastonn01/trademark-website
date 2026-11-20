import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/voicemod-cyn-voice-allanah-fitzgerald"
const title = "Voicemod’s Cyn Voice: Allanah Fitzgerald Says She Was Never Asked"
const description =
  "Voice Over Herald reported that Allanah Fitzgerald, who voices Cyn, said Voicemod offered a Cyn voice changer she never approved."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "Voicemod Cyn voice, Allanah Fitzgerald, Murder Drones voice changer, AI voice consent, Dryn Voicemod",
})

const faqs: FaqItem[] = [
  {
    question: "Did a court decide that Voicemod copied Allanah Fitzgerald’s voice?",
    answer:
      "No. Voice Over Herald reported Fitzgerald’s posts and what the Voicemod listing said. It did not report a lawsuit, a judgment, or a finding about which recordings the Dryn voice was built from.",
  },
  {
    question: "What did Voicemod say about consent, according to Voice Over Herald?",
    answer:
      "The Herald pointed to Voicemod’s earlier statement that its AI voices use ethically sourced, licensed data with full consent. The same article said Voicemod had not publicly replied to Fitzgerald by Sunday afternoon, New York time.",
  },
]

export default function VoicemodCynVoiceNews() {
  return (
    <BlogArticle
      kicker="News · November 16, 2026"
      title={title}
      dek="Voice Over Herald reported a free Cyn voice-changer promo and the reply from the actor who voices Cyn. Her posts are allegations. The article does not report a ruling."
      path={path}
      description={description}
      datePublished="2026-11-20"
      faqs={faqs}
      ctaHref="/free-search?audience=creator"
    >
      <h2>What happened</h2>
      <p>
        On November 16, 2026, Theo Lindgren at Voice Over Herald reported that voice-changer company Voicemod had
        offered a free “Cyn voice changer from Murder Drones,” and that Allanah “Fitzy” Fitzgerald, the actor who
        voices Cyn, said she was never asked. The source is{" "}
        <a href="https://www.voiceoverherald.com/voicemod-cyn-voice-changer-murder-drones-allanah-fitzgerald-never-asked/">
          “Voicemod Advertised a Free Cyn Voice Changer. Murder Drones’ Allanah Fitzgerald Says She Was Never Asked”
        </a>
        . This page stays inside that report.
      </p>
      <p>
        The Herald says the post went up on Voicemod’s X account at 7 p.m. UTC on Saturday, November 14, with a short
        video and the line “FREE Cyn voice changer from Murder Drones,” plus a promo code. Inside the app, the Herald
        says, the redeemed voice is not called Cyn. It is called Dryn. The company’s voice-library page lists Dryn as
        an “Official AI Voice,” says it was “Crafted by Voicemod,” and does not name Cyn, Murder Drones, Glitch
        Productions, or Fitzgerald. It also does not say whose recordings, if anyone’s, the voice was built from.
      </p>
      <p>
        Fitzgerald replied early on Sunday. The Herald quotes her: the company “has taken my voice and is selling it
        to people who use their platform,” and “I did not approve this, I was not even ASKED.” Those are her words
        about what she believes happened. They are not a court finding that a particular recording was copied.
      </p>
      <p>
        The Herald also notes what Voicemod has said about its process in general. When Voicemod launched Voicelab 2.0
        in July 2025, its announcement said its “AI voices are built using ethically sourced, licensed data with full
        consent.” The Herald says that statement does not answer Fitzgerald’s question about Dryn, and that the
        company had not publicly responded by Sunday afternoon, New York time. The promotional post was still up.
      </p>

      <h2>Why it matters</h2>
      <p>
        Two names are doing different jobs. The ad uses the character’s name, Cyn, which tells a buyer whose
        performance they think they are getting. The product page uses Dryn and describes an official voice the
        company crafted, without saying whose voice it is. For a working actor, that gap is the problem. Fans search
        the character. The listing they land on does not have to use the actor’s name to trade on the performance.
      </p>
      <p>
        The same pattern shows up away from animation. A musician’s stage name, a creator’s handle, and an athlete’s
        nickname are how strangers ask a tool for “that voice.” A preset, a filter, or an “official AI voice” can
        sit on a store page while the person whose identity is being sold finds out from a fan. Voice Over Herald
        does not say every similar preset is unlawful. It shows why consent has to be settled before the promo goes
        up, not after the replies start.
      </p>
      <p>
        A trademark on the name you perform under does not, by itself, decide whether a model was trained on your
        sessions. Publicity and contract rules are the closer tools for a voice. The trademark is still the paperwork
        platforms ask for when your name is the thing on the product. Read the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link> before you
        treat a state statute as if it applied everywhere, and the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link> for the name as a brand.
        The <Link href="/for-creators">creator page</Link> and the <Link href="/for-musicians">musician page</Link>{" "}
        sit next to both.
      </p>

      <h2>Practical protection steps</h2>
      <h3>Trademark the name you perform under</h3>
      <p>
        Register the name audiences already use for you, for the services you actually sell: voice work, live shows,
        recordings, merch, or a channel. A registration is evidence that you own that brand for those goods and
        services. It is not a copyright in a session, and it is not a ban on every impression of a character. The{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link> covers
        eligibility and classes. Start with a{" "}
        <Link href="/free-search?audience=creator">free name check</Link>. The check is a starting point, not a
        clearance, and it is not legal advice.
      </p>
      <h3>Put voice consent in the contract</h3>
      <p>
        Before a studio, a game, or a tool company records you, the writing should say whether they may train a
        model, build a preset, sell that preset, or let someone else do those things. “You were hired to voice the
        character” and “you licensed an AI replica of your voice” are different deals. If AI replicas are out of
        scope, the contract should say so. A later marketing line about ethically sourced data is not a substitute
        for your signature on the use they are selling.
      </p>
      <h3>Monitor the libraries, not only the mentions of your name</h3>
      <p>
        Search your name, the character names you are known for, and the voice-changer and AI-voice catalogs. The
        Herald’s point is that the promo used Cyn while the library page used Dryn. A search that only looks for
        your legal name will miss a product named after the role. Save the post, the in-app name, the date, and a
        copy of the listing the day you see it.
      </p>
      <h3>Ask for a takedown with the right label</h3>
      <p>
        Report impersonation or synthetic media when the harm is a voice presented as yours. Use a trademark report
        when your name or the brand you own is used as the product name or to suggest you approved it. Use a
        copyright report only when a specific recording you own was copied. Sending the wrong form wastes the week.
        The <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">deepfake guide</Link> separates those
        routes. Keep the platform’s confirmation. A demand letter is a request, not a judgment.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">
            Protecting your voice and likeness from AI deepfakes
          </Link>
        </li>
        <li>
          <Link href="/blog/john-park-mcdonalds-rap-ai-music">
            John Park’s McDonald’s Order Rap showed up under another name
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-trademark-a-username-or-brand-name">
            How to trademark a username or brand name
          </Link>
        </li>
      </ul>

      <h2>Source</h2>
      <p>
        Theo Lindgren, “Voicemod Advertised a Free Cyn Voice Changer. Murder Drones’ Allanah Fitzgerald Says She Was
        Never Asked,” Voice Over Herald, November 16, 2026.{" "}
        <a href="https://www.voiceoverherald.com/voicemod-cyn-voice-changer-murder-drones-allanah-fitzgerald-never-asked/">
          Read the Voice Over Herald article
        </a>
        .
      </p>
    </BlogArticle>
  )
}
