import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"

interface BlogFreeSearchCTAProps {
  className?: string
}

export function BlogFreeSearchCTA({ className = "" }: BlogFreeSearchCTAProps) {
  return (
    <div
      className={`my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to protect your trademark?</h3>
          <p className="text-gray-700">
            Start with our free trademark search tool to check availability before filing your application.
          </p>
        </div>
        <Link href="/free-search" className="shrink-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2">
            <Search className="h-4 w-4" />
            Start Free Search
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
