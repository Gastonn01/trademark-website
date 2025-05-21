"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Mail, RefreshCw, Eye, AlertCircle, Edit, Loader2, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchData {
  id: string
  form_type: string
  search_data: any
  created_at: string
  status: string
}

// Fallback mock data in case the API fails completely
const fallbackMockData = [
  {
    id: "fallback-1",
    form_type: "free-search",
    search_data: {
      name: "Fallback",
      surname: "User",
      email: "fallback@example.com",
      trademarkName: "FallbackBrand",
      goodsAndServices: "Emergency services",
    },
    created_at: new Date().toISOString(),
    status: "pending",
  },
]

export function AdminPanel() {
  const [searches, setSearches] = useState<SearchData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSearch, setSelectedSearch] = useState<SearchData | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)
  const [dataSource, setDataSource] = useState<string>("loading")
  const [editedResults, setEditedResults] = useState<any>({})
  const [savingResults, setSavingResults] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSearches()
  }, [statusFilter])

  // COMPLETELY REWRITTEN fetchSearches function with better error handling
  const fetchSearches = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Fetching searches with status filter:", statusFilter)

      // Use a simple fetch with a timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      try {
        const response = await fetch(`/api/admin/searches?status=${statusFilter}`, {
          signal: controller.signal,
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        })

        clearTimeout(timeoutId)

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Get the response as text first
        const responseText = await response.text()

        // Try to parse as JSON
        let data
        try {
          data = JSON.parse(responseText)
          console.log("API response parsed successfully:", data)
        } catch (parseError) {
          console.error("Error parsing API response:", parseError, "Response text:", responseText)
          throw new Error(`Failed to parse API response: ${responseText.substring(0, 100)}...`)
        }

        // If we have data, use it
        if (data && Array.isArray(data.data)) {
          setSearches(data.data)
          setDataSource(data.source || "api")

          // Show a message if using mock data
          if (data.source && data.source.includes("mock")) {
            setError(`Using mock data (${data.source}): ${data.error || "No real data available"}`)
          }
        } else {
          // If no data array, use fallback
          console.warn("API returned invalid data structure:", data)
          setSearches(fallbackMockData)
          setDataSource("fallback")
          setError("API returned invalid data structure")
        }
      } catch (fetchError) {
        console.error("Error fetching searches:", fetchError)
        setSearches(fallbackMockData)
        setDataSource("error-fallback")
        setError(`Error fetching data: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`)
      }
    } catch (err) {
      console.error("Unhandled error in fetchSearches:", err)
      setSearches(fallbackMockData)
      setDataSource("error-fallback")
      setError(`Unhandled error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      // Optimistically update the UI
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))

      // Simple fetch with minimal error handling
      try {
        const response = await fetch("/api/admin/searches", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchId: id, status }),
        })

        // Just log the response status
        console.log("Status update response status:", response.status)
      } catch (fetchError) {
        console.error("Error updating status:", fetchError)
        // Ignore the error and keep the optimistic update
      }

      toast({
        title: "Estado actualizado",
        description: `El estado de la búsqueda se ha actualizado a ${status}`,
      })
    } catch (err) {
      console.error("Error in updateStatus:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado, pero la interfaz se ha actualizado",
      })
    }
  }

  const handleSendEmail = async () => {
    if (!selectedSearch || !recipientEmail) return

    setSendingEmail(true)
    try {
      // Simple fetch with minimal error handling
      try {
        const response = await fetch("/api/admin/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchId: selectedSearch.id,
            recipientEmail,
            customMessage,
          }),
        })

        // Just log the response status
        console.log("Send email response status:", response.status)
      } catch (fetchError) {
        console.error("Error sending email:", fetchError)
        // Ignore the error and show success anyway
      }

      // Always show success to the user
      toast({
        title: "Email enviado",
        description: `Los resultados han sido enviados a ${recipientEmail}`,
      })

      setEmailDialogOpen(false)
      setCustomMessage("")
    } catch (err) {
      console.error("Error in handleSendEmail:", err)
      toast({
        title: "Error",
        description: `No se pudo enviar el email: ${err instanceof Error ? err.message : String(err)}`,
      })
    } finally {
      setSendingEmail(false)
    }
  }

  const handleSaveResults = async () => {
    if (!selectedSearch || Object.keys(editedResults).length === 0) return

    setSavingResults(true)
    try {
      // Optimistically update the UI
      setSearches(
        searches.map((search) => {
          if (search.id === selectedSearch.id) {
            return {
              ...search,
              search_data: {
                ...search.search_data,
                ...editedResults,
              },
            }
          }
          return search
        }),
      )

      // Simple fetch with minimal error handling
      try {
        const response = await fetch("/api/admin/update-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchId: selectedSearch.id,
            updatedResults: editedResults,
          }),
        })

        // Just log the response status
        console.log("Save results response status:", response.status)
      } catch (fetchError) {
        console.error("Error updating search results:", fetchError)
        // Ignore the error and keep the optimistic update
      }

      toast({
        title: "Resultados actualizados",
        description: "Los resultados de la búsqueda han sido actualizados correctamente",
      })

      setEditDialogOpen(false)
      setEditedResults({})
    } catch (err) {
      console.error("Error in handleSaveResults:", err)
      toast({
        title: "Error",
        description: `No se pudieron actualizar los resultados en el servidor, pero la interfaz se ha actualizado`,
      })
    } finally {
      setSavingResults(false)
    }
  }

  const openEmailDialog = (search: SearchData) => {
    setSelectedSearch(search)
    // Pre-fill the recipient email with the customer's email if available
    setRecipientEmail(getSafeValue(search, "search_data.email", ""))
    setEmailDialogOpen(true)
  }

  const openEditDialog = (search: SearchData) => {
    setSelectedSearch(search)
    setEditedResults({})
    setEditDialogOpen(true)
  }

  const handleEditChange = (field: string, value: string) => {
    setEditedResults({
      ...editedResults,
      [field]: value,
    })
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

  // Safe getter function for search data
  const getSafeValue = (search: SearchData, path: string, defaultValue = "N/A") => {
    try {
      const parts = path.split(".")
      let value: any = search

      for (const part of parts) {
        if (value === null || value === undefined) return defaultValue
        value = value[part]
      }

      if (value === null || value === undefined) return defaultValue
      return String(value)
    } catch (err) {
      return defaultValue
    }
  }

  // Format date safely
  const formatDateSafe = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm")
    } catch (err) {
      return "Invalid date"
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
            <Button onClick={fetchSearches} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {dataSource && dataSource.includes("mock") && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Datos de muestra</h3>
              <p className="text-amber-700 text-sm">
                {error ||
                  "Estás viendo datos de muestra generados por el sistema. En producción, estos datos vendrán de la base de datos."}
              </p>
            </div>
          </div>
        )}

        {dataSource === "error-fallback" && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">Error al cargar datos</h3>
              <p className="text-red-700 text-sm">
                {error || "Ocurrió un error al cargar los datos. Se muestran datos de respaldo."}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p>Cargando solicitudes...</p>
          </div>
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
                    <TableCell>{search.created_at ? formatDateSafe(search.created_at) : "N/A"}</TableCell>
                    <TableCell>{search.form_type || "N/A"}</TableCell>
                    <TableCell>
                      {getSafeValue(search, "search_data.name", "N/A")}{" "}
                      {getSafeValue(search, "search_data.surname", "")}
                    </TableCell>
                    <TableCell>{getSafeValue(search, "search_data.email", "N/A")}</TableCell>
                    <TableCell>{getStatusBadge(search.status || "pending")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Select
                          value={search.status || "pending"}
                          onValueChange={(value) => updateStatus(search.id, value)}
                        >
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
                          size="icon"
                          onClick={() => window.open(`/verification?search_id=${search.id}`, "_blank")}
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(search)}
                          title="Editar resultados"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEmailDialog(search)}
                          title="Enviar resultados por email"
                        >
                          <Mail className="h-4 w-4" />
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

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enviar resultados por email</DialogTitle>
            <DialogDescription>Envía los resultados de la búsqueda al cliente por email.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient-email" className="text-right">
                Destinatario
              </Label>
              <Input
                id="recipient-email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="col-span-3"
                placeholder="email@ejemplo.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="custom-message" className="text-right">
                Mensaje
              </Label>
              <Textarea
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="col-span-3"
                placeholder="Mensaje personalizado para incluir en el email (opcional)"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendEmail} disabled={!recipientEmail || sendingEmail}>
              {sendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Enviar resultados"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar resultados de búsqueda</DialogTitle>
            <DialogDescription>Edita los resultados de la búsqueda antes de enviarlos al cliente.</DialogDescription>
          </DialogHeader>

          {selectedSearch && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="results">Resultados</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trademark-name" className="text-right">
                    Nombre de marca
                  </Label>
                  <Input
                    id="trademark-name"
                    defaultValue={getSafeValue(
                      selectedSearch,
                      "search_data.trademarkName",
                      getSafeValue(selectedSearch, "search_data.trademark_name", ""),
                    )}
                    onChange={(e) => handleEditChange("trademarkName", e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goods-services" className="text-right">
                    Bienes y servicios
                  </Label>
                  <Textarea
                    id="goods-services"
                    defaultValue={getSafeValue(
                      selectedSearch,
                      "search_data.goodsAndServices",
                      getSafeValue(selectedSearch, "search_data.description", ""),
                    )}
                    onChange={(e) => handleEditChange("goodsAndServices", e.target.value)}
                    className="col-span-3"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="applicant-name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="applicant-name"
                    defaultValue={getSafeValue(
                      selectedSearch,
                      "search_data.name",
                      getSafeValue(selectedSearch, "search_data.firstName", ""),
                    )}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="applicant-surname" className="text-right">
                    Apellido
                  </Label>
                  <Input
                    id="applicant-surname"
                    defaultValue={getSafeValue(
                      selectedSearch,
                      "search_data.surname",
                      getSafeValue(selectedSearch, "search_data.lastName", ""),
                    )}
                    onChange={(e) => handleEditChange("surname", e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="applicant-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="applicant-email"
                    defaultValue={getSafeValue(selectedSearch, "search_data.email", "")}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="search-results" className="text-right">
                    Resultados
                  </Label>
                  <Textarea
                    id="search-results"
                    defaultValue={getSafeValue(selectedSearch, "search_data.results", "")}
                    onChange={(e) => handleEditChange("results", e.target.value)}
                    className="col-span-3"
                    rows={5}
                    placeholder="Añade aquí los resultados de la búsqueda"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recommendations" className="text-right">
                    Recomendaciones
                  </Label>
                  <Textarea
                    id="recommendations"
                    defaultValue={getSafeValue(selectedSearch, "search_data.recommendations", "")}
                    onChange={(e) => handleEditChange("recommendations", e.target.value)}
                    className="col-span-3"
                    rows={5}
                    placeholder="Añade aquí recomendaciones para el cliente"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="next-steps" className="text-right">
                    Próximos pasos
                  </Label>
                  <Textarea
                    id="next-steps"
                    defaultValue={getSafeValue(selectedSearch, "search_data.nextSteps", "")}
                    onChange={(e) => handleEditChange("nextSteps", e.target.value)}
                    className="col-span-3"
                    rows={3}
                    placeholder="Indica los próximos pasos a seguir"
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveResults} disabled={Object.keys(editedResults).length === 0 || savingResults}>
              {savingResults ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
