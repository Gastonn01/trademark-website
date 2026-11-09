import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/athlete-nil-name-image-likeness-protection"
const title = "Athlete NIL Protection: Name, Image, and Likeness"
const description =
  "How athletes protect a name, nickname, and logo, how NIL deals differ from a trademark, and what AI or deepfake misuse changes. Start with a free name check."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "NIL trademark, athlete name image likeness, trademark athlete nickname, NIL deal trademark, athlete deepfake",
})

const faqs: FaqItem[] = [
  {
    question: "Is an NIL deal the same as a trademark?",
    answer:
      "No. An NIL deal is a contract that pays you for use of your name, image, or likeness. A trademark is a brand right in a name, nickname, logo, or phrase used with specific goods or services. You can have one without the other. A deal does not register a trademark, and a trademark application does not make a deal compliant with NCAA or league rules.",
  },
  {
    question: "Can an athlete trademark a nickname or a logo?",
    answer:
      "Yes, if the nickname or logo identifies the source of goods or services, such as merch, a camp, or media, and it clears the usual USPTO bars. A name that identifies a living person needs that person’s written consent. A mark that is primarily merely a surname can be refused unless it has become distinctive. A jersey number or a common gesture is often harder because it may not function as a brand.",
  },
  {
    question: "Do college NIL rules replace trademark law?",
    answer:
      "They do not. NCAA and College Sports Commission rules govern eligibility and certain NIL payments, including reporting of third-party deals of $600 or more and a valid-business-purpose test for associated entities. Trademark registration is a USPTO process. School rules and league rules can add more limits. Check the current NCAA page and your school before you sign.",
  },
  {
    question: "Will a trademark stop an AI ad that uses my face?",
    answer:
      "It helps when the ad uses your name or logo as a brand or implies you endorse the product. A generated face or voice can also implicate state publicity law. In November 2026, Front Office Sports reported cease-and-desist letters over an AI betting promo that evoked LeBron James and Luka Dončić. That report is a demand-letter story, not a court ruling.",
  },
  {
    question: "Does a US athlete trademark cover other countries?",
    answer:
      "A USPTO registration covers the United States and its territories. Events, sponsors, and merch in the United Kingdom or the European Union need their own filings. Publicity rules differ by country as well.",
  },
]

