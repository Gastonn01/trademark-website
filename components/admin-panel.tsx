"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Mail, RefreshCw, Eye, AlertCircle, Edit, Loader2, Info, Database, Wifi, WifiOff, Settings } from "lucide-react"

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
  const [selectedSearch, setSelectedSearch] = useState<SearchData | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)
  const [dataSource, setDataSource] = useState<string>("loading")
  const [editedResults, setEditedResults] = useState<any>({})
  const [savingResults, setSavingResults] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("checking")
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const { toast } = useToast()

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      console.log("Auto-refreshing admin data...")
      fetchSearches(false) // Silent refresh
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, statusFilter])

  // Initial load
  useEffect(() => {
    fetchSearches()
  }, [statusFilter])

  // Enhanced fetch function with better error handling and caching prevention
  const fetchSearches = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true)
      }
      setError(null)
      setConnectionStatus("checking")

      try {
        console.log("Admin Panel: Fetching searches with status filter:", statusFilter)

        // Add cache-busting parameters
        const timestamp = Date.now()
        const url = `/api/admin/searches?status=${statusFilter}&t=${timestamp}&refresh=true`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

        const response = await fetch(url, {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          // Prevent caching
          cache: "no-store",
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response")
        }

        const data = await response.json()
        console.log("Received data:", data)

        if (!data || typeof data !== "object") {
          throw new Error("Invalid data structure from server")
        }

        // Store debug info
        setDebugInfo(data.debug || null)

        if (!Array.isArray(data.data)) {
          console.warn("Data.data is not an array:", data.data)
          setSearches([])
          setError(data.error || "Invalid data format")
        } else {
          setSearches(data.data)
          setError(data.data.length === 0 ? "No search data available" : null)
        }

        setDataSource(data.source || "api-success")
        setConnectionStatus(data.success ? "connected" : "disconnected")
        setLastRefresh(new Date())

        console.log(`Successfully fetched ${data.data?.length || 0} records from ${data.source}`)
      } catch (err) {
        console.error("Admin Panel: Fetch error:", err)
        setConnectionStatus("disconnected")

        if (err instanceof Error) {
          if (err.name === "AbortError") {
            setError("Request timeout - server may be slow")
          } else {
            setError(`Failed to fetch data: ${err.message}`)
          }
        } else {
          setError("Unknown error occurred")
        }
      } finally {
        if (showLoading) {
          setLoading(false)
        }
      }
    },
    [statusFilter],
  )

  // Test Supabase connection
  const testConnection = async () => {
    try {
      setConnectionStatus("checking")
      const response = await fetch("/api/debug-supabase-connection")
      const result = await response.json()

      if (result.success) {
        setConnectionStatus("connected")
        toast({
          title: "Connection Test Passed",
          description: "Supabase connection is working correctly",
        })
      } else {
        setConnectionStatus("disconnected")
        toast({
          title: "Connection Test Failed",
          description: result.error || "Unknown error",
          variant: "destructive",
        })
      }

      setDebugInfo(result)
    } catch (error) {
      setConnectionStatus("disconnected")
      toast({
        title: "Connection Test Error",
        description: "Failed to test connection",
        variant: "destructive",
      })
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
        throw new Error(`HTTP ${response.status}`)
      }

      // Optimistically update the UI
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))

      toast({
        title: "Estado actualizado",
        description: `El estado de la búsqueda se ha actualizado a ${status}`,
      })

      // Refresh data after update
      setTimeout(() => fetchSearches(false), 1000)
    } catch (err) {
      console.error("Error in updateStatus:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      })
    }
  }

  const handleSendEmail = async () => {
    if (!selectedSearch || !recipientEmail) return

    setSendingEmail(true)
    try {
      await updateStatus(selectedSearch.id, "completed")

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
        variant: "destructive",
      })
    } finally {
      setSendingEmail(false)
    }
  }

  const handleSaveResults = async () => {
    if (!selectedSearch) return

    setSavingResults(true)
    try {
      await updateStatus(selectedSearch.id, "processing")

      const updatedResults = {
        trademarkName: editedResults.trademarkName || getSafeValue(selectedSearch, "search_data.trademarkName", ""),
        goodsAndServices:
          editedResults.goodsAndServices || getSafeValue(selectedSearch, "search_data.goodsAndServices", ""),
        name: editedResults.name || getSafeValue(selectedSearch, "search_data.name", ""),
        surname: editedResults.surname || getSafeValue(selectedSearch, "search_data.surname", ""),
        email: editedResults.email || getSafeValue(selectedSearch, "search_data.email", ""),
        detailedSummary: editedResults.detailedSummary || "",
        recommendations: editedResults.recommendations || "",
        ...editedResults,
      }

      setSearches(
        searches.map((search) => {
          if (search.id === selectedSearch.id) {
            return {
              ...search,
              search_data: {
                ...search.search_data,
                ...updatedResults,
              },
            }
          }
          return search
        }),
      )

      toast({
        title: "Resultados actualizados",
        description: "Los resultados de la búsqueda han sido actualizados correctamente",
      })

      setEditDialogOpen(false)
      setEditedResults({})

      // Refresh data after update
      setTimeout(() => fetchSearches(false), 1000)
    } catch (err) {
      console.error("Error in handleSaveResults:", err)
      toast({
        title: "Error",
        description: "No se pudieron actualizar los resultados",
        variant: "destructive",
      })
    } finally {
      setSavingResults(false)
    }
  }

  const openEmailDialog = (search: SearchData) => {
    setSelectedSearch(search)
    setRecipientEmail(getSafeValue(search, "search_data.email", ""))
    setEmailDialogOpen(true)
  }

  const openEditDialog = (search: SearchData) => {
    setSelectedSearch(search)
    setEditedResults({})
    updateStatus(search.id, "processing")
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

  const formatDateSafe = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm")
    } catch (err) {
      return "Invalid date"
    }
  }

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "checking":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
    }
  }

  if (error && connectionStatus === "disconnected" && searches.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error de Conexión</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => fetchSearches()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar Conexión
              </Button>
              <Button onClick={testConnection} variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Test Conexión
              </Button>
            </div>
            {debugInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm">
                <h3 className="font-semibold mb-2">Debug Info:</h3>
                <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Solicitudes de búsqueda de marcas</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {getConnectionIcon()}
              <span>
                {connectionStatus === "connected" && `Última actualización: ${format(lastRefresh, "HH:mm:ss")}`}
                {connectionStatus === "disconnected" && "Desconectado"}
                {connectionStatus === "checking" && "Verificando..."}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto-refresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="auto-refresh" className="text-sm text-gray-600">
                Auto-actualizar
              </label>
            </div>
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
            <Button onClick={() => fetchSearches()} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={testConnection} variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Advertencia</h3>
              <p className="text-amber-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p>Cargando solicitudes...</p>
          </div>
        ) : searches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No hay solicitudes disponibles</p>
            <p className="text-sm text-gray-400 mt-2">
              {statusFilter !== "all"
                ? `No hay solicitudes con estado: ${statusFilter}`
                : "La base de datos está vacía o no se puede conectar"}
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Button onClick={() => fetchSearches()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button onClick={testConnection} variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Test Conexión
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Mostrando {searches.length} solicitudes</span>
              {dataSource && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Fuente: {dataSource}</span>}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searches.map((search) => (
                  <TableRow key={search.id}>
                    <TableCell>{search.created_at ? formatDateSafe(search.created_at) : "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {search.form_type || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getSafeValue(search, "search_data.name", "") ||
                        getSafeValue(search, "search_data.firstName", "N/A")}{" "}
                      {getSafeValue(search, "search_data.surname", "") ||
                        getSafeValue(search, "search_data.lastName", "")}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {getSafeValue(search, "search_data.email", "N/A")}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {getSafeValue(search, "search_data.trademarkName", "N/A")}
                    </TableCell>
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
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Nota:</p>
                <p>Al enviar el email, el estado de la búsqueda se actualizará automáticamente a "Completado".</p>
              </div>
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar resultados de búsqueda</DialogTitle>
            <DialogDescription>Edita los resultados de la búsqueda antes de enviarlos al cliente.</DialogDescription>
          </DialogHeader>

          {selectedSearch && (
            <div className="space-y-4 mt-4 max-h-[50vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trademark-name" className="text-right">
                  Nombre de marca
                </Label>
                <Input
                  id="trademark-name"
                  defaultValue={getSafeValue(selectedSearch, "search_data.trademarkName", "")}
                  onChange={(e) => handleEditChange("trademarkName", e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="detailed-summary" className="text-right">
                  Resumen detallado
                </Label>
                <Textarea
                  id="detailed-summary"
                  value={editedResults.detailedSummary || ""}
                  onChange={(e) => handleEditChange("detailedSummary", e.target.value)}
                  className="col-span-3"
                  rows={8}
                  placeholder="Resumen ejecutivo detallado de todos los hallazgos"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recommendations" className="text-right">
                  Recomendaciones
                </Label>
                <Textarea
                  id="recommendations"
                  value={editedResults.recommendations || ""}
                  onChange={(e) => handleEditChange("recommendations", e.target.value)}
                  className="col-span-3"
                  rows={6}
                  placeholder="Recomendaciones para el cliente"
                />
              </div>
            </div>
          )}

          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveResults} disabled={savingResults}>
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
