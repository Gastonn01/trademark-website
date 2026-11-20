import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/lebron-james-bron-ai-likeness-cease-and-desist"
const title = "LeBron James Sues the Bron App After a Cease-and-Desist Over His Likeness"
const description =
  "The Los Angeles Times reported that LeBron James and LBJ Trademarks LLC sued the Bron app’s maker after cease-and-desist letters Front Office Sports reported."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "LeBron James Bron lawsuit, LBJ Trademarks, PlayVision Bron app, LeBron cease and desist, AI likeness athlete",
})

const faqs: FaqItem[] = [
  {
    question: "Did a court rule that Bron AI infringed LeBron James’s rights?",
    answer:
      "No. Front Office Sports reported cease-and-desist letters, which are requests, not a judgment. The Los Angeles Times later reported a lawsuit filed November 17, 2026. The Times article describes the complaint. It does not report a ruling.",
  },
  {
    question: "Who sued, and who was sued, according to the Los Angeles Times?",
    answer:
      "The Times reported that LeBron James and LBJ Trademarks LLC sued PlayVision Inc. and its founders, Anish Gupta and Marc Zoghby, in U.S. District Court in New York. The complaint’s claims are allegations. The Times said it had not immediately received a response from the company.",
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
      kicker="News · Updated November 20, 2026"
      title={title}
      dek="Front Office Sports reported cease-and-desist letters on November 5. On November 19, the Los Angeles Times reported a lawsuit. Neither story is a court ruling."
      path={path}
      description={description}
      datePublished="2026-11-09"
      dateModified="2026-11-20"
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
        . The account of the letters stays inside that article. The November 19 lawsuit is a separate update below, and
        it stays inside the Los Angeles Times report.
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

      <h2>Update: November 19, 2026</h2>
      <p>
        On November 19, 2026, Chuck Schilken at the Los Angeles Times reported that LeBron James and LBJ Trademarks LLC
        had sued PlayVision Inc. and its founders over the Bron app. The Times said the civil case was filed Tuesday,
        November 17, in U.S. District Court in New York. The article is{" "}
        <a href="https://www.latimes.com/sports/story/2026-11-19/lebron-james-lawsuit-bron-app-evie-sports-betting">
          “LeBron James sues makers of ‘Bron’ app over use of nickname, likeness”
        </a>
        . What follows is that report. It is not a judgment.
      </p>
      <p>
        The Times says the San Francisco company named the app “Bron” to benefit from James’s name “without any
        connection between the word and Defendants or any feature of their app.” The complaint, as quoted by the Times,
        says: “The word ‘Bron’ has no dictionary definition and no special meaning in the context of sports analytics,
        wagering, or artificial intelligence. Rather, in the context of anything sports-related, it refers to only one
        man — LeBron James.” The defendants named in the article are PlayVision and its co-founders, Anish Gupta, the
        chief executive, and Marc Zoghby, the chief technology officer. The Times said it had not immediately received
        a response, and that the Associated Press had not immediately received one either.
      </p>
      <p>
        The Times describes an early-November ad, in the complaint’s words, of a player “with physical traits that
        mimic Mr. James, down to his identifiable tattoos,” wearing a “Bron” jersey with the number 23. The lawsuit
        says the ad gained a million views within a day. Front Office Sports had described the same promo as drawing
        more than 900,000 views on X in less than a day. Those are two reports of views, not one number. The Times
        says that after counsel sent a cease-and-desist, the defendants took the ad down while teasing a new name.
        Gupta posted on LinkedIn, “We found Bron. Apparently, the lawyers found it too,” and told followers the new
        name would come Wednesday at 10 a.m. Pacific. The Times says the new name, introduced the day the suit was
        filed, is Evie.
      </p>
      <p>
        The complaint, according to the Times, includes false endorsement, trademark infringement, false advertising,
        deceptive acts and practices, and violation of privacy and publicity. James seeks a jury trial. The relief the
        Times describes includes compensatory damages, an injunction, and an order that the company tell users and
        subscribers in writing that James has “no affiliation with Defendants and has never used, sponsored, or
        endorsed the Bron App.” Those are requests in a complaint. The Times does not report that a court granted them.
      </p>
      <p>
        He sued in his own name and through LBJ Trademarks LLC. That is the part of the Times story that travels. A
        nickname can be the brand, and the trademark company can be a plaintiff beside the person. A
        letter asked the app to stop. A lawsuit asks a court to order it. Neither one, in the reporting so far, is an
        order. Athletes in the same position still need the name on a register before the ad exists, a saved copy of
        the ad the day it runs, and a contract that says whether anyone may use the name, the number, the face, or the
        voice, including in an AI ad. The <Link href="/blog/google-ads-ai-public-figure-impersonation">Google Ads
        clarification</Link> is the platform version of the same endorsement problem. A{" "}
        <Link href="/free-search?audience=athlete">free name check</Link> is where the nickname gets tested against
        existing filings. It is not a clearance and not legal advice.
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
      <p>
        Chuck Schilken, “LeBron James sues makers of ‘Bron’ app over use of nickname, likeness,” Los Angeles Times,
        November 19, 2026.{" "}
        <a href="https://www.latimes.com/sports/story/2026-11-19/lebron-james-lawsuit-bron-app-evie-sports-betting">
          Read the Los Angeles Times article
        </a>
        .
      </p>
    </BlogArticle>
  )
}
