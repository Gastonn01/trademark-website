"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, MessageSquare } from "lucide-react"

interface ChatConversation {
  id: string
  conversation_data: {
    role: string
    content: string
  }[]
  needs_agent: boolean
  repeated_questions: boolean
  created_at: string
}

export default function ChatTranscriptsPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/chat-transcripts")
      if (!response.ok) throw new Error("Error al cargar conversaciones")
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Transcripts de Chat</h1>
            <p className="text-gray-600">Historial de conversaciones con el chatbot</p>
          </div>
          <Button onClick={fetchConversations} disabled={loading} className="bg-sky-500 hover:bg-sky-600">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="p-4 text-red-800">
              <p className="font-semibold">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {loading && conversations.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-sky-500 mx-auto mb-4" />
            <p className="text-gray-600">Cargando conversaciones...</p>
          </div>
        ) : conversations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay conversaciones registradas aún</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-900">
                        Conversación del {formatDate(conversation.created_at)}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {conversation.conversation_data.length} mensajes
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {conversation.needs_agent && (
                        <Badge variant="destructive" className="bg-red-500">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Requiere Agente
                        </Badge>
                      )}
                      {conversation.repeated_questions && (
                        <Badge variant="outline" className="border-orange-500 text-orange-700">
                          Preguntas Repetitivas
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {conversation.conversation_data.map((message, idx) => (
                      <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            message.role === "user" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm font-medium mb-1 opacity-75">
                            {message.role === "user" ? "Usuario" : "Bot"}
                          </p>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
