import Link from "next/link"
import { BlogArticle } from "@/components/blog-article"
import { pageMetadata, type FaqItem } from "@/lib/seo"

const path = "/blog/how-creators-protect-name-brand-and-likeness"
const title = "How Creators Protect Their Name, Brand, and Likeness"
const description =
  "How creators and influencers trademark a name or handle, what a trademark covers, publicity rights, deepfakes, and when to file. Then run a free name check."

export const metadata = pageMetadata({
  title: `${title} | Just Protected`,
  description,
  path,
  type: "article",
  keywords:
    "creator trademark, influencer name protection, trademark a handle, right of publicity, deepfake likeness, personal brand trademark",
})

const faqs: FaqItem[] = [
  {
    question: "Can I trademark my creator name or handle?",
    answer:
      "You can apply to register a name or handle when you use it to identify the source of goods or services, such as videos, merch, or a membership. A social account by itself is not a trademark registration. The USPTO can still refuse a name that is descriptive, primarily a surname, or that identifies a living person without written consent.",
  },
  {
    question: "Does a trademark stop deepfakes and AI clones?",
    answer:
      "A trademark helps when someone uses your name or logo as a brand, or in a way that suggests you sponsor them. A deepfake that copies a face or voice without using the name as a brand is usually a publicity, impersonation, or platform issue. Trademark registration does not automatically take that content down.",
  },
  {
    question: "What is the right of publicity?",
    answer:
      "In the United States there is no single federal publicity statute in force. States protect commercial use of identity through their own statutes and court decisions, and the details differ. Tennessee’s ELVIS Act added voice, including a simulation, to that state’s personal-rights law. The proposed federal NO FAKES Act is not law.",
  },
  {
    question: "When should a creator file?",
    answer:
      "File when you are using the name with real goods or services, or when you have a genuine plan to do so. Common moments are a merch launch, a membership, a sponsorship that puts your name on products, or the point where other people start using a similar name. Fame is not a filing requirement. A name you do not plan to use is a weak application.",
  },
  {
    question: "Does a US registration protect me in other countries?",
    answer:
      "No. A USPTO registration creates rights in the United States and its territories. The United Kingdom and the European Union are separate filings. There is no worldwide trademark registration.",
  },
]

