import { config } from "../config.js"

interface CreateFilingArgs {
  trademark: string
  countries: string[]
  classes: number[]
  email: string
  fullName: string
}

export async function createFiling(args: CreateFilingArgs) {
  const { trademark, countries, classes, email, fullName } = args

  // Proxy to Next.js backend
  const response = await fetch(`${config.backendUrl}/api/submit-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trademark,
      countries,
      classes,
      email,
      fullName,
      source: "mcp",
    }),
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    message: `Trademark filing created for "${trademark}" in ${countries.join(", ")}. Check your email for payment and next steps.`,
    data: {
      filingId: data.id,
      trademark,
      countries,
      classes,
      status: "pending_payment",
      paymentUrl: `${config.backendUrl}/verification?id=${data.id}`,
    },
  }
}
