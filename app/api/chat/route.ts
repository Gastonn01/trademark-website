import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { streamText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const resend = new Resend(process.env.RESEND_API_KEY)
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId } = await request.json()

    const conversationSessionId = sessionId || `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const userEmail = extractEmail(messages)
    const needsAgent = checkIfNeedsAgent(messages)
    const alreadyAskedForAgent = checkIfAlreadyAskedForAgent(messages)
    
    // If user wants an agent and hasn't been asked yet, ask for email
    if (needsAgent && !alreadyAskedForAgent) {
      const agentResponse = "Entiendo que querés hablar con un agente. Por favor dejá tu correo electrónico en el chat y te contactaremos a la brevedad."
      
      const allMessages = [...messages, { role: "assistant", content: agentResponse }]
      
      try {
        await saveConversationAndNotify(conversationSessionId, allMessages, true, false)
      } catch (dbError) {
        console.error("Error saving conversation:", dbError)
      }
      
      return NextResponse.json({
        message: agentResponse,
        sessionId: conversationSessionId,
      })
    }
    
    if (alreadyAskedForAgent && userEmail) {
      const confirmResponse = `Perfecto, gracias por tu email (${userEmail}). Un agente se pondrá en contacto con vos a la brevedad. ¿Tenés alguna otra pregunta mientras tanto?`
      
      const allMessages = [...messages, { role: "assistant", content: confirmResponse }]
      
      try {
        await saveConversationAndNotify(conversationSessionId, allMessages, true, false)
      } catch (dbError) {
        console.error("Error saving conversation:", dbError)
      }
      
      return NextResponse.json({
        message: confirmResponse,
        sessionId: conversationSessionId,
      })
    }

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content: `Eres un asistente experto en registro de marcas en Argentina para Trakmar. Responde de forma BREVE y CONCRETA.

INFORMACIÓN CLAVE DE TRAKMAR:

PLANES Y PRECIOS:
- Plan Básico: $150.000 por clase
  * Presentación ante INPI
  * Seguimiento del trámite
  * Obtención del título
  
- Plan Estándar: $200.000 por clase (EL MÁS ELEGIDO)
  * Búsqueda de antecedentes
  * Presentación ante INPI
  * Seguimiento completo
  * Obtención del título
  
- Plan Plus: $220.000 por clase (PLAN ELITE - SEGURIDAD TOTAL)
  * Búsqueda exhaustiva de antecedentes
  * Presentación ante INPI
  * Seguimiento prioritario
  * Contestación de oposiciones
  * Garantía de seguimiento hasta obtener el título

- Clases adicionales: +$150.000 por cada clase extra en cualquier plan
- Estudio de Factibilidad: $10.000 (análisis previo opcional pero recomendado)

PROCESO DE REGISTRO (4 PASOS):
1. Ficha de Cliente (5 minutos): El cliente ingresa sus datos personales a través del sitio web
2. Instrucciones (Inmediato): Sistema envía automáticamente un instructivo con la documentación necesaria
3. Inicio del Expediente (2-3 días): Abogado especializado del INPI inicia la solicitud de registro
4. Seguimiento del Trámite (12-18 meses): Seguimiento completo del proceso legal hasta obtener el registro

INFORMACIÓN TÉCNICA:
- Duración total del proceso: 12-18 meses
- Sistema de clasificación: Niza (45 clases - 1-34 productos, 35-45 servicios)
- Vigencia: 10 años renovables indefinidamente
- Organismo: INPI (Instituto Nacional de la Propiedad Industrial)
- Contacto: trakmar@proton.me

INSTRUCCIONES IMPORTANTES:
- Responde en 2-3 oraciones máximo
- Sé directo y específico
- SOLO menciona precios si te preguntan específicamente por costos, precios o tarifas
- Menciona tiempos reales cuando sean relevantes
- NO des explicaciones largas ni detalles no solicitados
- Si preguntan por el proceso, explica los pasos sin mencionar precios
- Si preguntan por los planes, menciona las diferencias SIN los precios a menos que pregunten "cuánto cuesta"
- Termina ofreciendo ayuda adicional brevemente
- Si el usuario parece confundido, sugiere contactar a trakmar@proton.me
- NO inventes información
- Tono profesional pero amigable
- Responde en español argentino

EJEMPLO DE RESPUESTA BUENA (sin preguntar por precio):
Usuario: "¿Cómo funciona el proceso?"
Bot: "Es simple: completás un formulario de 5 minutos, recibís las instrucciones al instante, en 2-3 días un abogado inicia tu expediente en el INPI, y hacemos el seguimiento completo durante 12-18 meses. ¿Querés saber más sobre algún paso?"

EJEMPLO DE RESPUESTA BUENA (preguntando por precio):
Usuario: "¿Cuánto cuesta?"
Bot: "Tenemos 3 planes: Básico $150k, Estándar $200k (más elegido), y Plus $220k por clase. Cada clase adicional suma $150k. ¿Querés saber qué incluye cada uno?"

