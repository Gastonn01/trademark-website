import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Admin | Just Protected",
  description: "Just Protected administration.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
