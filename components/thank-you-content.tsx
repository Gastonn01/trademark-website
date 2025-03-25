import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ThankYouContent() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Thank You for Your Submission!</h1>
      <p className="text-xl mb-8 text-gray-600">
        We've received your free trademark search request. Our experts will review your application and provide a
        detailed report within the next 24 hours.
      </p>
      <p className="text-lg mb-8 text-gray-600">
        Keep an eye on your email inbox for updates on your trademark search results.
      </p>
      <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

