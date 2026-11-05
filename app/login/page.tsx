import { NavBar } from "@/components/nav-bar"
import { LoginForm } from "@/components/login-form"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Log In | Just Protected",
  description: "Log in to your Just Protected account.",
  path: "/login",
  noindex: true,
})

export default function LoginPage() {
  return (
    <main>
      <NavBar />
      <LoginForm />
    </main>
  )
}
