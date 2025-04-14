"use client"

import { useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description: string }>>([])

  const toast = ({ title, description }: { title: string; description: string }) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description }])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return { toast, toasts }
}
