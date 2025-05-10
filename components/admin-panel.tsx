"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface SearchData {
  id: string
  form_type: string
  search_data: any
  created_at: string
  status: string
}

export function AdminPanel() {
  const [searches, setSearches] = useState<SearchData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchSearches()
  }, [statusFilter])

  // Update the fetchSearches function to better handle errors
  const fetchSearches = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/searches?status=${statusFilter}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API response error:", errorText)
        throw new Error(`Failed to fetch searches: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data || !data.data) {
        console.warn("API returned unexpected data structure:", data)
        setSearches([])
      } else {
        setSearches(data.data || [])
      }

      setError(null)
    } catch (err) {
      console.error("Error in fetchSearches:", err)
      setError(`Error loading search data: ${err instanceof Error ? err.message : String(err)}`)
      setSearches([])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/searches", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchId: id, status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      // Actualizar la lista de búsquedas
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))
    } catch (err) {
      console.error("Error updating status:", err)
      alert("Error updating status")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            En proceso
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completado
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Solicitudes de búsqueda de marcas</h2>
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="processing">En proceso</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="rejected">Rechazados</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchSearches} variant="outline">
              Actualizar
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Cargando solicitudes...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : searches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No hay solicitudes disponibles</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searches.map((search) => (
                  <TableRow key={search.id}>
                    <TableCell>{format(new Date(search.created_at), "dd/MM/yyyy HH:mm")}</TableCell>
                    <TableCell>{search.form_type}</TableCell>
                    <TableCell>
                      {search.search_data.name} {search.search_data.surname}
                    </TableCell>
                    <TableCell>{search.search_data.email}</TableCell>
                    <TableCell>{getStatusBadge(search.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Select value={search.status} onValueChange={(value) => updateStatus(search.id, value)}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Cambiar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="processing">En proceso</SelectItem>
                            <SelectItem value="completed">Completado</SelectItem>
                            <SelectItem value="rejected">Rechazado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/verification?search_id=${search.id}`, "_blank")}
                        >
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}
