import type { IncomingMessage, ServerResponse } from "http"
import { createApp } from "./lib/index"

// Initialize once (faster cold starts)
const appPromise = createApp()

export const config = { runtime: "nodejs" }

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const app = await appPromise

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
          resolve(body || undefined)
        })
      }),
    })

    // Set response headers
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string)
    })

    // Set status code and send response
    res.statusCode = response.statusCode
    res.end(response.body)
  } catch (err) {
    console.error("MCP handler error:", err)
    res.statusCode = 500
    res.end("Internal Server Error")
  }
}