export default function CreatorNameBrandLikenessGuide() {
  return (
    <BlogArticle
      kicker="Guide for creators and influencers"
      title={title}
      dek="Your name, your handle, and your face do different legal jobs. This guide separates the trademark, the publicity right, and the deepfake problem, then points you to a free name check."
      path={path}
      description={description}
      datePublished="2026-11-09"
      faqs={faqs}
      ctaHref="/free-search?audience=creator"
    >
      <p>
        Creators often treat a name, a handle, a logo, and a face as one asset. Audiences do that too. The law does
        not. A trademark is about who people think is the source of a product or a service. A right of publicity, where
        a state recognizes one, is about commercial use of a person’s identity. A platform rule is a contract with that
        platform. Mixing them up is how people spend money on the wrong filing, or wait until a copycat has already
        shipped merch.
      </p>
      <p>
        This page is written for creators and influencers in the United States.{" "}
        <Link href="/for-creators">Creator trademark help</Link> is the service page that sits next to this guide. If
        you are an athlete or a musician, start with the{" "}
        <Link href="/blog/athlete-nil-name-image-likeness-protection">athlete NIL guide</Link> or the{" "}
        <Link href="/for-musicians">musician page</Link>, then come back for the parts that overlap.
      </p>

      <h2>The name people already use</h2>
      <p>
        The USPTO describes a trademark as a word, phrase, symbol, design, or combination that identifies your goods
        or services and distinguishes them from someone else’s. The same office is clear about a common mistake: a
        trademark does not give you ownership of a word in general. It covers how that word is used with the goods or
        services in the registration. A logo for one kind of product does not automatically stop a similar logo on
        unrelated products. Read the USPTO’s own explanation of{" "}
        <a href="https://www.uspto.gov/trademarks/basics/what-trademark">what a trademark is</a>.
      </p>
      <p>
        For a creator, the “goods or services” might be entertainment, a clothing line, a course, a podcast, or a
        downloadable product. The name on the account is a candidate for a trademark only if it does that identifying
        job. A personal name can do it. A coined handle can do it. A phrase that simply describes the content (“daily
        makeup tips”) is a weaker candidate, because the USPTO treats merely descriptive wording as harder to protect.
      </p>
      <p>
        Two federal rules matter as soon as the mark is a person’s name. Under{" "}
        <a href="https://www.law.cornell.edu/uscode/text/15/1052">15 U.S.C. § 1052(c)</a>, a mark that consists of or
        comprises a name, portrait, or signature identifying a particular living individual is refused unless that
        person gives written consent. Under § 1052(e)(4), a mark that is “primarily merely a surname” can also be
        refused. Section 1052(f) allows some of those refusals to be overcome if the mark has become distinctive of
        the applicant’s goods in commerce. The statute says the USPTO may accept five years of substantially exclusive
        and continuous use as prima facie evidence of that distinctiveness. It does not say five years guarantees a
        registration.
      </p>
      <p>
        Consent for your own name is yours to give. A name that identifies someone else needs that person’s consent.
        The owner on the application should be the person or company that will own the brand.
      </p>

      <h2>A handle is an account. A trademark is a brand right.</h2>
      <p>
        The platform issues the username. It can suspend it, reclaim it, or allow a lookalike spelling. That
        relationship is the platform’s terms, not a USPTO registration. Owning @yourname does not create a trademark,
        and a trademark filing does not force a platform to hand over a handle.
      </p>
      <p>
        What you can do is apply to register the name itself for the goods and services you actually offer. The step
        by step of eligibility, classes, and price is in{" "}
        <Link href="/blog/how-to-trademark-a-username-or-brand-name">how to trademark a username or brand name</Link>.
        Use this page for the wider picture, and that page before you choose classes.
      </p>

      <h2>What a US registration does</h2>
      <p>
        You can own an unregistered trademark through use. The USPTO calls those common-law rights, and they are
        limited to the geographic area where you are actually using the mark. A federal registration is optional. The
        USPTO lists the reasons people still file: the mark shows up in the public database, you get a legal
        presumption of ownership and of the right to use the mark, you can use the registration as a basis for filing
        abroad, you can sue in federal court, you may use the ® symbol for the listed goods and services, and you can
        record the registration with U.S. Customs and Border Protection to stop infringing imports. The USPTO is not
        an enforcement agency. You still have to pursue infringers yourself. That list is from{" "}
        <a href="https://www.uspto.gov/trademarks/basics/why-register-your-trademark">why register your trademark</a>.
      </p>
      <p>
        You may use TM for goods, or SM for services, without a registration. You may use ® only after registration,
        and only for the goods or services in that registration. The registration can last if you keep using the mark
        and file maintenance, including a filing after five years. The USPTO’s processing times change, so this guide
        does not quote a number of months.
      </p>

      <h2>What a trademark does not do</h2>
      <p>
        A registration covers the listed goods and services. It leaves copyright in your videos and photos, patent
        law, and your contracts with sponsors and platforms where they are. It also leaves a deepfake that never uses
        your name as a brand.
      </p>
      <p>
        It is also territorial. A USPTO registration covers the United States and its territories. It does not cover
        the <Link href="/trademark-registration/united-kingdom">United Kingdom</Link> or the{" "}
        <Link href="/trademark-registration/european-union">European Union</Link>. The USPTO is explicit that there is
        no worldwide trademark registration. Other countries are separate applications. If your audience, merch, or
        sponsors sit in more than one country, plan those filings on purpose. Start with the{" "}
        <Link href="/trademark-registration/united-states">United States registration page</Link> for the US price and
        process on this site.
      </p>
      <p>
        A search of the federal register is not the whole clearance. The USPTO says that database does not include
        common-law users who never filed, and it encourages a wider search of the internet, state trademark records,
        and business-name records. A free name check is a useful first look. It is not a legal opinion that the name
        is clear.
      </p>

      <h2>Right of publicity, in plain terms</h2>
      <p>
        Publicity rights are mostly state law in the United States. There is no single federal statute, currently in
        force, that gives every person a nationwide right to control commercial use of their face or voice. Some
        states have statutes. Some rely more on court decisions. Some cover voice expressly. Some are narrower. The
        state where you live, the state where the use happened, and the kind of use can all matter. This guide will
        not pretend those rules are uniform.
      </p>
      <p>
        Tennessee is the clearest current example because the state wrote AI voice into the statute. On March 21,
        2024, Governor Bill Lee signed the Ensuring Likeness Voice and Image Security Act, the ELVIS Act. His office
        described it as an update to Tennessee’s Protection of Personal Rights law so that voice is protected from AI
        misuse, alongside name, image, and likeness. The current definition in{" "}
        <a href="https://law.justia.com/codes/tennessee/title-47/chapter-25/part-11/section-47-25-1102/">
          Tenn. Code Ann. § 47-25-1102
        </a>{" "}
        says “voice” means a sound readily identifiable and attributable to a particular individual, whether it is the
        actual voice or a simulation. The history line on that section notes 2024, chapter 588. That is a Tennessee
        law. It is not a national one.
      </p>
      <p>
        Congress has a pending bill, the NO FAKES Act of 2026 (S. 4591). It has not become law. The status, the
        Congressional Research Service summary, and the limits of that summary are in{" "}
        <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">
          protecting your voice and likeness from AI deepfakes
        </Link>
        .
      </p>

      <h2>Deepfakes and AI clones</h2>
      <p>
        A fake sponsorship post, a cloned store, and a synthetic video raise different reports. If someone is selling
        merch under your name, or running an account that presents itself as you, a trademark registration is one of
        the documents platforms ask for when the complaint is about a brand. If someone has copied a specific photo or
        video you own, that is closer to copyright, and platforms run a separate copyright process. If someone has
        generated a new face or voice that evokes you, the closer legal tools are publicity law, impersonation rules,
        and the platform’s own synthetic-media policy. A trademark can still matter if the clone also uses your name
        in a way that suggests you approved the product.
      </p>
      <p>
        <a href="https://www.law.cornell.edu/uscode/text/15/1125">Lanham Act § 43(a)</a> covers a false or misleading
        representation likely to cause confusion about affiliation or sponsorship. Whether a clip meets that test
        depends on the facts. Save the URL, the date, and a screenshot before you report it.
      </p>

      <h2>Practical steps</h2>
      <ol>
        <li>
          Write down the exact name, the handle without the @, any nickname, the logo, and any phrase fans already
          associate with you. Note which of those you want to own.
        </li>
        <li>
          List what you sell or provide in ordinary language: videos, live shows, merch, a course, a membership, a
          software tool. Classes follow that list. This site’s plain-language map puts clothing in class 25,
          entertainment and education in class 41, electronics and software in class 9, and advertising or retail
          services in class 35. The USPTO requires a specific identification, not a vibe. See the{" "}
          <Link href="/blog/trademark-classification">classification guide</Link>.
        </li>
        <li>
          Run a <Link href="/free-search?audience=creator">free name check</Link> on the exact string and on obvious
          misspellings. Then look beyond the register, the way the USPTO suggests, because unregistered users will not
          all appear there.
        </li>
        <li>
          Decide the owner. A personal application and a company application are different. Changing the owner later
          is a separate filing, not a casual edit.
        </li>
        <li>
          Keep evidence of use: dated posts, product pages, invoices, sponsorship agreements, and packaging. A
          use-based application needs an example of the mark used with the goods or services. An intent-to-use
          application is for a real plan to use it, and the USPTO has separate forms to allege use later.
        </li>
        <li>
          For a deepfake or a fake account, preserve the evidence and use the platform report that matches the harm.
          Read the voice-and-likeness guide before you assume a trademark filing is the whole response.
        </li>
      </ol>

      <h2>When to file</h2>
      <p>
        File when the name is in use with specific goods or services, or when you have a bona fide intention to use it
        that way. The USPTO’s application system distinguishes a use-based filing from an intent-to-use filing. Both
        still require a real connection to goods or services. “I might want the name someday” is not a plan.
      </p>
      <p>
        Useful moments are a first merch drop, a paid membership, a brand deal that puts your name on a product, and
        the appearance of a similar name in your category. Common-law rights stay geographically limited until you
        have a federal registration. You do not need a large following. You do need a name that functions as a brand.
        Search before you file a name someone else already uses on related goods. The{" "}
        <Link href="/blog/trademark-registration-process">process guide</Link> covers the sequence.
      </p>

      <h2>If you work across borders</h2>
      <p>
        A US sponsorship and a UK sponsorship are two trademark maps. Publicity rules differ outside the United States
        as well. The <Link href="/trademark-registration/united-states">United States</Link>,{" "}
        <Link href="/trademark-registration/united-kingdom">United Kingdom</Link>, and{" "}
        <Link href="/trademark-registration/european-union">European Union</Link> pages list published prices. This
        guide does not restate them.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li>
          <Link href="/blog/how-to-trademark-a-username-or-brand-name">How to trademark a username or brand name</Link>
        </li>
        <li>
          <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes">
            Protecting your voice and likeness from AI deepfakes
          </Link>
        </li>
        <li>
          <Link href="/blog/athlete-nil-name-image-likeness-protection">Athlete NIL protection</Link>
        </li>
        <li>
          <Link href="/blog/ai-voice-cloning-drake-ip-battleground">AI voice cloning and Drake</Link>
        </li>
        <li>
          <Link href="/for-creators">Trademark protection for creators</Link>
          {" · "}
          <Link href="/for-athletes">for athletes</Link>
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
          <a href="https://www.law.cornell.edu/uscode/text/15/1125">15 U.S.C. § 1125</a>
        </li>
        <li>
          <a href="https://www.tn.gov/governor/news/2024/3/21/photos--gov--lee-signs-elvis-act-into-law.html">
            Tennessee governor’s office, ELVIS Act signing, March 21, 2024
          </a>
        </li>
        <li>
          <a href="https://law.justia.com/codes/tennessee/title-47/chapter-25/part-11/section-47-25-1102/">
            Tenn. Code Ann. § 47-25-1102
          </a>{" "}
          (voice includes a simulation; history cites 2024, ch. 588)
        </li>
        <li>
          <a href="https://www.congress.gov/bill/119th-congress/senate-bill/4591">
            Congress.gov, S. 4591, NO FAKES Act of 2026
          </a>
        </li>
      </ul>
    </BlogArticle>
  )
}
