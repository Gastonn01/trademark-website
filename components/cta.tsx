import Link from "next/link"

interface CTAProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  className?: string
}

export function CTA({
  title = "Ready to protect your brand?",
  description = "Start your trademark registration process today.",
  primaryButtonText = "Free Search",
  primaryButtonLink = "/free-search",
  secondaryButtonText = "View Pricing",
  secondaryButtonLink = "/detailed-pricelist",
  className = "",
}: CTAProps) {
  return (
    <div className={`bg-white py-8 px-4 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={primaryButtonLink}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            scroll={true}
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonLink}
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
            scroll={true}
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
