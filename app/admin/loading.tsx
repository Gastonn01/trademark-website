import { Loader2 } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <span className="ml-2 text-lg">Cargando panel de administración...</span>
    </div>
  )
}
