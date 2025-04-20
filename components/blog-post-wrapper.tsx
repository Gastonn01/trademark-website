import React from "react"
import { BlogFreeSearchCTA } from "./blog-free-search-cta"

interface BlogPostWrapperProps {
  children: React.ReactNode
}

export function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  return (
    <div className="blog-post-content">
      {/* First part of the content */}
      {React.Children.map(children, (child, index) => {
        if (index === 0) return child
      })}

      {/* Insert CTA after first section */}
      <BlogFreeSearchCTA />

      {/* Rest of the content */}
      {React.Children.map(children, (child, index) => {
        if (index > 0) return child
      })}

      {/* Add another CTA at the end */}
      <BlogFreeSearchCTA className="mt-12" />
    </div>
  )
}
