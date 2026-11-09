import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/how-to-trademark-a-username-or-brand-name"
const title = "How to Trademark a Username or Brand Name"
const description =
  "A social handle is not a trademark. See eligibility, classes, the US process, and this site’s published US prices, then run a free name check."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "trademark a username, trademark a brand name, social handle trademark, USPTO classes, trademark cost United States",
})

const faqs: FaqItem[] = [
  {
    question: "If I own the social handle, do I own the trademark?",
    answer:
      "No. The platform controls the account under its terms. A trademark is a right in a name used with specific goods or services. You can have the handle and still have no registration, and you can have a registration without controlling every lookalike account.",
  },
  {
    question: "Can every brand name be registered?",
    answer:
      "No. The USPTO can refuse a mark that is merely descriptive, primarily merely a surname, likely to be confused with an earlier mark, or that identifies a living person without written consent. A distinctive name used as a brand is in a stronger position than a name that simply describes the product.",
  },
  {
    question: "Which class should I pick?",
    answer:
      "Pick the classes that match what you actually sell or provide. On this site’s plain-language list, clothing is class 25, entertainment and education are class 41, electronics and software are class 9, and advertising or retail services are class 35. The USPTO requires a specific identification of goods and services. One class does not cover an entire business.",
  },
  {
    question: "How much does a US filing cost on this site?",
    answer:
      "The United States page lists $1,010 USD for one class and $499 USD for each additional class. Two classes on those published figures are $1,010 plus $499, which is $1,509 USD. The same page also shows GBP and EUR. These are Just Protected’s published prices, not a government fee table. Check the page before you pay, because a published price can be updated.",
  },
  {
    question: "How long does registration take?",
    answer:
      "The USPTO tells applicants to check current processing times, and those times change. This page does not quote a fixed number of months. A registration lasts only if you keep using the mark and file maintenance documents, including a filing after five years.",
  },
]

