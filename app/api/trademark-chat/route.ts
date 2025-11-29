import { generateText } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are the Just Protected Trademark Assistant.
Your goal is to educate users about trademarks and the registration process with clear, structured answers.

KEY GUIDELINES:
1. EDUCATIONAL ONLY: You provide general information about trademarks. You DO NOT provide legal advice.
2. NO AVAILABILITY CHECKS: You cannot check if a specific trademark is available. If asked, explain that you cannot perform searches and encourage them to use the free search form on the website or contact the team.
3. CONTACT INFO: For specific legal questions or complex scenarios, always refer them to the team at info@justprotected.com or trademarks@justprotected.com.
4. TONE: Professional, knowledgeable, approachable, and reassuring.
5. FORMATTING: 
   - Use clear numbered lists or bullet points
   - Start with a direct answer first
   - Keep responses concise (2-3 paragraphs maximum)
   - Use line breaks between sections
   - NO asterisks or markdown formatting
   - Use emojis sparingly for visual breaks only

RESPONSE STRUCTURE:
✅ Direct answer first (1-2 sentences)
✅ Supporting details (bullet points or numbered list)
✅ Next steps or call-to-action

KNOWLEDGE BASE:

SERVICES:
- Free Trademark Search: Comprehensive database search and initial assessment (1-2 days)
- Trademark Verification: Detailed analysis before filing
- Full Registration: Complete trademark registration in 150+ countries

PRICING (in EUR, includes all professional fees):
- European Union: €1,551 (additional classes: €425/class)
- United States: €1,012 (additional classes: €499/class)
- United Kingdom: €909 (additional classes: €300/class)
- Germany: €863 (additional classes: €500/class)
- Spain: €564 (additional classes: €385/class)
- China: €518 (additional classes: €450/class)
- France: €667 (additional classes: €190/class)
- Canada: €1,369 (additional classes: €150/class)

PROCESS & TIMELINE:
1. Professional Search (1-2 days)
2. Application Filing
3. Examination (3-6 months)
4. Publication/Opposition (2-3 months)
5. Registration
Total: Usually 6-12 months

TRADEMARK CLASSES:
- 45 classes total under Nice Classification
- Classes 1-34: Goods (products)
- Classes 35-45: Services
- Popular examples: Class 25 (Clothing), Class 9 (Software), Class 35 (Retail), Class 41 (Entertainment)
- Each additional class increases cost

JURISDICTION:
- Trademarks are territorial (protection in one country doesn't automatically apply to others)
- EU trademark covers 27 countries

WHEN YOU DON'T KNOW:
If unsure or the question requires specific case analysis, say: "That's a detailed question that our trademark experts can answer specifically for your situation. I'll make sure they receive your question and they'll respond within a few hours. You can also email trademarks@justprotected.com directly."

ALWAYS END WITH:
"📧 Questions about your specific case? Contact trademarks@justprotected.com"

FORMAT EXAMPLE:
How much does it cost?

Trademark costs depend on where you want protection. Here's a quick breakdown:

• EU (27 countries): €1,551
• USA: €1,012
• UK: €909
• Spain: €564

Each additional class of goods/services adds €150-€500 depending on the country.

📧 Need a quote for your specific situation? Contact trademarks@justprotected.com`

function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (
    message.includes("available") ||
    message.includes("can i register") ||
    message.includes("is this name") ||
    message.includes("check if")
  ) {
    return "Can I check trademark availability?\n\nI cannot perform real-time searches of trademark databases, but our professional team can!\n\n✅ Next steps:\n• Use our free search form on the website\n• Contact us at trademarks@justprotected.com\n• Get results within 1-2 days\n\n📧 Questions? Email trademarks@justprotected.com"
  }

  if (message.includes("cost") || message.includes("price") || message.includes("how much")) {
    return "Trademark Registration Costs\n\nPrices vary by country. Here are the main ones:\n\n• EU (27 countries): €1,551\n• USA: €1,012\n• UK: €909\n• Germany: €863\n• Spain: €564\n• China: €518\n\n💡 Each additional class adds €150-€500 depending on country.\n\n📧 Need a custom quote? Email trademarks@justprotected.com"
  }

  if (
    message.includes("how long") ||
    message.includes("timeline") ||
    message.includes("process") ||
    message.includes("steps")
  ) {
    return "Trademark Registration Timeline\n\nThe typical process takes 6-12 months:\n\n1. Professional Search → 1-2 days\n2. Application Filing → 1 week\n3. Examination → 3-6 months\n4. Publication/Opposition → 2-3 months\n5. Registration → Final approval\n\n⏱️ Timeline varies by country and if there are objections.\n\n📧 Questions about your timeline? Email trademarks@justprotected.com"
  }

  if (message.includes("class") || message.includes("category") || message.includes("nice classification")) {
    return "Trademark Classes Explained\n\nTrademarks use 45 classes under the Nice Classification:\n\n📦 Classes 1-34: Products/Goods\n🏢 Classes 35-45: Services\n\nPopular examples:\n• Class 25: Clothing, shoes\n• Class 9: Software, electronics\n• Class 35: Retail, advertising\n• Class 42: IT services\n\n💡 You pay per class you need protection in.\n\n📧 Not sure which classes? Email trademarks@justprotected.com"
  }

  if (message.includes("hello") || message.includes("hi") || message.includes("help") || message.length < 20) {
    return "👋 Hello! I'm your Trademark Assistant\n\nI can help you understand:\n\n• How trademark registration works\n• Costs for different countries\n• Which classes you might need\n• Timeline and process\n\n⚠️ I cannot: Check if specific names are available or give legal advice.\n\n❓ What would you like to know?\n\n📧 Specific questions? Email trademarks@justprotected.com"
  }

  return "Great question!\n\nYour specific situation deserves expert attention from our trademark professionals.\n\n✅ Our team can:\n• Answer your specific questions\n• Run comprehensive searches\n• Provide strategic guidance\n• Handle the entire registration\n\n⚡ We typically respond within a few hours.\n\n📧 Email us at trademarks@justprotected.com"
}

async function sendChatTranscript(messages: any[], userEmail?: string) {
  try {
    const conversationHistory = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")

    await fetch("/api/chat-transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationHistory,
        userEmail,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error("Failed to send chat transcript:", error)
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid request: messages array required" }, { status: 400 })
    }

    const openaiKey = process.env.OPENAI_API_KEY
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

    sendChatTranscript(messages).catch(() => {})

    if (!openaiKey) {
      return Response.json(
        {
          text: getFallbackResponse(lastUserMessage),
        },
        { status: 200 },
      )
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      maxOutputTokens: 500,
      temperature: 0.7,
    })

    return Response.json({ text })
  } catch (error) {
    const lastUserMessage =
      (await req.json().then((data) => data.messages?.filter((m: any) => m.role === "user").pop()?.content)) || ""

    return Response.json(
      {
        text: getFallbackResponse(lastUserMessage),
      },
      { status: 200 },
    )
  }
}
