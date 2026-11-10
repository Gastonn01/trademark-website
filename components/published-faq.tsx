import { faqPageJsonLd, type FaqItem } from "@/lib/seo"

/**
 * FAQ answers are in the initial HTML (native details, not a closed accordion
 * that unmounts its content) and repeated as FAQPage JSON-LD for crawlers.
 */
export function PublishedFaq({ items }: { items: FaqItem[] }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
      />
      <div className="w-full">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-primary/15">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-gray-500">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
