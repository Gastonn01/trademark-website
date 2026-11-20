import type { ReactNode } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { NameCheckPrompt } from "@/components/name-check-prompt"
import { audienceFromHref } from "@/lib/funnel"
import { articleJsonLd, faqPageJsonLd, type FaqItem } from "@/lib/seo"

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BlogArticle({
  kicker,
  title,
  dek,
  path,
  description,
  datePublished,
  dateModified,
  faqs,
  ctaHref = "/free-search",
  children,
}: {
  kicker: string
  title: string
  dek: string
  path: string
  description: string
  datePublished: string
  dateModified?: string
  faqs?: FaqItem[]
  ctaHref?: string
  ctaLabel?: string
  children: ReactNode
}) {
  const audience = audienceFromHref(ctaHref)
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished, dateModified })} />
      {faqs && faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
      <article className="container mx-auto px-4 py-4 md:py-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 md:mb-4">{kicker}</p>
        <h1 className="text-[1.65rem] md:text-5xl font-bold text-primary leading-[1.12] md:leading-tight mb-2 md:mb-6">{title}</h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-3 md:mb-6">{dek}</p>
        <NameCheckPrompt variant="band" audience={audience} id="name-check-top" />
        <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 mb-2">
          General information, not legal advice. Trademark, publicity, and platform rules differ by country and by the
          facts. Nothing on this page is a clearance opinion or a promise about the outcome of a filing or a dispute.
        </p>
        <div className="text-gray-700 leading-relaxed text-base [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:mb-4 [&_a]:underline [&_a]:underline-offset-2">
          {children}
          {faqs && faqs.length > 0 ? (
            <>
              <h2>Frequently asked questions</h2>
              {faqs.map((item) => (
                <div key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </>
          ) : null}
        </div>
        <NameCheckPrompt variant="panel" audience={audience} id="name-check-end" />
      </article>
      <Footer />
    </main>
  )
}
