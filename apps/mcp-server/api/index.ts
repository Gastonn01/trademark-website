import type { IncomingMessage, ServerResponse } from "http"
import { createApp } from "../src/index.js"

const appPromise = createApp()

export const config = {
  runtime: "nodejs20.x",
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await appPromise
  await app.ready()
  app.server.emit("request", req, res)
}
