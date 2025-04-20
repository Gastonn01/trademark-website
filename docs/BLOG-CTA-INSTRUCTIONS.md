# Adding "Start Free Search" CTA to Blog Posts

This document explains how to add the "Start Free Search" CTA to all blog posts.

## Option 1: Using the BlogFreeSearchCTA Component Directly

Import and add the component to your blog post:

\`\`\`tsx
import { BlogFreeSearchCTA } from '@/components/blog-free-search-cta'

export default function BlogPost() {
  return (
    <div>
      <h1>Blog Post Title</h1>
      <p>First paragraph...</p>
      <p>Second paragraph...</p>
      
      {/* Add the CTA after a few paragraphs */}
      <BlogFreeSearchCTA />
      
      <p>More content...</p>
      
      {/* Add another CTA at the end */}
      <BlogFreeSearchCTA className="mt-12" />
    </div>
  )
}
\`\`\`

## Option 2: Using the Blog Post Wrapper

Wrap your blog content with the BlogPostWrapper:

\`\`\`tsx
import { BlogPostWrapper } from '@/components/blog-post-wrapper'

export default function BlogPost() {
  return (
    <BlogPostWrapper>
      <h1>Blog Post Title</h1>
      <p>First paragraph...</p>
      <p>Second paragraph...</p>
      <p>More content...</p>
    </BlogPostWrapper>
  )
}
\`\`\`

## Option 3: Using the Utility Function

Use the injectBlogCTA utility function:

\`\`\`tsx
import { injectBlogCTA } from '@/lib/blog-cta-utils'

export default function BlogPost() {
  const content = (
    <>
      <h1>Blog Post Title</h1>
      <p>First paragraph...</p>
      <p>Second paragraph...</p>
      <p>More content...</p>
    </>
  )
  
  return injectBlogCTA(content)
}
