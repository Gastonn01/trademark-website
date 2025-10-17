# Just Protected MCP Server

OpenAI Model Context Protocol (MCP) server for Just Protected trademark search integration.

## Features

- **Trademark Search**: Submit trademark searches directly from ChatGPT
- **Pricing Calculator**: Get real-time pricing for trademark registration
- **Status Tracking**: Check the status of submitted searches
- **Interactive UI**: Beautiful results display in ChatGPT interface

## Setup

### 1. Install Dependencies

\`\`\`bash
cd mcp-server
npm install
\`\`\`

### 2. Environment Variables

Create a `.env` file:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### 3. Build

\`\`\`bash
npm run build
\`\`\`

### 4. Register with OpenAI

1. Go to OpenAI Developer Portal
2. Create new MCP app
3. Configure endpoints:
   - **Server URL**: Your deployed MCP server URL
   - **Authentication**: OAuth 2.1 (optional for user-specific data)

### 5. Deploy

Deploy to a public HTTPS endpoint (Vercel, Railway, etc.):

\`\`\`bash
# Example with Vercel
vercel --prod
\`\`\`

## Usage in ChatGPT

Once registered, users can interact with your trademark service directly in ChatGPT:

**Example Prompts:**

- "Search for trademark 'MyBrand' in the United States and European Union"
- "How much does trademark registration cost in Germany?"
- "Check the status of my trademark search [search-id]"

## Tools Available

### 1. search_trademark
Submit a new trademark search request.

**Parameters:**
- `trademarkName`: Brand name to search
- `trademarkType`: "word", "logo", or "figurative"
- `goodsAndServices`: Description of goods/services
- `countries`: Array of country names
- `email`: User's email
- `name`: User's first name
- `surname`: User's last name

### 2. get_trademark_pricing
Get pricing information for countries.

**Parameters:**
- `countries`: Array of country names
- `numberOfClasses`: Number of NICE classes (default: 1)

### 3. check_search_status
Check status of a submitted search.

**Parameters:**
- `searchId`: UUID of the search

## UI Components

### Trademark Search Results
Interactive display showing:
- Search status
- Trademark name
- Selected countries
- Analysis results (when available)
- Call-to-action to complete registration

### Pricing Calculator
Shows pricing breakdown by country with base and additional class costs.

## Security

- Uses Supabase Row Level Security (RLS)
- Service role key for server-side operations
- OAuth 2.1 support for user authentication
- CSP policies for iframe security

## Development

\`\`\`bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Integration with Existing Site

The MCP server integrates seamlessly with your existing:
- Supabase database (`trademark_searches` table)
- Email notification system (Resend)
- Pricing data (`lib/pricing-data.ts`)
- Admin panel for managing searches

No changes to your existing website are required!

## Next Steps

1. **Test Locally**: Run the MCP server and test with MCP Inspector
2. **Deploy**: Deploy to production HTTPS endpoint
3. **Register**: Submit to OpenAI for app review
4. **Launch**: Make available to ChatGPT users worldwide

## Support

For questions or issues:
- Email: support@justprotected.com
- Website: justprotected.com
