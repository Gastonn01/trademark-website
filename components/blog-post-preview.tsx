"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogPostPreviewProps {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
}

export function BlogPostPreview({ slug, title, excerpt, date, image }: BlogPostPreviewProps) {
  const [imageError, setImageError] = useState(false)

  // Generate a consistent fallback image based on the slug
  const generateFallbackImage = () => {
    // Create a deterministic color based on the slug
    const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const hue = hash % 360
    return `/api/placeholder?text=${encodeURIComponent(title.substring(0, 20))}&bg=hsl(${hue},70%,80%)&fg=hsl(${hue},70%,30%)`
  }

  // Determine the image source with proper fallbacks
  const imageSrc = imageError ? generateFallbackImage() : image

  // Function to handle click and ensure scroll to top
  const handleClick = () => {
    // Use setTimeout to ensure this runs after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
        <Link href={`/blog/${slug}`} onClick={handleClick} scroll={true}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title || "Blog post image"}
            fill
            style={{ objectFit: "cover" }}
            className="hover:opacity-90 transition-opacity"
            priority={false}
            onError={() => setImageError(true)}
          />
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <Link
            href={`/blog/${slug}`}
            className="text-indigo-700 hover:text-indigo-900 transition-colors"
            onClick={handleClick}
            scroll={true}
          >
            {title}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-500">{date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 transition-colors"
          onClick={handleClick}
          scroll={true}
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  )
}
