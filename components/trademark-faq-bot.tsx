"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ContactForm {
  name: string
  email: string
  message: string
}

export function TrademarkFAQBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you understand trademarks and the registration process. Feel free to ask me anything about trademarks, classes, jurisdictions, or how to get started!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [collectingContact, setCollectingContact] = useState(false)
  const [contactForm, setContactForm] = useState<ContactForm>({ name: "", email: "", message: "" })
  const [contactSubmitting, setContactSubmitting] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return
    }

    setContactSubmitting(true)

    try {
      const conversationHistory = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")

      const response = await fetch("/api/chatbot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          conversationHistory,
        }),
      })

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Thank you, ${contactForm.name}! I've sent your question to our expert team at info@justprotected.com. They typically respond within a few hours and will provide detailed, professional guidance for your specific situation.\n\nIn the meantime, feel free to ask me any other general questions about trademarks!`,
          },
        ])
        setCollectingContact(false)
        setContactForm({ name: "", email: "", message: "" })
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I apologize, there was an issue sending your message. Please email us directly at info@justprotected.com and our team will assist you right away!",
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, there was an issue sending your message. Please email us directly at info@justprotected.com and our team will assist you right away!",
        },
      ])
    } finally {
      setContactSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/trademark-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      })

      if (!response.ok) {
        let errorMessage = "Failed to get response"
        try {
          const errorData = await response.json()
          errorMessage = errorData?.error || errorData?.message || errorMessage
        } catch {
          try {
            errorMessage = await response.text()
          } catch {}
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const assistantMessage = data.text || data.message || "I apologize, but I couldn't generate a response."
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }])

      if (
        assistantMessage.includes("Just provide your name and email") ||
        (assistantMessage.includes("provide") &&
          assistantMessage.includes("name") &&
          assistantMessage.includes("email"))
      ) {
        setCollectingContact(true)
        setContactForm((prev) => ({ ...prev, message: userMessage }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage.includes("info@justprotected.com")
            ? errorMessage
            : "I apologize, but I'm having trouble responding right now. Please try again or contact our team directly at info@justprotected.com for immediate assistance.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all",
          "bg-blue-700 hover:bg-blue-800 text-white",
          isOpen && "hidden",
        )}
        aria-label="Open trademark FAQ chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Trademark FAQ</h3>
              <p className="text-xs text-blue-100">Ask us anything about trademarks</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-600 h-8 w-8"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  message.role === "user" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-900",
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-700" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {collectingContact ? (
          <form onSubmit={handleContactSubmit} className="p-4 border-t space-y-3">
            <Input
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="text-sm"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={contactForm.email}
              onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="text-sm"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setCollectingContact(false)
                  setContactForm({ name: "", email: "", message: "" })
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={contactSubmitting || !contactForm.name || !contactForm.email}
                className="flex-1 bg-blue-700 hover:bg-blue-800"
              >
                {contactSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send to Team"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about trademarks..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-700 hover:bg-blue-800">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">General information only. Not legal advice.</p>
          </form>
        )}
      </div>
    </>
  )
}
