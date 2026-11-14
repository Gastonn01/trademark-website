import type { ReactNode } from "react"
import { BlogNameCheckSlots } from "@/components/blog-name-check-slots"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogNameCheckSlots />
    </>
  )
}
