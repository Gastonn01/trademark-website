// apps/mcp-server/api/index.ts
import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../src/index";

// Create the Fastify app once and reuse it across invocations (faster cold starts)
const appPromise = createApp();

// Tell Vercel we want Node.js 20 runtime
export const config = {
  runtime: "nodejs20.x"
};

// This is the Vercel serverless handler
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const app = await appPromise;
    await app.ready();

    // Pass the raw Node.js request/response objects to Fastify
    app.server.emit("request", req, res);
  } catch (err) {
    console.error("Error in MCP server handler:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
