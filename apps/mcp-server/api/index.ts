import type { IncomingMessage, ServerResponse } from "http"
import { createApp } from "./lib/index"

// Initialize once (faster cold starts)
const appPromise = createApp()

export const config = { runtime: "nodejs" }

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  console.log("[v0] MCP Handler called")
  console.log("[v0] Method:", req.method)
  console.log("[v0] URL:", req.url)
  console.log("[v0] Headers:", JSON.stringify(req.headers, null, 2))

  try {
    const app = await appPromise
    console.log("[v0] Fastify app initialized")

    const response = await app.inject({
      method: req.method as any,
      url: req.url || "/",
      headers: req.headers as any,
      payload: await new Promise((resolve) => {
        let body = ""
        req.on("data", (chunk) => {
          body += chunk.toString()
        })
        req.on("end", () => {
          console.log("[v0] Request body:", body || "(empty)")
          resolve(body || undefined)
        })
      }),
    })

    console.log("[v0] Fastify response status:", response.statusCode)
    console.log("[v0] Fastify response body:", response.body)

    // Set response headers
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string)
    })

    // Set status code and send response
    res.statusCode = response.statusCode
    res.end(response.body)

    console.log("[v0] Response sent successfully")
  } catch (err) {
    console.error("[v0] MCP handler error:", err)
    res.statusCode = 500
    res.end("Internal Server Error")
  }
}
