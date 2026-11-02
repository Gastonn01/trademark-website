import type { Metadata } from "next"
import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Admin | Just Protected",
  description: "Internal administration for Just Protected trademark searches and verification requests.",
  path: "/admin",
  noindex: true,
})

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children
}
