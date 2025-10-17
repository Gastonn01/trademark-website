import { config } from "../config.js"

interface GetFilingArgs {
  email: string
  searchId?: string
}

export async function getFiling(args: GetFilingArgs) {
  const { email, searchId } = args

  // Proxy to Next.js backend
  const url = new URL(`${config.backendUrl}/api/get-registration-data`)
  url.searchParams.set("email", email)
  if (searchId) {
    url.searchParams.set("searchId", searchId)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data || data.length === 0) {
    return {
      message: `No filings found for ${email}.`,
      data: {
        filings: [],
      },
    }
  }

  return {
    message: `Found ${data.length} filing(s) for ${email}.`,
    data: {
      filings: data.map((filing: any) => ({
        id: filing.id,
        trademark: filing.trademark,
        countries: filing.countries,
        status: filing.status,
        createdAt: filing.created_at,
        paymentStatus: filing.payment_status,
      })),
    },
  }
}