export default function AthleteNilGuide() {
  return (
    <BlogArticle
      kicker="Guide for athletes"
      title={title}
      dek="NIL is the right to be paid for your identity. A trademark is how a name or logo functions as a brand. Athletes need both ideas, and they are not substitutes."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search?audience=athlete"
    >
      <p>
        Athletes hear “NIL” used for almost everything: a sponsorship, a trademark, a school payment, a social post, a
        deepfake. Those are different tools. Name, image, and likeness describe the identity a sponsor wants to use. A
        trademark is a word, phrase, symbol, or design that tells buyers the source of a product or a service. A league
        rule is neither. Treating them as one decision is how a name ends up on a product you do not control, or how a
        filing sits outside the goods you actually sell.
      </p>
      <p>
        This guide is US-focused. <Link href="/for-athletes">Athlete trademark help</Link> is the matching service
        page. Creators who are not in sport should use the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">creator name and likeness guide</Link>. The{" "}
        <Link href="/free-search?audience=athlete">free name check</Link> is the practical first step for the string
        you want to own.
      </p>

      <h2>What you can register</h2>
      <p>
        The USPTO says a trademark identifies your goods or services and distinguishes them from competitors. It also
        says you do not own the word in general, only the way it is used with the listed goods or services. For an
        athlete, those goods and services are often merch, a camp or clinic, entertainment services, or a media
        project. The legal name, a nickname, a logo, and a phrase can each be a separate mark. They are not one
        application by default.
      </p>
      <p>
        A nickname that fans already use on shirts can function as a brand. A logo you use on that merch can be filed
        as a design mark. A jersey number, standing alone, often fails to tell buyers who made the shirt, and a
        celebration or a gesture is not automatically a trademark. This site’s earlier piece on{" "}
        <Link href="/blog/cole-palmer-celebration-trademark">Cole Palmer’s celebration</Link> is a discussion of that
        kind of question, not a ruling that a gesture is registrable.
      </p>
      <p>
        Federal bars still apply. <a href="https://www.law.cornell.edu/uscode/text/15/1052">15 U.S.C. § 1052(c)</a>{" "}
        refuses a mark that identifies a particular living individual unless that person consents in writing. If the
        mark is your own name, that consent is yours to give. If it identifies a teammate, a family member, or anyone
        else, you need theirs. Section 1052(e)(4) allows a refusal when the mark is primarily merely a surname.
        Section 1052(f) lets an applicant prove the mark has become distinctive. The statute permits the USPTO to
        treat five years of substantially exclusive and continuous use as prima facie evidence. It does not promise
        that the evidence will be accepted.
      </p>
      <p>
        School names, league marks, and team logos are someone else’s trademarks. Putting your nickname next to a team
        crest on a shirt does not make the crest yours, and an application that copies a team mark is a conflict
        waiting to happen. Describe your own brand, not the uniform.
      </p>

      <h2>What registration adds, and what it leaves alone</h2>
      <p>
        Use of a name as a brand can create common-law rights limited to the area of that use. The USPTO’s{" "}
        <a href="https://www.uspto.gov/trademarks/basics/why-register-your-trademark">registration benefits</a> are
        nationwide notice, a presumption of ownership, a basis for filing in other countries, access to federal court,
        the ® symbol for the listed goods, and the option to record with Customs. The office does not police infringers
        for you. You may use TM before registration. You may use ® only after registration, and only on the goods or
        services in the certificate.
      </p>
      <p>
        A registration does not approve an NIL contract, satisfy a school compliance office, or answer a league rule
        about gambling, uniforms, or sponsors. It does not copyright a game photo. It does not give you a worldwide
        right. The <Link href="/trademark-registration/united-states">United States page</Link> is the US filing. The{" "}
        <Link href="/trademark-registration/united-kingdom">United Kingdom</Link> and the{" "}
        <Link href="/trademark-registration/european-union">European Union</Link> are separate. There is no worldwide
        registration.
      </p>

      <h2>NIL deals</h2>
      <p>
        The NCAA describes an NIL deal as an agreement that pays you, in money, products, or services, for use of your
        name, image, or likeness. Examples it lists include social posts, appearances, camps, and endorsements. Its
        public guidance says a deal is allowed when you are paid for that use, the deal has a valid business purpose
        tied to a real product, service, or event, and the compensation is in a reasonable range. It says pay with no
        deliverables, pay-for-play, and payment for athletics participation or achievement are not allowed. Agents are
        permitted for NIL activities. That summary is the NCAA’s own page,{" "}
        <a href="https://www.ncaa.org/student-athletes/name-image-likeness/">Name, Image and Likeness</a>, and it can
        change. Your division, your school, and your conference can be stricter.
      </p>
      <p>
        On June 6, 2025, Judge Claudia Wilken approved the House v. NCAA settlement. The College Sports Commission
        describes that settlement as allowing participating schools to share revenue with student-athletes, and as
        requiring Division I student-athletes to report third-party NIL deals with a total value of $600 or more. Later
        NCAA bylaws, which the Commission says it enforces, also limit payments from entities associated with a school:
        the deal needs a valid business purpose and compensation in a reasonable range, and pay-for-play is not that
        purpose. Read{" "}
        <a href="https://www.collegesportscommission.org/about/the-house-settlement/">the Commission’s settlement page</a>{" "}
        and your compliance office. This guide is not an eligibility opinion.
      </p>
      <p>
        A contract can also give a sponsor permission to use your name, or even an exclusive right in a category, for
        a period of time. That permission is not a trademark assignment unless the contract says so and the assignment
        is done properly. Read what you are licensing, for how long, in which territory, and whether you can still file
        the name in your own name. If a sponsor wants to own the trademark in your nickname, that is a different deal
        from a one-season endorsement.
      </p>

      <h2>AI, deepfakes, and lookalike promos</h2>
      <p>
        On November 5, 2026, Front Office Sports reported that LeBron James’s team sent a cease-and-desist to Bron AI,
        an AI betting app, and that a representative for Luka Dončić said his camp did the same. The story describes a
        promo with a character who resembles James, a “Bron” jersey with the number 23, and a similar voice. That is a
        news report about demand letters, not a judgment. The write-up is here:{" "}
        <Link href="/blog/lebron-james-bron-ai-likeness-cease-and-desist">
          LeBron James’s team told Bron AI to stop using his likeness
        </Link>
        .
      </p>
      <p>
        The pattern is the one athletes should plan for. A company uses a nickname, a number, a face, and a voice so
        viewers think you are involved. State publicity law is the tool aimed at commercial use of identity, and it
        varies. Federal trademark law can matter when the use is of your name as a brand or when the ad is likely to
        confuse people about sponsorship. <a href="https://www.law.cornell.edu/uscode/text/15/1125">Section 43(a)</a>{" "}
        is the false-association provision. It is not a shortcut that wins every dispute.
      </p>
      <p>
        Tennessee’s ELVIS Act is a state update that expressly covers a simulated voice. The proposed federal NO FAKES
        Act would create a digital-replica right if it ever becomes law. It has not. Both are explained, with sources,
        in the <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">voice and likeness guide</Link>. League
        rules on gambling and endorsements are a third layer. A trademark filing does not clear you to appear, or to
        seem to appear, in a betting ad.
      </p>

      <h2>Steps that are worth doing before a dispute</h2>
      <ol>
        <li>List your legal name, the nicknames you actually use, logos, and phrases. Circle the ones that appear on products or services, not just in a chant.</li>
        <li>
          Write the goods and services in normal words. On this site’s class list, clothing is class 25, games and
          sporting goods are class 28, and entertainment is class 41. A camp, a shirt line, and a show can sit in
          different classes. The <Link href="/blog/trademark-classification">classification guide</Link> explains why
          one class rarely covers a whole career.
        </li>
        <li>
          Run a <Link href="/free-search?audience=athlete">free name check</Link>, then look for unregistered uses the
          federal database will miss. The USPTO says common-law rights will not all show up there.
        </li>
        <li>
          Confirm the owner. If a loan-out company or an LLC will own the brand, the application should say so. If you
          will own it personally, do not list the school.
        </li>
        <li>
          Read every NIL contract for territory, exclusivity, who owns the content, and whether you are assigning a
          trademark. Keep a copy of anything you did not authorize: URL, date, and a screenshot.
        </li>
        <li>
          Report impersonation through the platform’s form, and keep the ticket. Choose copyright only when a specific
          photo or video you own was copied. Choose a trademark report when your name or logo is being used as a
          brand.
        </li>
      </ol>

      <h2>When to file</h2>
      <p>
        File when you are using the mark on real goods or services, or when you have a real intent to do that soon.
        The USPTO distinguishes use in commerce from intent to use. A signing-day announcement, by itself, is not a
        specimen of trademark use. A merch page, a camp registration page, or packaging that shows the mark can be.
      </p>
      <p>
        Sensible moments are the first merch run, the first camp under your own name, a nickname that has become the
        brand, and any sign that someone else is filing a similar name for related products. You do not need a
        national profile. You do need a mark that functions as a source identifier, a clear owner, and a class list
        that matches the business. Prices for a US filing are the published figures on the{" "}
        <Link href="/trademark-registration/united-states">United States page</Link>, discussed further in the{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">username and brand-name guide</Link>. This page
        does not restate them.
      </p>

      <h2>Outside the United States</h2>
      <p>
        A bootleg shirt in another country is a local trademark problem. A foreign broadcast that uses your face is a
        local publicity or image-rights problem, and many countries do not use the US “NIL” label at all. If you play,
        train, or sell in the UK or the EU, look at those country pages before a sponsor drafts a worldwide clause.
        Rules vary, and a US registration does not travel with your passport.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/lebron-james-bron-ai-likeness-cease-and-desist">Bron AI cease-and-desist report</Link>
        </li>
        <li>
          <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">Voice and likeness deepfake guide</Link>
        </li>
        <li>
          <Link href="/blog/how-creators-protect-name-brand-and-likeness">Creator name, brand, and likeness guide</Link>
        </li>
        <li>
          <Link href="/for-athletes">For athletes</Link>
          {" · "}
          <Link href="/for-creators">for creators</Link>
          {" · "}
          <Link href="/for-musicians">for musicians</Link>
        </li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://www.uspto.gov/trademarks/basics/what-trademark">USPTO, “What is a trademark?”</a>
        </li>
        <li>
          <a href="https://www.uspto.gov/trademarks/basics/why-register-your-trademark">
            USPTO, “Why register your trademark?”
          </a>
        </li>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/15/1052">15 U.S.C. § 1052</a>
        </li>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/15/1125">15 U.S.C. § 1125(a)</a>
        </li>
        <li>
          <a href="https://www.ncaa.org/student-athletes/name-image-likeness/">NCAA, Name, Image and Likeness</a>
        </li>
        <li>
          <a href="https://www.collegesportscommission.org/about/the-house-settlement/">
            College Sports Commission, the House settlement
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
