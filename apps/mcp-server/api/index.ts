import type { IncomingMessage, ServerResponse } from "http"
import { createApp } from "../src/index"

// Initialize once (faster cold starts)
const appPromise = createApp()

// Force Node 20 runtime on Vercel
export const config = { runtime: "nodejs20.x" }

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const app = await appPromise
    await app.ready()
    app.server.emit("request", req, res)
  } catch (err) {
    console.error("MCP handler error:", err)
    res.statusCode = 500
    res.end("Internal Server Error")
  }
}
