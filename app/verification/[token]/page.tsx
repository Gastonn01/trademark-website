import { getSearchDataByToken } from "@/lib/supabase"
import { VerificationContent } from "@/components/verification-content"
import { redirect } from "next/navigation"

export default async function VerificationTokenPage({ params }: { params: { token: string } }) {
  const { token } = params

  if (!token) {
    redirect("/verification")
  }

  // Get the search data by token
  const searchData = await getSearchDataByToken(token)

  if (!searchData) {
    // If no search data is found, redirect to the verification page
    redirect("/verification")
  }

  // Pass the search ID to the VerificationContent component
  return <VerificationContent searchId={searchData.id} verificationToken={token} />
}
