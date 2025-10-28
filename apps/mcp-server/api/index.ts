import type { IncomingMessage, ServerResponse } from "http"
import { createApp } from "../src/index.js"

// Initialize once (faster cold starts)
const appPromise = createApp()

export const config = { runtime: "nodejs" }

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
