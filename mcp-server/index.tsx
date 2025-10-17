import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || ""
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://justprotected.com"

// Pricing data - imported from your centralized pricing
const countryPricing: Record<string, { price: number; additionalClassPrice: number }> = {
  "European Union": { price: 1551, additionalClassPrice: 425 },
  "United States": { price: 1012, additionalClassPrice: 225 },
  Germany: { price: 863, additionalClassPrice: 250 },
  Spain: { price: 564, additionalClassPrice: 90 },
  "United Kingdom": { price: 909, additionalClassPrice: 50 },
  China: { price: 518, additionalClassPrice: 100 },
  Argentina: { price: 460, additionalClassPrice: 460 },
  France: { price: 909, additionalClassPrice: 225 },
  Italy: { price: 909, additionalClassPrice: 34 },
  Portugal: { price: 564, additionalClassPrice: 90 },
  Greece: { price: 564, additionalClassPrice: 90 },
  Canada: { price: 909, additionalClassPrice: 100 },
  Mexico: { price: 909, additionalClassPrice: 115 },
  Brazil: { price: 909, additionalClassPrice: 182 },
  Chile: { price: 909, additionalClassPrice: 121 },
  // Add more countries as needed
}

// Create MCP server
const server = new Server(
  {
    name: "just-protected-trademark-search",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
)

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_trademark",
        description:
          "Submit a trademark search request. Searches for trademark availability in specified countries and stores the request in the database. The user will receive results via email.",
        inputSchema: {
          type: "object",
          properties: {
            trademarkName: {
              type: "string",
              description: "The trademark name to search for",
            },
            countries: {
              type: "array",
              items: { type: "string" },
              description: "List of countries to search in (e.g., 'United States', 'European Union')",
            },
            email: {
              type: "string",
              description: "User's email address to receive search results",
            },
            firstName: {
              type: "string",
              description: "User's first name",
            },
            lastName: {
              type: "string",
              description: "User's last name",
            },
          },
          required: ["trademarkName", "countries", "email", "firstName", "lastName"],
        },
      },
      {
        name: "get_trademark_pricing",
        description:
          "Get pricing information for trademark registration in specific countries. Returns base price and additional class pricing.",
        inputSchema: {
          type: "object",
          properties: {
            countries: {
              type: "array",
              items: { type: "string" },
              description: "List of countries to get pricing for",
            },
          },
          required: ["countries"],
        },
      },
      {
        name: "check_search_status",
        description:
          "Check the status of a trademark search by email address. Returns all searches associated with the email.",
        inputSchema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Email address used for the search",
            },
          },
          required: ["email"],
        },
      },
    ],
  }
})

// List available resources (HTML templates)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "template://search-results",
        mimeType: "text/html",
        name: "Trademark Search Results",
        description: "Interactive display of trademark search results",
      },
      {
        uri: "template://pricing-display",
        mimeType: "text/html",
        name: "Trademark Pricing Display",
        description: "Interactive pricing information for trademark registration",
      },
    ],
  }
})

// Read resource templates
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri

  if (uri === "template://search-results") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/html",
          text: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
    .status { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 8px; }
    .country { background: white; border: 1px solid #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .cta { background: #4f46e5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px; }
    .price { font-size: 24px; font-weight: bold; color: #4f46e5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 Trademark Search Submitted</h1>
      <p>Your search for "<strong>{{trademarkName}}</strong>" has been submitted successfully!</p>
    </div>
    
    <div class="status">
      <h3>📧 What's Next?</h3>
      <p>We're conducting a comprehensive trademark search across your selected countries. You'll receive detailed results via email within 24-48 hours.</p>
    </div>

    <h3>Selected Countries:</h3>
    {{#each countries}}
    <div class="country">
      <strong>{{this}}</strong>
      <p>Comprehensive database search including registered and pending trademarks</p>
    </div>
    {{/each}}

    <a href="${BASE_URL}/verification" class="cta">Complete Your Registration →</a>
  </div>
</body>
</html>
          `,
        },
      ],
    }
  }

  if (uri === "template://pricing-display") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/html",
          text: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
    .pricing-card { background: white; border: 2px solid #e5e7eb; padding: 20px; margin: 15px 0; border-radius: 12px; }
    .price { font-size: 32px; font-weight: bold; color: #4f46e5; margin: 10px 0; }
    .detail { color: #6b7280; margin: 5px 0; }
    .cta { background: #4f46e5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 Trademark Registration Pricing</h1>
      <p>Transparent pricing for trademark registration worldwide</p>
    </div>
    
    {{#each pricing}}
    <div class="pricing-card">
      <h3>{{country}}</h3>
      <div class="price">\${{basePrice}} USD</div>
      <div class="detail">Base price for 1 class</div>
      <div class="detail">Additional classes: \${{additionalClassPrice}} each</div>
    </div>
    {{/each}}

    <a href="${BASE_URL}/pricing" class="cta">View Complete Pricing →</a>
  </div>
</body>
</html>
          `,
        },
      ],
    }
  }

  throw new Error(`Unknown resource: ${uri}`)
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === "search_trademark") {
    const { trademarkName, countries, email, firstName, lastName } = args as {
      trademarkName: string
      countries: string[]
      email: string
      firstName: string
      lastName: string
    }

    // Submit to your existing API
    try {
      const response = await fetch(`${BASE_URL}/api/submit-free-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trademarkName,
          countries,
          email,
          firstName,
          lastName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit search")
      }

      return {
        content: [
          {
            type: "text",
            text: `Trademark search for "${trademarkName}" submitted successfully! Results will be sent to ${email} within 24-48 hours.`,
          },
          {
            type: "resource",
            resource: {
              uri: "template://search-results",
              mimeType: "text/html",
              text: "", // Will be populated by template
            },
          },
        ],
        _meta: {
          trademarkName,
          countries,
          email,
        },
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error submitting trademark search: ${error}`,
          },
        ],
        isError: true,
      }
    }
  }

  if (name === "get_trademark_pricing") {
    const { countries } = args as { countries: string[] }

    const pricing = countries.map((country) => {
      const data = countryPricing[country]
      if (!data) {
        return {
          country,
          basePrice: "Not available",
          additionalClassPrice: "Not available",
        }
      }
      return {
        country,
        basePrice: data.price,
        additionalClassPrice: data.additionalClassPrice,
      }
    })

    return {
      content: [
        {
          type: "text",
          text: `Pricing information for ${countries.join(", ")}`,
        },
        {
          type: "resource",
          resource: {
            uri: "template://pricing-display",
            mimeType: "text/html",
            text: "", // Will be populated by template
          },
        },
      ],
      _meta: {
        pricing,
      },
    }
  }

  if (name === "check_search_status") {
    const { email } = args as { email: string }

    // Query Supabase for searches
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/trademark_searches?email=eq.${email}`, {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      })

      const searches = await response.json()

      return {
        content: [
          {
            type: "text",
            text: `Found ${searches.length} trademark search(es) for ${email}`,
          },
        ],
        _meta: {
          searches,
        },
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error checking search status: ${error}`,
          },
        ],
        isError: true,
      }
    }
  }

  throw new Error(`Unknown tool: ${name}`)
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Just Protected MCP server running on stdio")
}

main().catch(console.error)

// Export for Vercel serverless
export default async function handler(req: any, res: any) {
  if (req.url === "/mcp" && req.method === "POST") {
    // Handle MCP requests
    const body = await req.body
    // Process MCP protocol here
    res.status(200).json({ success: true })
  } else {
    res.status(404).json({ error: "Not found" })
  }
}
