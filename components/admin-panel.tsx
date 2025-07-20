"use client"

import { useEffect, useState } from "react"
import { getAllSearchData, updateSearchRecord, deleteSearchRecord } from "@/lib/supabase"
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Send, Eye, EyeOff, RefreshCw, AlertCircle, Loader2, Info } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SearchRecord {
  id: string
  trademark_name: string
  email: string
  status: string
  search_results: any
  created_at: string
  updated_at: string
}

// Fallback mock data for testing
const mockSearchData: SearchRecord[] = [
  {
    id: "mock-1",
    trademark_name: "TestBrand",
    email: "test@example.com",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    search_results: {
      formType: "free-search",
      name: "John",
      surname: "Doe",
      phone: "+1234567890",
      marketing_consent: true,
      trademark_type: "word",
      goods_and_services: "Software services",
    },
  },
  {
    id: "mock-2",
    trademark_name: "VerifyBrand",
    email: "verify@example.com",
    status: "processing",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    search_results: {
      formType: "verification",
      name: "Jane",
      surname: "Smith",
      phone: "+0987654321",
      marketing_consent: false,
      trademark_type: "logo",
      goods_and_services: "Consulting services",
    },
  },
  {
    id: "mock-3",
    trademark_name: "AnotherBrand",
    email: "another@example.com",
    status: "completed",
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    search_results: {
      formType: "verification",
      name: "Bob",
      surname: "Johnson",
      phone: "+1122334455",
      marketing_consent: true,
      trademark_type: "combined",
      goods_and_services: "Manufacturing",
      notes: "Completed successfully with no conflicts found",
    },
  },
]

