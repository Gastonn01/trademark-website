import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | Just Protected",
  description: "Sign in to the Just Protected administration area.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Admin Login | Just Protected",
    description: "Sign in to the Just Protected administration area.",
    url: "/login",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Login | Just Protected",
    description: "Sign in to the Just Protected administration area.",
  },
  robots: { index: false, follow: false },
}

import { NavBar } from "@/components/nav-bar"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main>
      <NavBar />
      <LoginForm />
    </main>
  )
}
