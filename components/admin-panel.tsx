"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Edit, Send, Eye, Copy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface SearchData {
  id: string
  form_type: string
  search_data: any
  created_at: string
  status: string
  results?: {
    similarTrademarks?: string[]
    comments?: string
    recommendation?: string
    verificationToken?: string
  }
}

export function AdminPanel() {
  const [searches, setSearches] = useState<SearchData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sendingResults, setSendingResults] = useState<string | null>(null)
  const [editingSearch, setEditingSearch] = useState<SearchData | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [similarTrademarks, setSimilarTrademarks] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [recommendation, setRecommendation] = useState<string>("")
  const [isRecommended, setIsRecommended] = useState<boolean>(false)
  const [verificationToken, setVerificationToken] = useState<string>("")

  const { toast } = useToast()

  useEffect(() => {
    fetchSearches()
  }, [statusFilter])

  const fetchSearches = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/searches?status=${statusFilter}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`
        try {
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError)
        }
        throw new Error(errorMessage)
      }

      // Parse the JSON response with error handling
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError)
        throw new Error("Invalid response format from server")
      }

      // Validate the response structure
      if (!data) {
        throw new Error("Empty response from server")
      }

      // Set the searches data
      setSearches(data.data || [])

      // If there was an error in the response but we still got data
      if (data.error) {
        console.warn("API returned an error but provided data:", data.error)
        setError(`Warning: ${data.error}`)
      } else {
        setError(null)
      }
    } catch (err) {
      console.error("Error in fetchSearches:", err)
      setError(`Error loading search data: ${err instanceof Error ? err.message : String(err)}`)
      // Keep any existing data to avoid completely breaking the UI
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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to update status")
      }

      // Update the local state
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))

      toast({
        title: "Status updated",
        description: `Search status has been updated to ${status}`,
      })
    } catch (err) {
      console.error("Error updating status:", err)
      toast({
        title: "Error updating status",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const sendResultsToCustomer = async (id: string) => {
    setSendingResults(id)
    try {
      const response = await fetch("/api/admin/send-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchId: id }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to send results")
      }

      toast({
        title: "Results sent successfully",
        description: "The customer has been notified with the search results.",
      })

      // Update status to completed if it was in processing
      if (searches.find((s) => s.id === id)?.status === "processing") {
        updateStatus(id, "completed")
      }
    } catch (err) {
      console.error("Error sending results:", err)
      toast({
        title: "Error sending results",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setSendingResults(null)
    }
  }

  const openEditDialog = (search: SearchData) => {
    setEditingSearch(search)

    // Initialize form fields with existing data or defaults
    setSimilarTrademarks(search.results?.similarTrademarks?.join("\n") || "")
    setComments(search.results?.comments || "")
    setRecommendation(search.results?.recommendation || "")
    setIsRecommended(!!search.results?.recommendation)

    // Generate a verification token if one doesn't exist
    if (search.results?.verificationToken) {
      setVerificationToken(search.results.verificationToken)
    } else {
      const newToken = generateVerificationToken()
      setVerificationToken(newToken)
    }

    setIsEditDialogOpen(true)
  }

  const generateVerificationToken = () => {
    return `token${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }

  const saveSearchResults = async () => {
    if (!editingSearch) return

    try {
      // Prepare the results data
      const resultsData = {
        similarTrademarks: similarTrademarks.split("\n").filter((t) => t.trim()),
        comments: comments,
        recommendation: isRecommended ? recommendation : "",
        verificationToken: verificationToken,
      }

      // Update the search with the results
      const response = await fetch("/api/admin/update-search-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchId: editingSearch.id,
          results: resultsData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to save search results")
      }

      // Update the local state
      setSearches(
        searches.map((search) =>
          search.id === editingSearch.id ? { ...search, results: resultsData, status: "processing" } : search,
        ),
      )

      // If the search was pending, update it to processing
      if (editingSearch.status === "pending") {
        updateStatus(editingSearch.id, "processing")
      }

      toast({
        title: "Results saved",
        description: "The search results have been saved successfully.",
      })

      // Close the dialog
      setIsEditDialogOpen(false)
    } catch (err) {
      console.error("Error saving search results:", err)
      toast({
        title: "Error saving results",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const copyVerificationLink = () => {
    const link = `${window.location.origin}/verification/${verificationToken}`
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copied",
      description: "Verification link copied to clipboard",
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm")
    } catch (error) {
      console.error("Invalid date format:", dateString, error)
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
            <Button onClick={fetchSearches} variant="outline">
              Actualizar
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-8 flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Cargando solicitudes...</span>
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
                    <TableCell>{formatDate(search.created_at)}</TableCell>
                    <TableCell>{search.form_type}</TableCell>
                    <TableCell>
                      {search.search_data?.name || "N/A"} {search.search_data?.surname || ""}
                    </TableCell>
                    <TableCell>{search.search_data?.email || "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(search.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(search)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar resultados
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/verification?search_id=${search.id}`, "_blank")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>

                        {search.results?.verificationToken && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const link = `${window.location.origin}/verification/${search.results?.verificationToken}`
                              navigator.clipboard.writeText(link)
                              toast({
                                title: "Link copied",
                                description: "Verification link copied to clipboard",
                              })
                            }}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar enlace
                          </Button>
                        )}

                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => sendResultsToCustomer(search.id)}
                          disabled={sendingResults === search.id || !search.search_data?.email || !search.results}
                        >
                          {sendingResults === search.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-1" />
                              Enviar resultados
                            </>
                          )}
                        </Button>

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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Edit Results Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar resultados de búsqueda</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Marca</Label>
              <div className="col-span-3 font-medium">
                {editingSearch?.search_data?.trademarkName || editingSearch?.search_data?.trademark_name || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Solicitante</Label>
              <div className="col-span-3">
                {editingSearch?.search_data?.name || editingSearch?.search_data?.firstName || "N/A"}{" "}
                {editingSearch?.search_data?.surname || editingSearch?.search_data?.lastName || ""}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <div className="col-span-3">{editingSearch?.search_data?.email || "N/A"}</div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Marcas similares</Label>
              <Textarea
                className="col-span-3"
                placeholder="Ingrese marcas similares (una por línea)"
                value={similarTrademarks}
                onChange={(e) => setSimilarTrademarks(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Comentarios</Label>
              <Textarea
                className="col-span-3"
                placeholder="Comentarios sobre la búsqueda"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label>Recomendación</Label>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="isRecommended"
                  checked={isRecommended}
                  onCheckedChange={(checked) => setIsRecommended(checked as boolean)}
                />
                <Label htmlFor="isRecommended">Recomendar registro</Label>
              </div>
            </div>

            {isRecommended && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Detalles de recomendación</Label>
                <Textarea
                  className="col-span-3"
                  placeholder="Detalles de la recomendación"
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Token de verificación</Label>
              <div className="col-span-2">
                <Input value={verificationToken} readOnly />
              </div>
              <Button variant="outline" size="sm" onClick={copyVerificationLink}>
                <Copy className="h-4 w-4 mr-1" />
                Copiar enlace
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveSearchResults}>Guardar resultados</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