export function AdminPanel() {
  const [searches, setSearches] = useState<SearchRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState("")
  const [editNotes, setEditNotes] = useState("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState("all")
  const [dataSource, setDataSource] = useState<string>("loading")
  const { toast } = useToast()

  // Fetch all searches from Supabase using the new client-side function
  const fetchSearches = async () => {
    try {
      setLoading(true)
      setError(null)
      setDataSource("loading")

      console.log("🔄 Fetching all searches from Supabase...")

      // Check if environment variables are available
      const hasEnvVars = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

      if (!hasEnvVars) {
        console.warn("⚠️ Supabase environment variables not found, using mock data")
        setSearches(mockSearchData)
        setDataSource("mock-env-missing")
        setError("Environment variables missing - using mock data")
        return
      }

      try {
        const data = await getAllSearchData()
        console.log("✅ Successfully fetched", data?.length || 0, "searches")

        if (!data || data.length === 0) {
          console.log("📝 No data found, using mock data for demonstration")
          setSearches(mockSearchData)
          setDataSource("mock-no-data")
          setError("No data found in database - showing mock data")
        } else {
          setSearches(data)
          setDataSource("supabase-success")
          setError(null)
        }
      } catch (supabaseError) {
        console.error("❌ Supabase error, falling back to mock data:", supabaseError)
        setSearches(mockSearchData)
        setDataSource("mock-supabase-error")
        setError(`Supabase error: ${supabaseError instanceof Error ? supabaseError.message : String(supabaseError)}`)
      }
    } catch (err) {
      console.error("❌ Critical error fetching searches:", err)
      setSearches(mockSearchData)
      setDataSource("mock-critical-error")
      setError(`Critical error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearches()
  }, [])

  // Filter searches based on formType
  const filteredSearches = searches.filter((search) => {
    const formType = search.search_results?.formType
    if (filter === "all") return true
    if (filter === "verification") return formType === "verification"
    if (filter === "free-search") return formType === "free-search"
    return true
  })

  const handleEdit = (search: SearchRecord) => {
    setEditingId(search.id)
    setEditStatus(search.status)
    setEditNotes(search.search_results?.notes || "")
  }

  const handleSave = async (id: string) => {
    try {
      // Check if we're using mock data
      if (dataSource.includes("mock")) {
        // Simulate save for mock data
        setSearches(
          searches.map((search) =>
            search.id === id
              ? {
                  ...search,
                  status: editStatus,
                  search_results: {
                    ...search.search_results,
                    notes: editNotes,
                  },
                }
              : search,
          ),
        )

        toast({
          title: "Success (Mock)",
          description: "Search updated successfully (mock data)",
        })

        setEditingId(null)
        return
      }

      // Use the client-side update function
      await updateSearchRecord(id, editStatus, editNotes)

      console.log("✅ Search updated successfully")
      toast({
        title: "Success",
        description: "Search updated successfully",
      })

      setEditingId(null)
      fetchSearches() // Refresh data
    } catch (err) {
      console.error("❌ Error saving changes:", err)
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this search?")) return

    try {
      // Check if we're using mock data
      if (dataSource.includes("mock")) {
        // Simulate delete for mock data
        setSearches(searches.filter((search) => search.id !== id))

        toast({
          title: "Success (Mock)",
          description: "Search deleted successfully (mock data)",
        })
        return
      }

      // Use the client-side delete function
      await deleteSearchRecord(id)

      console.log("✅ Search deleted successfully")
      toast({
        title: "Success",
        description: "Search deleted successfully",
      })

      fetchSearches() // Refresh data
    } catch (err) {
      console.error("❌ Error deleting search:", err)
      toast({
        title: "Error",
        description: "Failed to delete search",
        variant: "destructive",
      })
    }
  }

  const handleSendEmail = async (search: SearchRecord) => {
    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchId: search.id,
          email: search.email,
          name: search.search_results?.name || "Customer",
          trademarkName: search.trademark_name,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Email sent successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: `Failed to send email: ${result.message}`,
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("❌ Error sending email:", err)
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      })
    }
  }

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "processing":
      case "in-progress":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getFormTypeBadgeVariant = (formType: string) => {
    switch (formType) {
      case "verification":
        return "default"
      case "free-search":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getFormTypeLabel = (formType: string) => {
    switch (formType) {
      case "verification":
        return "🛡️ Verification"
      case "free-search":
        return "🔍 Free Search"
      default:
        return formType || "Unknown"
    }
  }

  const getDataSourceMessage = (source: string) => {
    switch (source) {
      case "supabase-success":
        return { type: "success", message: "Data loaded from Supabase successfully" }
      case "mock-env-missing":
        return { type: "warning", message: "Environment variables missing - using mock data" }
      case "mock-no-data":
        return { type: "info", message: "No data in database - showing mock data for demonstration" }
      case "mock-supabase-error":
        return { type: "error", message: "Supabase connection failed - using mock data" }
      case "mock-critical-error":
        return { type: "error", message: "Critical error occurred - using mock data" }
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p>Loading searches...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const dataSourceInfo = getDataSourceMessage(dataSource)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trademark Searches Admin Panel</span>
            <Button onClick={fetchSearches} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Data Source Info */}
          {dataSourceInfo && (
            <div
              className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
                dataSourceInfo.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : dataSourceInfo.type === "warning"
                    ? "bg-amber-50 border border-amber-200"
                    : dataSourceInfo.type === "info"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-red-50 border border-red-200"
              }`}
            >
              <Info
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  dataSourceInfo.type === "success"
                    ? "text-green-500"
                    : dataSourceInfo.type === "warning"
                      ? "text-amber-500"
                      : dataSourceInfo.type === "info"
                        ? "text-blue-500"
                        : "text-red-500"
                }`}
              />
              <div>
                <h3
                  className={`font-medium ${
                    dataSourceInfo.type === "success"
                      ? "text-green-800"
                      : dataSourceInfo.type === "warning"
                        ? "text-amber-800"
                        : dataSourceInfo.type === "info"
                          ? "text-blue-800"
                          : "text-red-800"
                  }`}
                >
                  Data Source Status
                </h3>
                <p
                  className={`text-sm ${
                    dataSourceInfo.type === "success"
                      ? "text-green-700"
                      : dataSourceInfo.type === "warning"
                        ? "text-amber-700"
                        : dataSourceInfo.type === "info"
                          ? "text-blue-700"
                          : "text-red-700"
                  }`}
                >
                  {dataSourceInfo.message}
                </p>
                {dataSourceInfo.type !== "success" && (
                  <p className="text-xs mt-1 opacity-75">
                    Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Filter Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por tipo:</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({searches.length})</SelectItem>
                <SelectItem value="verification">
                  Verification ({searches.filter((s) => s.search_results?.formType === "verification").length})
                </SelectItem>
                <SelectItem value="free-search">
                  Free Search ({searches.filter((s) => s.search_results?.formType === "free-search").length})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredSearches.length} of {searches.length} total searches
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Trademark</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSearches.map((search) => (
                  <>
                    <TableRow key={search.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toggleRowExpansion(search.id)}>
                          {expandedRows.has(search.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {search.search_results?.name} {search.search_results?.surname}
                      </TableCell>
                      <TableCell>{search.email}</TableCell>
                      <TableCell className="font-medium">{search.trademark_name}</TableCell>
                      <TableCell>
                        <Badge variant={getFormTypeBadgeVariant(search.search_results?.formType)}>
                          {getFormTypeLabel(search.search_results?.formType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === search.id ? (
                          <Select value={editStatus} onValueChange={setEditStatus}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant={getStatusBadgeVariant(search.status)}>{search.status}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(search.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {editingId === search.id ? (
                            <>
                              <Button size="sm" onClick={() => handleSave(search.id)} className="h-8 w-8 p-0">
                                ✓
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingId(null)}
                                className="h-8 w-8 p-0"
                              >
                                ✕
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(search)}
                                className="h-8 w-8 p-0"
                                title="Edit search"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSendEmail(search)}
                                className="h-8 w-8 p-0"
                                title="Send email"
                              >
                                <Send className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(search.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                title="Delete search"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(search.id) && (
                      <TableRow>
                        <TableCell colSpan={8} className="bg-gray-50 p-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Contact Information</h4>
                                <p>
                                  <strong>Phone:</strong> {search.search_results?.phone || "Not provided"}
                                </p>
                                <p>
                                  <strong>Marketing Consent:</strong>{" "}
                                  {search.search_results?.marketing_consent ? "Yes" : "No"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Trademark Details</h4>
                                <p>
                                  <strong>Type:</strong> {search.search_results?.trademark_type || "Not specified"}
                                </p>
                                <p>
                                  <strong>Goods/Services:</strong>{" "}
                                  {search.search_results?.goods_and_services || "Not provided"}
                                </p>
                              </div>
                            </div>
                            {search.search_results?.countries && (
                              <div>
                                <h4 className="font-semibold mb-2">Countries</h4>
                                <p>
                                  {Array.isArray(search.search_results.countries)
                                    ? search.search_results.countries.map((c: any) => c.name || c).join(", ")
                                    : "Not specified"}
                                </p>
                              </div>
                            )}
                            {search.search_results?.classes && (
                              <div>
                                <h4 className="font-semibold mb-2">Classes</h4>
                                <p>
                                  {Array.isArray(search.search_results.classes)
                                    ? search.search_results.classes.join(", ")
                                    : "Not specified"}
                                </p>
                              </div>
                            )}
                            {editingId === search.id && (
                              <div>
                                <h4 className="font-semibold mb-2">Notes</h4>
                                <Textarea
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Add notes..."
                                  rows={3}
                                />
                              </div>
                            )}
                            {search.search_results?.notes && editingId !== search.id && (
                              <div>
                                <h4 className="font-semibold mb-2">Notes</h4>
                                <p className="text-gray-700">{search.search_results.notes}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSearches.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No searches found matching the current filter.</p>
              <Button onClick={fetchSearches} variant="outline" className="mt-4 bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
