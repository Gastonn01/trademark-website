import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-4 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-4 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/4 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
