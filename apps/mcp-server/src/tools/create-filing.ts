import type { FastifyRequest, FastifyReply } from "fastify"
import { CreateFilingResponseSchema, type CreateFilingResponse } from "../types"
import { config } from "../config.js"

interface CreateFilingArgs {
  trademark: string
  countries: string[]
  classes: number[]
  email: string
  fullName: string
}

export async function createFilingHandler(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as {
    applicantName: string
    email: string
    country: string
    mark: string
    classes: number[]
  }

  const r = await fetch(`${process.env.BACKEND_URL || config.backendUrl}/api/submit-verification`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.BACKEND_KEY ? { "x-api-key": process.env.BACKEND_KEY } : {}),
    },
    body: JSON.stringify(body),
  })

  if (!r.ok) {
    const text = await r.text().catch(() => "")
    return reply.code(502).send({ error: "Upstream error", status: r.status, body: text })
  }

  const parsed = CreateFilingResponseSchema.safeParse(await r.json())
  if (!parsed.success) {
    return reply.code(500).send({ error: "Invalid upstream shape", issues: parsed.error.issues })
  }

  const data: CreateFilingResponse = parsed.data
  return reply.send(data)
}

export async function createFiling(args: CreateFilingArgs) {
  const { trademark, countries, classes, email, fullName } = args

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
