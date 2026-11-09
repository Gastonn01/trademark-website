import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/lebron-james-bron-ai-likeness-cease-and-desist"
const title = "LeBron James’s Team Told Bron AI to Stop Using His Likeness"
const description =
  "Front Office Sports reported that LeBron James’s team, and Luka Dončić’s camp, sent cease-and-desist letters to the AI betting app Bron AI."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords: "LeBron James Bron AI, Luka Doncic cease and desist, AI likeness athlete, NIL deepfake betting app",
})

const faqs: FaqItem[] = [
  {
    question: "Did a court rule that Bron AI infringed LeBron James’s rights?",
    answer:
      "Front Office Sports reported demand letters, not a judgment. A cease-and-desist is a request to stop. It does not decide the case.",
  },
  {
    question: "Who else sent a letter, according to the story?",
    answer:
      "A representative for Luka Dončić told Front Office Sports that Dončić’s camp also sent a cease-and-desist to Bron AI. The story says the ad included images of other athletes as well.",
  },
]

export default function LebronBronAiNews() {
  return (
    <BlogArticle
      kicker="News · November 5, 2026"
      title={title}
      dek="Front Office Sports reported two cease-and-desist letters over an AI betting promo. Here is what that story says, and what it does not decide."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search?audience=athlete"
    >
      <p>
        On November 5, 2026, Ben Horney at Front Office Sports reported that LeBron James’s team sent a
        cease-and-desist letter to Bron AI, an AI sports-betting app, over a promotion that used his likeness. A
        representative for Luka Dončić told the same outlet that Dončić’s camp sent a letter too. The source is{" "}
        <a href="https://frontofficesports.com/article/lebron-james-demands-ai-betting-app-stop-using-his-likeness/">
          “LeBron James Demands AI Betting App Stop Using His Likeness”
        </a>
        . This page does not add facts beyond that article.
      </p>
      <p>
        James’s spokesperson told Front Office Sports: “LeBron is in no way affiliated with this unauthorized use of
        his likeness.” The letter, from Grubman Shire Meiselas &amp; Sacks, objects to use of James’s name, nickname,
        likeness, image, and persona. Front Office Sports says it calls the use especially serious because James has
        an exclusive Polymarket endorsement, and because the ad implies he is involved in betting on basketball. The
        letter demands a permanent stop, removal of the ad, and written notice to users that James is not involved.
      </p>
      <p>
        The promo on X is described as a character who resembles James, wears a “Bron” jersey with the number 23, and
        speaks in a voice that resembles his. The story says the CEO’s post drew more than 900,000 views in less than
        a day, that the ad later came off X, and that it was still on Instagram when the article ran. It also included
        a photo of Luka Dončić and images of other players. Bron AI is described as an app that pulls odds so users
        can bet on other apps, owned by PlayVision Inc. The companies did not comment. Lawyers quoted in the story
        called the ad a publicity and possible false-endorsement problem. Those are comments, not a ruling.
      </p>

      <h2>What this means for you</h2>
      <p>
        A demand letter is a serious step and an unfinished one. Nothing in the Front Office Sports report says a
        court ordered Bron AI to stop, awarded damages, or decided which state’s law applies. The part worth copying
        is the pattern: a nickname, a number, a face, and a voice, used together in a commercial so people think an
        athlete is involved.
      </p>
      <p>
        Save the URL and a copy the same day. A trademark helps when your name is used as a brand or to imply a
        sponsorship. Face and voice disputes also depend on state publicity law, which is not uniform. Read the{" "}
        <Link href="/blog/athlete-nil-name-image-likeness-protection">athlete NIL guide</Link>, the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link>, and the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator guide</Link>. The{" "}
        <Link href="/for-athletes">athlete page</Link> is the service page next to them.
      </p>
      <p>
        Before a nickname becomes the thing sponsors and copycats both use, see whether it is already on a register. A{" "}
        <Link href="/free-search?audience=athlete">free name check</Link> is a starting point, not a clearance, and it
        is not legal advice.
      </p>

      <h2>Source</h2>
      <p>
        Ben Horney, “LeBron James Demands AI Betting App Stop Using His Likeness,” Front Office Sports, November 5,
        2026, updated the same day.{" "}
        <a href="https://frontofficesports.com/article/lebron-james-demands-ai-betting-app-stop-using-his-likeness/">
          Read the Front Office Sports article
        </a>
        .
      </p>
    </BlogArticle>
  )
}
