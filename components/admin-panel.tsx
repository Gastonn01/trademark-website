"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Mail, RefreshCw, Eye, AlertCircle, Edit, Loader2, Info, DollarSign, Globe, Upload } from "lucide-react"

interface SearchData {
  id: string
  trademark_name: string
  email: string
  status: string
  created_at: string
  updated_at: string
  search_results: any
  table_type: "trademark_searches" | "verification_requests"
  form_type: string
  // Verification-specific fields
  estimated_price?: number
  files_count?: number
  selected_countries?: any[]
  selected_classes?: number[]
  trademark_type?: string
  contact_phone?: string
  marketing_consent?: boolean
}

export function AdminPanel() {
  const [searches, setSearches] = useState<SearchData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("free-searches")
  const [selectedSearch, setSelectedSearch] = useState<SearchData | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)
  const [editedResults, setEditedResults] = useState<any>({})
  const [savingResults, setSavingResults] = useState(false)
  const { toast } = useToast()

  // Compose email dialog state
  const [composeDialogOpen, setComposeDialogOpen] = useState(false)
  const [composeRecipient, setComposeRecipient] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")
  const [sendingComposeEmail, setSendingComposeEmail] = useState(false)

  // Follow-up email functionality state
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<SearchData[]>([])
  const [followUpSubject, setFollowUpSubject] = useState("Following up on your trademark inquiry")
  const [followUpMessage, setFollowUpMessage] = useState("")
  const [sendingFollowUp, setSendingFollowUp] = useState(false)

  // CSV upload state
  const [csvUploadOpen, setCsvUploadOpen] = useState(false)
  const [csvData, setCsvData] = useState("")
  const [processingCsv, setProcessingCsv] = useState(false)

  useEffect(() => {
    fetchSearches()
  }, [statusFilter, activeTab])

  const fetchSearches = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Admin Panel: Fetching searches with filters:", { statusFilter, activeTab })

      const formTypeFilter = activeTab === "free-searches" ? "free-search" : "verification"

      const response = await fetch(`/api/admin/searches?status=${statusFilter}&formType=${formTypeFilter}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      })

      const responseText = await response.text()

      if (!response.ok) {
        console.error("Response not OK:", response.status, responseText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse response:", responseText)
        throw new Error("Invalid JSON response from server")
      }

      if (!data || typeof data !== "object") {
        throw new Error("Invalid data structure from server")
      }

      if (data.error) {
        throw new Error(`Server error: ${data.details || data.error}`)
      }

      if (!Array.isArray(data.data)) {
        console.warn("Data is not an array:", data)
        setSearches([])
        setError("No search data available")
      } else {
        setSearches(data.data)
        if (data.data.length === 0) {
          setError("No search data available")
        } else {
          setError(null)
        }
      }
    } catch (err) {
      console.error("Admin Panel: Error fetching searches:", err)
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
      setSearches([])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (
    id: string,
    status: string,
    tableType: "trademark_searches" | "verification_requests",
  ) => {
    try {
      // Optimistically update the UI
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))

      // You can add an API call here to actually update the database
      // await updateSearchStatus(id, status, tableType)

      toast({
        title: "Status updated",
        description: `Search status has been updated to ${status}`,
      })
    } catch (err) {
      console.error("Error in updateStatus:", err)
      toast({
        title: "Error",
        description: "Could not update status",
        variant: "destructive",
      })
    }
  }

  const handleSendEmail = async () => {
    if (!selectedSearch || !recipientEmail) return

    setSendingEmail(true)
    try {
      await updateStatus(selectedSearch.id, "completed", selectedSearch.table_type)

      toast({
        title: "Email sent",
        description: `Results have been sent to ${recipientEmail}`,
      })

      setEmailDialogOpen(false)
      setCustomMessage("")
    } catch (err) {
      console.error("Error in handleSendEmail:", err)
      toast({
        title: "Error",
        description: `Could not send email: ${err instanceof Error ? err.message : String(err)}`,
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
      await updateStatus(selectedSearch.id, "processing", selectedSearch.table_type)

      // Update the search in the local state
      setSearches(
        searches.map((search) => {
          if (search.id === selectedSearch.id) {
            return {
              ...search,
              search_results: {
                ...search.search_results,
                ...editedResults,
              },
            }
          }
          return search
        }),
      )

      toast({
        title: "Results updated",
        description: "Search results have been updated successfully",
      })

      setEditDialogOpen(false)
      setEditedResults({})
    } catch (err) {
      console.error("Error in handleSaveResults:", err)
      toast({
        title: "Error",
        description: "Could not update results",
        variant: "destructive",
      })
    } finally {
      setSavingResults(false)
    }
  }

  const handleComposeEmail = async () => {
    if (!composeRecipient || !composeSubject || !composeMessage) {
      toast({
        title: "Required fields",
        description: "Please complete all required fields",
        variant: "destructive",
      })
      return
    }

    setSendingComposeEmail(true)
    try {
      const response = await fetch("/api/admin/compose-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail: composeRecipient,
          subject: composeSubject,
          message: composeMessage,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      toast({
        title: "Email sent",
        description: `Email has been sent to ${composeRecipient}`,
      })

      setComposeDialogOpen(false)
      setComposeRecipient("")
      setComposeSubject("")
      setComposeMessage("")
    } catch (err) {
      console.error("Error in handleComposeEmail:", err)
      toast({
        title: "Error",
        description: `Could not send email: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      })
    } finally {
      setSendingComposeEmail(false)
    }
  }

  const handleSendFollowUp = async () => {
    // Validate that we have users with valid email addresses
    const validUsers = selectedUsers.filter((user) => user.email && user.email.trim() !== "")

    if (validUsers.length === 0 || !followUpSubject || !followUpMessage) {
      toast({
        title: "Required fields",
        description: "Please add at least one valid email address and complete all required fields",
        variant: "destructive",
      })
      return
    }

    setSendingFollowUp(true)
    try {
      const response = await fetch("/api/admin/send-follow-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: validUsers.map((user) => ({
            id: user.id,
            email: user.email,
            trademarkName: user.trademark_name || "",
            name: "", // No name for manual entries
            address: "", // No address needed
          })),
          subject: followUpSubject,
          message: followUpMessage,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()

      toast({
        title: "Follow-up emails sent",
        description: `Successfully sent ${result.successCount} emails to users`,
      })

      setFollowUpDialogOpen(false)
      setSelectedUsers([])
      setFollowUpMessage("")
    } catch (err) {
      console.error("Error in handleSendFollowUp:", err)
      toast({
        title: "Error",
        description: `Could not send follow-up emails: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      })
    } finally {
      setSendingFollowUp(false)
    }
  }

  const openEmailDialog = (search: SearchData) => {
    setSelectedSearch(search)
    setRecipientEmail(search.email || getSafeValue(search, "search_results.email", ""))
    setEmailDialogOpen(true)
  }

  const openEditDialog = (search: SearchData) => {
    setSelectedSearch(search)
    setEditedResults({})
    updateStatus(search.id, "processing", search.table_type)
    setEditDialogOpen(true)
  }

  const openFollowUpDialog = () => {
    // Start with empty manual entries instead of auto-selecting users
    setSelectedUsers([])

    setFollowUpMessage(`I hope this email finds you well.

I wanted to follow up on your recent trademark search inquiry. I understand that trademark registration can seem complex, but I'm here to help make the process as smooth as possible for you.

Based on our initial review, your trademark appears to have good potential for registration. However, there are several important factors we need to consider to ensure the best possible outcome:

• Comprehensive trademark search across all relevant databases
• Proper classification of your goods/services
• Strategic filing approach to maximize protection
• Ongoing monitoring to protect your rights

The trademark landscape is constantly evolving, and timing can be crucial. The sooner we can secure your application, the better positioned you'll be to protect your brand.

I'd be happy to discuss your specific situation and provide you with a detailed assessment of your trademark's registrability, along with a clear roadmap for moving forward.

Would you be interested in scheduling a brief consultation to discuss your trademark protection strategy?`)

    setFollowUpDialogOpen(true)
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
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFormTypeBadge = (formType: string) => {
    switch (formType) {
      case "free-search":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            🔍 Free Search
          </Badge>
        )
      case "verification":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            🛡️ Verification
          </Badge>
        )
      default:
        return <Badge variant="outline">{formType || "Unknown"}</Badge>
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

  const renderSearchTable = (data: SearchData[]) => {
    if (loading) {
      return (
        <div className="text-center py-8 flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
          <p>Loading requests...</p>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No requests available</p>
          <Button onClick={fetchSearches} variant="outline" className="mt-4 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Trademark</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              {activeTab === "verifications" && <TableHead>Price</TableHead>}
              {activeTab === "verifications" && <TableHead>Countries</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((search) => (
              <TableRow key={search.id}>
                <TableCell>{search.created_at ? formatDateSafe(search.created_at) : "N/A"}</TableCell>
                <TableCell>{getFormTypeBadge(search.form_type)}</TableCell>
                <TableCell className="font-medium">
                  {search.trademark_name || getSafeValue(search, "search_results.trademarkName", "N/A")}
                </TableCell>
                <TableCell>
                  {getSafeValue(search, "search_results.name", "N/A")}{" "}
                  {getSafeValue(search, "search_results.surname", "")}
                </TableCell>
                <TableCell>{search.email || getSafeValue(search, "search_results.email", "N/A")}</TableCell>
                {activeTab === "verifications" && (
                  <TableCell>
                    {search.estimated_price ? (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />€{search.estimated_price.toFixed(0)}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                )}
                {activeTab === "verifications" && (
                  <TableCell>
                    {search.selected_countries ? (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {search.selected_countries.length}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                )}
                <TableCell>{getStatusBadge(search.status || "pending")}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select
                      value={search.status || "pending"}
                      onValueChange={(value) => updateStatus(search.id, value, search.table_type)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(`/verification?search_id=${search.id}`, "_blank")}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(search)} title="Edit results">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEmailDialog(search)}
                      title="Send results by email"
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
    )
  }

  const addManualEmailEntry = () => {
    const newId = `manual-${Date.now()}`
    const newUser: SearchData = {
      id: newId,
      email: "",
      trademark_name: "",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      search_results: {},
      table_type: "trademark_searches",
      form_type: "free-search",
    }

    setSelectedUsers([...selectedUsers, newUser])
  }

  const removeManualEmailEntry = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId))
  }

  const updateManualEmail = (userId: string, email: string) => {
    setSelectedUsers(selectedUsers.map((user) => (user.id === userId ? { ...user, email } : user)))
  }

  const updateManualTrademark = (userId: string, trademark: string) => {
    setSelectedUsers(selectedUsers.map((user) => (user.id === userId ? { ...user, trademark_name: trademark } : user)))
  }

  const processCsvData = () => {
    if (!csvData.trim()) {
      toast({
        title: "No data",
        description: "Please paste your CSV data",
        variant: "destructive",
      })
      return
    }

    setProcessingCsv(true)
    try {
      const lines = csvData.trim().split("\n")
      const newUsers: SearchData[] = []

      lines.forEach((line, index) => {
        // Handle different separators and clean the line
        const cleanLine = line.trim()
        if (!cleanLine) return // Skip empty lines

        // Try different separators: comma, tab, semicolon
        let columns: string[] = []
        if (cleanLine.includes("\t")) {
          columns = cleanLine.split("\t")
        } else if (cleanLine.includes(";")) {
          columns = cleanLine.split(";")
        } else {
          columns = cleanLine.split(",")
        }

        // Clean each column - remove quotes, extra spaces
        columns = columns.map((col) => col.trim().replace(/^["']|["']$/g, ""))

        if (columns.length >= 2) {
          const email = columns[0].trim()
          const trademark = columns[1].trim()

          // Basic email validation - just check if it contains @ and a dot
          const isValidEmail = email.includes("@") && email.includes(".") && email.length > 5

          if (isValidEmail && trademark && trademark.length > 0) {
            const newId = `csv-${Date.now()}-${index}`
            const newUser: SearchData = {
              id: newId,
              email: email,
              trademark_name: trademark,
              status: "pending",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              search_results: {},
              table_type: "trademark_searches",
              form_type: "free-search",
            }

            newUsers.push(newUser)
          }
        }
      })

      if (newUsers.length > 0) {
        setSelectedUsers([...selectedUsers, ...newUsers])

        toast({
          title: "CSV imported",
          description: `Successfully imported ${newUsers.length} entries`,
        })

        setCsvUploadOpen(false)
        setCsvData("")
      } else {
        toast({
          title: "No valid data found",
          description: "Please check your data format. Each line should have: email,trademark (or separated by tabs)",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("CSV processing error:", error)
      toast({
        title: "Import error",
        description: "Error processing CSV data. Please check the format and try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingCsv(false)
    }
  }

  // Filter searches based on active tab
  const freeSearches = searches.filter((search) => search.form_type === "free-search")
  const verifications = searches.filter((search) => search.form_type === "verification")

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Trademark Search Requests</h2>
          <div className="flex items-center gap-4">
            <Button onClick={openFollowUpDialog} variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Follow-up Emails
            </Button>
            <Button onClick={() => setComposeDialogOpen(true)} variant="default">
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchSearches} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Notice</h3>
              <p className="text-amber-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="free-searches" className="flex items-center gap-2">
              🔍 Free Searches ({freeSearches.length})
            </TabsTrigger>
            <TabsTrigger value="verifications" className="flex items-center gap-2">
              🛡️ Verifications ({verifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free-searches" className="mt-6">
            {renderSearchTable(freeSearches)}
          </TabsContent>

          <TabsContent value="verifications" className="mt-6">
            {renderSearchTable(verifications)}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Compose Email Dialog */}
      <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compose New Email</DialogTitle>
            <DialogDescription>Send a custom email to any recipient.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="compose-recipient" className="text-right">
                To
              </Label>
              <Input
                id="compose-recipient"
                type="email"
                value={composeRecipient}
                onChange={(e) => setComposeRecipient(e.target.value)}
                className="col-span-3"
                placeholder="recipient@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="compose-subject" className="text-right">
                Subject
              </Label>
              <Input
                id="compose-subject"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                className="col-span-3"
                placeholder="Email subject"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="compose-message" className="text-right pt-2">
                Message
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="compose-message"
                  value={composeMessage}
                  onChange={(e) => setComposeMessage(e.target.value)}
                  className="min-h-[200px] resize-y"
                  placeholder="Your email message..."
                  rows={10}
                />
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Note:</p>
                <p>This will send a custom email with your message. The email will be sent from Just Protected.</p>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <Button variant="outline" onClick={() => setComposeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleComposeEmail}
              disabled={!composeRecipient || !composeSubject || !composeMessage || sendingComposeEmail}
            >
              {sendingComposeEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send Email"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send results by email</DialogTitle>
            <DialogDescription>Send the search results to the client by email.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient-email" className="text-right">
                Recipient
              </Label>
              <Input
                id="recipient-email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="col-span-3"
                placeholder="email@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="custom-message" className="text-right">
                Message
              </Label>
              <Textarea
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="col-span-3"
                placeholder="Custom message to include in the email (optional)"
                rows={5}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Note:</p>
                <p>When sending the email, the search status will automatically be updated to "Completed".</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={!recipientEmail || sendingEmail}>
              {sendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send results"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit search results</DialogTitle>
            <DialogDescription>Edit the search results before sending them to the client.</DialogDescription>
          </DialogHeader>

          {selectedSearch && (
            <div className="space-y-4 mt-4 max-h-[50vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trademark-name" className="text-right">
                  Trademark name
                </Label>
                <Input
                  id="trademark-name"
                  defaultValue={
                    selectedSearch.trademark_name || getSafeValue(selectedSearch, "search_results.trademarkName", "")
                  }
                  onChange={(e) => handleEditChange("trademarkName", e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="detailed-summary" className="text-right">
                  Detailed summary
                </Label>
                <Textarea
                  id="detailed-summary"
                  value={editedResults.detailedSummary || ""}
                  onChange={(e) => handleEditChange("detailedSummary", e.target.value)}
                  className="col-span-3"
                  rows={8}
                  placeholder="Detailed executive summary of all findings"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recommendations" className="text-right">
                  Recommendations
                </Label>
                <Textarea
                  id="recommendations"
                  value={editedResults.recommendations || ""}
                  onChange={(e) => handleEditChange("recommendations", e.target.value)}
                  className="col-span-3"
                  rows={6}
                  placeholder="Recommendations for the client"
                />
              </div>
            </div>
          )}

          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveResults} disabled={savingResults}>
              {savingResults ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSV Upload Dialog */}
      <Dialog open={csvUploadOpen} onOpenChange={setCsvUploadOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import Email List</DialogTitle>
            <DialogDescription>Paste your CSV data with columns: Email, Trademark</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="csv-data">CSV Data</Label>
              <Textarea
                id="csv-data"
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder={`john@example.com,Nike Swoosh
sarah@example.com,Apple Logo
mike@example.com,Google Brand

Or tab-separated:
john@example.com	Nike Swoosh
sarah@example.com	Apple Logo`}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
              <p className="font-medium mb-1">Supported formats:</p>
              <p>• Comma separated: email,trademark</p>
              <p>• Tab separated (copy from Excel): email[TAB]trademark</p>
              <p>• Semicolon separated: email;trademark</p>
              <p>Empty lines will be ignored automatically.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCsvUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processCsvData} disabled={!csvData.trim() || processingCsv}>
              {processingCsv ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Import Data"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Follow-up Email Dialog */}
      <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Follow-up Emails</DialogTitle>
            <DialogDescription>
              Send follow-up emails to users who haven't completed their trademark registration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-blue-900">Email Recipients ({selectedUsers.length})</h4>
                <div className="flex gap-2">
                  <Button onClick={() => setCsvUploadOpen(true)} size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    Import CSV
                  </Button>
                  <Button onClick={addManualEmailEntry} size="sm" variant="outline">
                    + Add Email
                  </Button>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {selectedUsers.length === 0 ? (
                  <p className="text-blue-700 text-sm text-center py-4">
                    Click "Add Email" or "Import CSV" to start adding recipients
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Email Address</TableHead>
                        <TableHead className="text-xs">Trademark</TableHead>
                        <TableHead className="text-xs w-16">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="text-xs">
                            <Input
                              type="email"
                              value={user.email || ""}
                              onChange={(e) => updateManualEmail(user.id, e.target.value)}
                              className="h-8 text-xs"
                              placeholder="email@example.com"
                            />
                          </TableCell>
                          <TableCell className="text-xs">
                            <Input
                              value={user.trademark_name || ""}
                              onChange={(e) => updateManualTrademark(user.id, e.target.value)}
                              className="h-8 text-xs"
                              placeholder="Trademark name"
                            />
                          </TableCell>
                          <TableCell className="text-xs">
                            <Button
                              onClick={() => removeManualEmailEntry(user.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              ×
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followup-subject" className="text-right">
                Subject
              </Label>
              <Input
                id="followup-subject"
                value={followUpSubject}
                onChange={(e) => setFollowUpSubject(e.target.value)}
                className="col-span-3"
                placeholder="Email subject"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="followup-message" className="text-right pt-2">
                Message
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="followup-message"
                  value={followUpMessage}
                  onChange={(e) => setFollowUpMessage(e.target.value)}
                  className="min-h-[300px] resize-y"
                  placeholder="Your follow-up message..."
                  rows={15}
                />
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-md text-sm text-amber-800 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Email will be signed as Sarah Mitchell, Trademark Specialist</p>
                <p>Recipients will be instructed to email trademarks@justprotected.com to proceed.</p>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <Button variant="outline" onClick={() => setFollowUpDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendFollowUp}
              disabled={
                selectedUsers.filter((u) => u.email && u.email.trim() !== "").length === 0 ||
                !followUpSubject ||
                !followUpMessage ||
                sendingFollowUp
              }
            >
              {sendingFollowUp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending to{" "}
                  {selectedUsers.filter((u) => u.email && u.email.trim() !== "").length} users...
                </>
              ) : (
                `Send to ${selectedUsers.filter((u) => u.email && u.email.trim() !== "").length} users`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
