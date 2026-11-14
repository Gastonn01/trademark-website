"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import { NameCheckPrompt } from "@/components/name-check-prompt"
import { type Audience } from "@/lib/funnel"

function audienceFromPath(pathname: string): Audience | undefined {
  if (/athlete|nil|lebron|cole-palmer/.test(pathname)) return "athlete"
  if (/musician|eminem|elvis|suno|voice/.test(pathname)) return "musician"
  if (/creator|influencer|username/.test(pathname)) return "creator"
  return undefined
}

function placeSlots() {
  document.querySelectorAll("[data-name-check-slot]").forEach((node) => node.remove())
  if (document.querySelector("[data-name-check]")) return null

  const article = document.querySelector("article")
  const main = document.querySelector("main")
  const root = article || main
  if (!root) return null

  const paragraphs = Array.from(root.querySelectorAll("p")).filter((paragraph) => {
    if (paragraph.closest("footer, nav, header")) return false
    return (paragraph.textContent || "").replace(/\s+/g, " ").trim().length > 80
  })

  const top = document.createElement("div")
  top.className = "not-prose"
  top.setAttribute("data-name-check-slot", "top")
  const intro = paragraphs[0]
  const heading = root.querySelector("h1")
  if (intro?.parentElement) {
    intro.parentElement.insertBefore(top, intro.nextSibling)
  } else if (heading?.parentElement) {
    heading.parentElement.insertBefore(top, heading.nextSibling)
  } else {
    root.prepend(top)
  }

  const end = document.createElement("div")
  end.className = "not-prose mx-auto w-full max-w-3xl px-4"
  end.setAttribute("data-name-check-slot", "end")
  if (article) {
    article.appendChild(end)
  } else {
    const footer = root.querySelector("footer") || document.querySelector("footer")
    if (footer?.parentElement) footer.parentElement.insertBefore(end, footer)
    else root.appendChild(end)
  }

  return { top, end }
}

export function BlogNameCheckSlots() {
  const pathname = usePathname()
  const [targets, setTargets] = useState<{ top: HTMLElement; end: HTMLElement } | null>(null)

  useEffect(() => {
    if (!pathname.startsWith("/blog/")) {
      setTargets(null)
      return
    }

    let current: { top: HTMLElement; end: HTMLElement } | null = null
    let frame = 0

    const mount = () => {
      const existing = document.querySelector("[data-name-check]")
      if (existing && !existing.closest("[data-name-check-slot]")) {
        current?.top.remove()
        current?.end.remove()
        current = null
        setTargets(null)
        return
      }
      if (current?.top.isConnected && current.end.isConnected) return
      const placed = placeSlots()
      if (!placed) return
      current = placed
      setTargets(placed)
    }

    mount()
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(mount)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      current?.top.remove()
      current?.end.remove()
    }
  }, [pathname])

  if (!targets) return null
  const audience = audienceFromPath(pathname)
  const lang = pathname.includes("registrar-marca") ? "es" : "en"

  return (
    <>
      {createPortal(
        <NameCheckPrompt variant="band" audience={audience} lang={lang} id="name-check-top" />,
        targets.top,
      )}
      {createPortal(
        <NameCheckPrompt variant="panel" audience={audience} lang={lang} id="name-check-end" />,
        targets.end,
      )}
    </>
  )
}
