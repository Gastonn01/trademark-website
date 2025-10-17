import { config } from "../config.js"

interface CheckTrademarkArgs {
  trademark: string
  country: string
  email: string
}

export async function checkTrademark(args: CheckTrademarkArgs) {
  const { trademark, country, email } = args

  // Proxy to Next.js backend
  const response = await fetch(`${config.backendUrl}/api/submit-free-search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trademark,
      country,
      email,
    }),
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    message: `Trademark search submitted for "${trademark}" in ${country}. Results will be sent to ${email}.`,
    data: {
      trademark,
      country,
      email,
      searchId: data.searchId,
      status: "pending",
      estimatedTime: "24-48 hours",
    },
  }
}
