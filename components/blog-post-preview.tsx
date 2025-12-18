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
  // Use a specific blog image as fallback instead of a generic placeholder
  const defaultImage = "/blog-default-image.jpg" // You'll need to add this image to your public folder

  // Ensure we have a valid image URL
  const imageSrc =
    imageError || !image
      ? defaultImage
      : image.startsWith("http") || image.startsWith("/")
        ? image
        : `/blog/${slug}/featured-image.jpg`

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
            priority={true}
            onError={() => setImageError(true)}
          />
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <Link
            href={`/blog/${slug}`}
            className="text-gray-900 hover:text-gray-700 transition-colors"
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
          className="mt-4 inline-block text-gray-900 hover:text-gray-700 transition-colors"
          onClick={handleClick}
          scroll={true}
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  )
}
