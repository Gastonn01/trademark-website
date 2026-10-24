"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AffiliateSignupForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch("/api/affiliate-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="p-8 bg-primary/5 rounded-lg border border-primary/10 text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Got it</h3>
        <p className="text-gray-700">We'll email you your code and next steps.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="platform">Main platform</Label>
          <Input id="platform" name="platform" placeholder="Instagram / TikTok / other" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="followers">Followers (approx.)</Label>
          <Input id="followers" name="followers" placeholder="e.g. 25000" className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="handle">Handle / username</Label>
        <Input id="handle" name="handle" placeholder="@yourhandle" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="niche">What does your content focus on?</Label>
        <Input id="niche" name="niche" placeholder="e.g. ecommerce, personal branding, business" className="mt-1" />
      </div>
      <Button type="submit" disabled={status === "submitting"} className="w-full bg-accent text-primary hover:bg-accent/90">
        {status === "submitting" ? "Submitting..." : "Join the program"}
      </Button>
      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong submitting the form, try again.</p>
      )}
    </form>
  )
}
