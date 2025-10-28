import type { FastifyRequest, FastifyReply } from "fastify"
import { GetFilingResponseSchema, type GetFilingResponse } from "../types"
import { config } from "../config.js"

interface GetFilingArgs {
  email: string
  searchId?: string
}

export async function getFilingHandler(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.body as { id: string }

  const r = await fetch(
    `${process.env.BACKEND_URL || config.backendUrl}/api/get-registration-data?id=${encodeURIComponent(id)}`,
    {
      headers: {
        ...(process.env.BACKEND_KEY ? { "x-api-key": process.env.BACKEND_KEY } : {}),
      },
    },
  )

  if (!r.ok) {
    const text = await r.text().catch(() => "")
    return reply.code(502).send({ error: "Upstream error", status: r.status, body: text })
  }

  const parsed = GetFilingResponseSchema.safeParse(await r.json())
  if (!parsed.success) {
    return reply.code(500).send({ error: "Invalid upstream shape", issues: parsed.error.issues })
  }

  const data: GetFilingResponse = parsed.data
  return reply.send(data)
}

export async function getFiling(args: GetFilingArgs) {
  const { email, searchId } = args

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
