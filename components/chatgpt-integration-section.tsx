"use client"

import { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function ChatGPTIntegrationSection() {
  const [copiedMCP, setCopiedMCP] = useState(false)
  const [copiedRequest, setCopiedRequest] = useState(false)
  const [copiedResponse, setCopiedResponse] = useState(false)

  // TODO: Replace these placeholders with your actual values
  const APP_ID = "<APP_ID>" // Replace with your ChatGPT App ID
  const MCP_URL = "https://mcp.yourdomain.com" // Replace with your MCP server URL
  const API_BASE_URL = "https://api.yourdomain.com" // Replace with your API base URL

  const copyToClipboard = (text: string, setter: (value: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  const mcpConfig = `{
  "name": "Trademark Registration Assistant",
  "version": "1.0.0",
  "endpoints": {
    "mcp_server_url": "${MCP_URL}"
  },
  "intents": ["register trademark", "search trademark", "nice classes", "filing checklist"]
}`

  const exampleRequest = `curl "${API_BASE_URL}/trademarks/search?q=ACME&region=EU"`

  const exampleResponse = `{
  "items": [
    { "mark": "ACME", "owner": "Acme LLC", "status": "Registered", "classes": [25,35] }
  ]
}`

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Integrate our ChatGPT App (Apps SDK)</h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Our platform is now available inside ChatGPT through the OpenAI Apps SDK.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* For Users Section */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">For Users</h3>
            <p className="text-gray-700 mb-6">
              You can open the app directly in ChatGPT. Type &apos;I want to register a trademark&apos; — ChatGPT will
              suggest our Trademark Registration Assistant.
            </p>
            <a
              href={`https://chat.openai.com/a/${APP_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <ExternalLink className="h-5 w-5" />
              Open in ChatGPT
            </a>
          </motion.div>

          {/* For Developers Section */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">For Developers</h3>
            <p className="text-gray-700 mb-6">
              Our existing backend API is now wrapped by an MCP server, making it easy to integrate our trademark
              services into your applications.
            </p>

            {/* MCP Configuration */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900">MCP Configuration</h4>
                <button
                  onClick={() => copyToClipboard(MCP_URL, setCopiedMCP)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {copiedMCP ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  {copiedMCP ? "Copied!" : "Copy MCP URL"}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono">
                  <code>{mcpConfig}</code>
                </pre>
              </div>
            </div>

            {/* Code Examples */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">Example Request</h4>
                  <button
                    onClick={() => copyToClipboard(exampleRequest, setCopiedRequest)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {copiedRequest ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copiedRequest ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">
                    <code>{exampleRequest}</code>
                  </pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">Example Response</h4>
                  <button
                    onClick={() => copyToClipboard(exampleResponse, setCopiedResponse)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {copiedResponse ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copiedResponse ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-blue-400 font-mono">
                    <code>{exampleResponse}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
