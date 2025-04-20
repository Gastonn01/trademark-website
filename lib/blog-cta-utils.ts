import React from "react"
import { BlogFreeSearchCTA } from "@/components/blog-free-search-cta"

/**
 * Injects the Free Search CTA into blog content
 * @param content The blog content as React elements
 * @returns The content with CTAs injected
 */
export function injectBlogCTA(content: React.ReactNode): React.ReactNode {
  // If content is an array, process it
  if (Array.isArray(content)) {
    const contentArray = React.Children.toArray(content)

    // Find a good position to insert the first CTA (about 1/3 of the way through)
    const insertPosition = Math.max(2, Math.floor(contentArray.length / 3))

    // Create a new array with the CTA inserted
    const newContent = [
      ...contentArray.slice(0, insertPosition),
      <BlogFreeSearchCTA key="cta-1" />,
      ...contentArray.slice(insertPosition),
      <BlogFreeSearchCTA key="cta-2" className="mt-12" />,
    ]

    return newContent
  }

  // If content is not an array, wrap it with CTAs before and after
  return (
    <>
      {content}
      <BlogFreeSearchCTA className="mt-12" />
    </>
  )
}
