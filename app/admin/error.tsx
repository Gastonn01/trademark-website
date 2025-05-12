"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Admin panel error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error en el panel de administración</h2>
      <p className="text-gray-700 mb-6">
        Ha ocurrido un error al cargar el panel de administración. Por favor, intenta de nuevo.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Intentar de nuevo
        </Button>
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