export default function TrademarkUsernameGuide() {
  return (
    <BlogArticle
      kicker="Guide"
      title={title}
      dek="A username is an account. A brand name is a trademark only when it identifies the source of goods or services. Here is the US path, including the prices this site actually publishes."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search"
    >
      <p>
        People say “trademark my username” when they mean three different things: keep the @handle, stop copycats from
        using the name, and get a USPTO registration. Only the third one is a trademark application. The handle can
        disappear under platform rules. The registration, if you get one, covers the name as a brand for the goods and
        services you list. It does not convert the account into property.
      </p>
      <p>
        The wider context for creators is the{" "}
        <Link href="/blog/how-creators-protect-name-brand-and-likeness">name, brand, and likeness guide</Link>. Athletes
        should also read the <Link href="/blog/athlete-nil-name-image-likeness-protection">NIL guide</Link>. This page
        stays on eligibility, classes, process, and price. The{" "}
        <Link href="/free-search">free name check</Link> is the search you can run before any of that.
      </p>

      <h2>What the handle gives you</h2>
      <p>
        A social platform rents you a username. The terms let the platform suspend the account, refuse a transfer, or
        leave a confusing lookalike in place. Followers, a verified badge, and a matching domain are useful. None of
        them is a federal trademark registration. The USPTO’s definition is narrower: a trademark identifies your goods
        or services and distinguishes them from others. See{" "}
        <a href="https://www.uspto.gov/trademarks/basics/what-trademark">what a trademark is</a>.
      </p>
      <p>
        So the filing is for the name, not for the @ sign and not for “Instagram” or “TikTok” as part of the mark. If
        people buy from you under the handle, the word or phrase in that handle is what you test. If the legal brand
        is different from the handle, file the brand you want to own, and treat the handle as a distribution channel.
      </p>

      <h2>Eligibility</h2>
      <p>
        The name has to function as a mark. The USPTO says a distinctive, creative mark is easier to protect than one
        that merely describes the goods. “Northside” for a creator name is a different case from “Best Weekly Recipes”
        for a recipe channel. Descriptive wording can sometimes be registered after it becomes distinctive, under{" "}
        <a href="https://www.law.cornell.edu/uscode/text/15/1052">15 U.S.C. § 1052(f)</a>. Starting with a distinctive
        name is simpler.
      </p>
      <p>
        Three refusals come up constantly for personal brands:
      </p>
      <ul>
        <li>
          Likelihood of confusion with a mark already registered or previously used, under § 1052(d). The USPTO’s{" "}
          <a href="https://www.uspto.gov/trademarks/search/likelihood-confusion">likelihood-of-confusion guidance</a>{" "}
          says related goods can matter across classes, and that marks can be similar in sound, appearance, meaning, or
          commercial impression.
        </li>
        <li>
          A name, portrait, or signature that identifies a particular living individual, unless that person consents in
          writing, under § 1052(c). Your own name is a consent you can give. Someone else’s name is not.
        </li>
        <li>
          A mark that is primarily merely a surname, under § 1052(e)(4). Distinctiveness can overcome that refusal.
          The statute says five years of substantially exclusive and continuous use may be accepted as prima facie
          evidence. It is evidence, not a guarantee.
        </li>
      </ul>
      <p>
        You also need a filing basis. The USPTO’s application system separates a use-based application from an
        intent-to-use application. Use means the name is already in commerce with the goods or services, and you can
        show a specimen. Intent to use is a real plan to use it, followed later by a statement of use or an amendment
        to allege use. The form list is on the{" "}
        <a href="https://www.uspto.gov/trademarks/apply">USPTO apply page</a>. A reserved username, with no product and
        no plan, is a weak story under either basis.
      </p>

      <h2>Classes</h2>
      <p>
        Applications are organized in international classes. This site keeps a plain-language list: class 25 is
        clothing and footwear, class 41 is education and entertainment, class 9 is electronics and software, class 35
        is advertising and retail services, class 16 is paper goods, and class 28 is games and toys. Those labels are
        a guide, not the identification you type into the form. The USPTO requires an acceptable listing of the actual
        goods and services.
      </p>
      <p>
        A creator who posts videos and sells shirts is often looking at entertainment and clothing, which are
        different classes. An athlete’s camp and merch can split the same way. A musician’s recordings and live
        performances can sit in more than one class. Read the{" "}
        <Link href="/blog/trademark-classification">classification guide</Link> and match the list to the business you
        have, not the business you might start in five years. Extra classes have a published price, below. Unused
        classes are not a free option.
      </p>

      <h2>The US process, at the level that matters</h2>
      <ol>
        <li>
          Search. The federal database is essential and incomplete. The USPTO says it does not show every common-law
          user, and it tells applicants to search the internet, state records, and business names as well. Start with
          a <Link href="/free-search">free name check</Link>, then treat the result as a lead, not a clearance.
        </li>
        <li>
          Identify the owner, the exact mark, the goods and services, and the basis (use or intent to use). If you live
          outside the United States, read the USPTO’s page on when a US-licensed attorney is required before you file.
          This guide does not restate that rule.
        </li>
        <li>
          File through the USPTO’s Trademark Center. Since January 18, 2025, that is where the office says new
          applications are filed. You need a USPTO.gov account and identity verification.
        </li>
        <li>
          Examination. An examining attorney can issue an office action. The apply page lists a response form for that
          letter. A response deadline is real. Missing it can abandon the application.
        </li>
        <li>
          Publication, and a possible opposition. Other people can challenge the application. A filing is not a
          registration.
        </li>
        <li>
          Registration, or, for an intent-to-use application, a notice of allowance and then proof of use. The USPTO
          lists the statement of use and the amendment to allege use among its intent-to-use forms.
        </li>
        <li>
          Maintenance. The registration can last if you keep using the mark and file the required documents. The USPTO
          says you must file maintenance after the registration has been registered for five years, and again later.
          Skip it and you start over.
        </li>
      </ol>
      <p>
        Processing times move. The USPTO tells you to check the current wait times rather than rely on a fixed
        estimate. This page follows that advice and does not invent a timeline. The{" "}
        <Link href="/blog/trademark-registration-process">process guide</Link> and the{" "}
        <Link href="/trademark-registration/united-states">United States registration page</Link> are the on-site
        companions.
      </p>

      <h2>Published US prices on this site</h2>
      <p>
        Cost figures in this section come only from Just Protected’s published United States prices. They are not a
        USPTO fee schedule, and they are not a quote for a dispute, a search opinion, or a filing in another country.
      </p>
      <p>
        The <Link href="/trademark-registration/united-states">United States page</Link> lists{" "}
        <strong>$1,010 USD</strong> for one class and <strong>$499 USD</strong> for each additional class. The same
        page also shows the price in GBP and EUR. Using those USD figures, an application in two classes is $1,010
        plus $499, which is <strong>$1,509 USD</strong>. Three classes would add another $499, which is $2,008 USD.
        Read the United States page for how that price is described, and check it again before you pay. A published
        price can change.
      </p>
      <p>
        Other countries have their own published prices on the{" "}
        <Link href="/detailed-pricelist">detailed price list</Link>. A US price does not include a{" "}
        <Link href="/trademark-registration/united-kingdom">United Kingdom</Link> or{" "}
        <Link href="/trademark-registration/european-union">European Union</Link> application. Those are separate
        filings because trademark rights are territorial. The USPTO says there is no worldwide registration.
      </p>

      <h2>After the filing</h2>
      <p>
        Keep using the name as a brand, on the goods you listed. Watch for confusing applications. A registration is a
        tool you enforce. The USPTO will not do that for you. Platform reports are a separate track: a trademark
        complaint fits when someone uses the name as a brand, and a copyright complaint fits when someone copied a
        work you own. Voice and face clones are discussed in the{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">deepfake guide</Link>, because a username
        filing does not decide them.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/how-creators-protect-name-brand-and-likeness">Creator name, brand, and likeness</Link>
        </li>
        <li>
          <Link href="/blog/athlete-nil-name-image-likeness-protection">Athlete NIL protection</Link>
        </li>
        <li>
          <Link href="/blog/trademark-classification">Trademark classification</Link>
        </li>
        <li>
          <Link href="/for-creators">For creators</Link>
          {" · "}
          <Link href="/for-businesses">for businesses</Link>
          {" · "}
          <Link href="/trademark-registration/united-states">United States</Link>
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
          </a>{" "}
          (common-law limits, benefits, five-year maintenance, no worldwide registration)
        </li>
        <li>
          <a href="https://www.uspto.gov/trademarks/apply">USPTO, “Apply online”</a> (Trademark Center as of January
          18, 2025; office actions; intent-to-use forms; processing times)
        </li>
        <li>
          <a href="https://www.uspto.gov/trademarks/search/likelihood-confusion">USPTO, likelihood of confusion</a>
        </li>
        <li>
          <a href="https://www.law.cornell.edu/uscode/text/15/1052">15 U.S.C. § 1052</a>
        </li>
        <li>
          <Link href="/trademark-registration/united-states">
            Just Protected United States page: $1,010 USD for one class, $499 USD for each additional class
          </Link>
        </li>
      </ul>
    </BlogArticle>
  )
}
