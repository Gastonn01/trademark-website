import { VerificationContent } from "@/components/verification-content"
import { getSearchDataByToken } from "@/lib/supabase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Search Results | Just Protected",
  description: "View your trademark search results",
}

export default async function VerificationPage({ params }: { params: { token: string } }) {
  const token = params.token
  console.log("Verification token:", token)

  let searchData = null
  let error = null

  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables are missing. Please check your configuration.")
    }

    // Get search data by token
    searchData = await getSearchDataByToken(token)
    console.log("Search data found:", !!searchData)
  } catch (err) {
    console.error("Error fetching search data by token:", err)
    error = err instanceof Error ? err.message : "An error occurred while fetching search data"
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="mt-2">
            Please contact support with the following token: <code className="bg-gray-100 p-1">{token}</code>
          </p>
          <p className="mt-4">
            <strong>Technical Details:</strong>
            <br />
            Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configured" : "Missing"}
            <br />
            Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configured" : "Missing"}
          </p>
        </div>
      ) : !searchData ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
          <p className="font-bold">Search data not found</p>
          <p>We couldn't find any search data associated with this verification token.</p>
          <p className="mt-2">
            Please contact support with the following token: <code className="bg-gray-100 p-1">{token}</code>
          </p>
        </div>
      ) : (
        <VerificationContent initialData={searchData} />
      )}
    </div>
  )
}
