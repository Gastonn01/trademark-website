import type { FastifyRequest, FastifyReply } from "fastify"
import { CheckResponseSchema, type CheckResponse } from "../types"
import { config } from "../config.js"

interface CheckTrademarkArgs {
  trademark: string
  country: string
  email: string
}

export async function checkHandler(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as { country: string; mark: string; classes?: number[] }

  const r = await fetch(`${process.env.BACKEND_URL || config.backendUrl}/api/submit-free-search`, {
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

  const parsed = CheckResponseSchema.safeParse(await r.json())
  if (!parsed.success) {
    return reply.code(500).send({ error: "Invalid upstream shape", issues: parsed.error.issues })
  }

  const data: CheckResponse = parsed.data
  return reply.send(data)
}

export async function checkTrademark(args: CheckTrademarkArgs) {
  const { trademark, country, email } = args

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