EJEMPLO DE RESPUESTA MALA (menciona precios sin que lo pidan):
Usuario: "¿Qué planes tienen?"
Bot: "Básico $150k, Estándar $200k y Plus $220k..." ❌ NO HAGAS ESTO`,
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 200,
    })

    // Convert stream to text
    let fullResponse = ""
    for await (const chunk of result.textStream) {
      fullResponse += chunk
    }

    const allMessages = [...messages, { role: "assistant", content: fullResponse }]

    const hasRepetitiveQuestions = checkRepetitiveQuestions(allMessages)

    try {
      await saveConversationAndNotify(conversationSessionId, allMessages, false, hasRepetitiveQuestions)
    } catch (dbError) {
      console.error("Error saving conversation:", dbError)
    }

    return NextResponse.json({
      message: fullResponse,
      sessionId: conversationSessionId,
    })
  } catch (error) {
    console.error("Error en chat API:", error)
    return NextResponse.json({
      message:
        "Lo siento, hubo un error. Por favor envía tu consulta a trakmar@proton.me y te responderemos en menos de 24 horas.",
    })
  }
}

function checkIfNeedsAgent(messages: any[]): boolean {
  const lastMessages = messages.slice(-3).map((m) => m.content?.toLowerCase() || "")
  const allText = lastMessages.join(" ")

  const agentKeywords = [
    "hablar con un agente",
    "agente",
    "persona real",
    "humano",
    "abogado",
    "especialista",
    "representante",
    "no entiendo",
    "no me ayudas",
    "no sirve",
    "quiero hablar",
  ]

  return agentKeywords.some((keyword) => allText.includes(keyword))
}

function checkRepetitiveQuestions(messages: any[]): boolean {
  if (messages.length < 6) return false

  const recentMessages = messages.slice(-6)
  const userMessages = recentMessages.filter((m) => m.role === "user")

  if (userMessages.length < 3) return false

  // Check if user is asking similar questions repeatedly
  const contents = userMessages.map((m) => m.content?.toLowerCase() || "")

  // Simple check: if 2 or more messages are very similar
  for (let i = 0; i < contents.length - 1; i++) {
    for (let j = i + 1; j < contents.length; j++) {
      const similarity = calculateSimilarity(contents[i], contents[j])
      if (similarity > 0.6) {
        // 60% similar
        return true
      }
    }
  }

  return false
}

function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(/\s+/))
  const words2 = new Set(text2.split(/\s+/))

  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}

async function saveConversationAndNotify(
  sessionId: string,
  messages: any[],
  needsAgent: boolean,
  hasRepetitiveQuestions: boolean,
) {
  const userEmail = extractEmail(messages)
  
  const userMessageCount = messages.filter((m) => m.role === "user").length
  const shouldSendEmail = userMessageCount >= 3 || needsAgent || hasRepetitiveQuestions

  // Try to save to database but don't let it affect email sending
  setTimeout(async () => {
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
      
      await supabase.from("chat_conversations").upsert(
        {
          session_id: sessionId,
          messages: messages,
          user_email: userEmail,
          needs_agent: needsAgent,
          has_repetitive_questions: hasRepetitiveQuestions,
          email_sent: shouldSendEmail,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "session_id",
        },
      )
    } catch (dbError) {
      // Silent fail - table doesn't exist yet, that's okay
      console.log("[v0] Chat conversations table not ready yet (run SQL script 006)")
    }
  }, 0)

  // Always send email regardless of database status
  if (shouldSendEmail) {
    await sendConversationEmail(sessionId, messages, needsAgent, hasRepetitiveQuestions, userEmail)
  }
}

function extractEmail(messages: any[]): string | null {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  
  for (const message of messages) {
    if (message.role === "user") {
      const match = message.content?.match(emailRegex)
      if (match) {
        return match[0]
      }
    }
  }
  
  return null
}

function checkIfAlreadyAskedForAgent(messages: any[]): boolean {
  return messages.some((m) => 
    m.role === "assistant" && 
    m.content?.includes("dejá tu correo electrónico")
  )
}

async function sendConversationEmail(
  sessionId: string,
  messages: any[],
  needsAgent: boolean,
  hasRepetitiveQuestions: boolean,
  userEmail: string | null,
) {
  try {
    const conversationSummary = messages
      .map((m) => `**${m.role === "user" ? "Usuario" : "Bot"}:** ${m.content}`)
      .join("\n\n")

    let subject = "Nueva conversación del chatbot"
    if (needsAgent) {
      subject = "🔴 URGENTE: Usuario solicita agente"
    } else if (hasRepetitiveQuestions) {
      subject = "⚠️ Usuario con preguntas repetitivas - Necesita ayuda"
    }

    const alertMessage = needsAgent
      ? "⚠️ **El usuario está solicitando hablar con un agente o persona real.**\n\n"
      : hasRepetitiveQuestions
        ? "⚠️ **El usuario parece estar teniendo dificultades (preguntas repetitivas).**\n\n"
        : ""
    
    const emailInfo = userEmail ? `<p><strong>📧 Email del usuario:</strong> ${userEmail}</p>` : ""

    await resend.emails.send({
      from: "Trakmar Chatbot <onboarding@resend.dev>",
      to: "guadalupe@fernandezlacort.com.ar", // Temporarily using verified email
      subject: subject,
      html: `
        <h2>${subject}</h2>
        <p><strong>⚠️ NOTA:</strong> Este email debería ir a trakmar@proton.me pero Resend requiere dominio verificado.</p>
        <p><strong>Session ID:</strong> ${sessionId}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-AR")}</p>
        <p><strong>Número de mensajes:</strong> ${messages.length}</p>
        ${emailInfo}
        
        ${alertMessage ? `<div style="background: #fee; padding: 15px; border-left: 4px solid #f00; margin: 20px 0;">${alertMessage}</div>` : ""}
        
        <h3>Resumen de la conversación:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${conversationSummary.replace(/\n/g, "<br>")}
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Este email se envía automáticamente cada vez que un usuario interactúa con el chatbot de Trakmar.
        </p>
      `,
    })
  } catch (emailError) {
    console.error("Error sending email:", emailError)
  }
}
