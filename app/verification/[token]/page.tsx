import { getSearchDataByToken } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function VerificationPage({ params }: { params: { token: string } }) {
  const { token } = params

  console.log("Verification page for token:", token)

  try {
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables are missing")
    }

    // Get search data by token
    const searchData = await getSearchDataByToken(token)

    if (!searchData) {
      console.error("No search data found for token:", token)
      // Redirect to verification page with error
      redirect(`/verification?error=invalid_token&token=${token}`)
    }

    // Redirect to verification page with search ID
    redirect(`/verification?search_id=${searchData.id}`)
  } catch (error) {
    console.error("Error in verification token page:", error)

    // Determine the specific error type for better error messages
    let errorType = "unknown_error"
    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes("Supabase environment variables are missing")) {
      errorType = "missing_env_vars"
    } else if (errorMessage.includes("Database error")) {
      errorType = "database_error"
    }

    // Redirect to verification page with error
    redirect(`/verification?error=${errorType}&message=${encodeURIComponent(errorMessage)}&token=${token}`)
  }
}
