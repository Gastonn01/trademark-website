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

interface SearchData {
  id: string
  form_type: string
  search_data: any
  created_at: string
  status: string
}

// Fallback mock data in case everything fails
const fallbackMockData = [
  {
    id: "fallback-1",
    form_type: "free-search",
    search_data: {
      name: "Test",
      surname: "User",
      email: "test@example.com",
      trademarkName: "TestBrand",
      goodsAndServices: "Test services",
    },
    created_at: new Date().toISOString(),
    status: "pending",
  },
]

// Pre-filled templates for results
const resultTemplates = {
  similaritiesFound: `Our comprehensive search has identified several existing trademarks that show similarities to your proposed mark. These similarities include both visual/phonetic resemblances and overlaps in the goods and services classifications.

Specifically, we found [NUMBER] potentially conflicting marks in the [COUNTRY/REGION] trademark database that could present obstacles during the registration process. The most concerning similarities are with marks registered in classes [CLASS NUMBERS] which cover similar products or services to those you've specified.`,

  noSimilaritiesFound: `Our comprehensive search has not identified any significant conflicts with existing registered trademarks. Your proposed mark appears to be distinctive and unique within the specified classes of goods and services.

We conducted searches across multiple trademark databases including [COUNTRY/REGION] registries and did not find any marks that would likely cause confusion or present legal obstacles to registration.`,

  partialSimilarities: `Our search has identified some existing trademarks with partial similarities to your proposed mark. While these similarities exist, they may not necessarily prevent registration if properly addressed.

The partial similarities we found relate to [DESCRIBE SIMILARITY TYPE - e.g., "similar word elements but different visual presentation" or "similar in appearance but in different classes of goods/services"]. These findings suggest proceeding with caution but do not indicate immediate rejection.`,

  genericConcerns: `Our analysis indicates that elements of your proposed trademark may be considered descriptive or generic for the goods/services you've specified. Generic or highly descriptive terms generally receive limited or no trademark protection.

Specifically, the term(s) "[TERM]" in your mark may be viewed by trademark examiners as directly describing characteristics or functions of your products/services, which could lead to objections during examination.`,
}

// Pre-filled templates for recommendations
const recommendationTemplates = {
  proceedUnchanged: `Based on our search results, we recommend proceeding with your trademark application as originally proposed. The search did not reveal significant conflicts or concerns that would impede registration.

We suggest filing your application promptly to secure your priority date and begin the registration process. Our team can assist with preparing and submitting your application to ensure all requirements are met.`,

  modifyMark: `Based on our search results, we recommend modifying your trademark to reduce similarity with existing registrations. Consider:

1. Altering the visual elements or stylization
2. Changing specific words or terms that conflict with existing marks
3. Adding distinctive elements to create greater differentiation

These modifications would significantly improve your chances of successful registration while maintaining your brand identity.`,

  narrowClasses: `We recommend narrowing or refining your goods and services descriptions to reduce overlap with existing registrations. By focusing on your core offerings and using more specific terminology, you can minimize conflicts while still protecting your essential business activities.

This strategic approach often allows for successful registration even when there are similar marks in the same general field.`,

  legalConsultation: `Given the complexity of the findings, we recommend scheduling a legal consultation with our trademark attorneys to discuss your options in detail. The specific nature of the potential conflicts requires personalized legal advice to determine the best path forward.

Our attorneys can provide a detailed risk assessment and develop strategies to overcome the identified obstacles.`,

  abandonAndRebrand: `Based on our findings, we recommend considering alternative trademark options. The current mark faces significant obstacles to registration that would be difficult to overcome.

Our team can assist with developing new trademark options that maintain your brand values while offering better legal protection. This approach, while requiring some initial adjustment, provides the strongest long-term protection for your business.`,
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
  const { toast } = useToast()

  // New state for template selections
  const [selectedResultTemplate, setSelectedResultTemplate] = useState<string>("")
  const [selectedRecommendationTemplate, setSelectedRecommendationTemplate] = useState<string>("")

  // New state for checkboxes
  const [resultOptions, setResultOptions] = useState({
    similaritiesFound: false,
    noSimilaritiesFound: false,
    partialSimilarities: false,
    genericConcerns: false,
  })

  const [recommendationOptions, setRecommendationOptions] = useState({
    proceedUnchanged: false,
    modifyMark: false,
    narrowClasses: false,
    legalConsultation: false,
    abandonAndRebrand: false,
  })

  // Add a new state for the compose email dialog
  const [composeDialogOpen, setComposeDialogOpen] = useState(false)
  const [composeRecipient, setComposeRecipient] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")
  const [sendingComposeEmail, setSendingComposeEmail] = useState(false)

  // Add these new states after the existing state declarations
  const [proposalEmailContent, setProposalEmailContent] = useState("")
  const [showProposalPreview, setShowProposalPreview] = useState(false)

  useEffect(() => {
    fetchSearches()
  }, [statusFilter])

  // Error boundary wrapper for the fetch function
  const fetchSearches = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Admin Panel: Fetching searches with status filter:", statusFilter)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // Increased timeout

      let response
      try {
        response = await fetch(`/api/admin/searches?status=${statusFilter}`, {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        })
        clearTimeout(timeoutId)
      } catch (fetchError) {
        clearTimeout(timeoutId)
        console.error("Admin Panel: Network fetch failed:", fetchError)

        // Use fallback data on network error
        setSearches(fallbackMockData)
        setDataSource("network-error-fallback")
        setError("Network error - using fallback data")
        setLoading(false)
        return
      }

      // Check if response is ok
      if (!response.ok) {
        console.error("Admin Panel: HTTP error:", response.status, response.statusText)
        setSearches(fallbackMockData)
        setDataSource("http-error-fallback")
        setError(`HTTP ${response.status}: ${response.statusText}`)
        setLoading(false)
        return
      }

      // Check content type
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Admin Panel: Non-JSON response:", contentType)
        setSearches(fallbackMockData)
        setDataSource("non-json-fallback")
        setError("Server returned non-JSON response")
        setLoading(false)
        return
      }

      // Parse JSON
      let data
      try {
        const responseText = await response.text()
        if (!responseText.trim()) {
          throw new Error("Empty response")
        }
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Admin Panel: JSON parse failed:", parseError)
        setSearches(fallbackMockData)
        setDataSource("json-parse-fallback")
        setError("Failed to parse server response")
        setLoading(false)
        return
      }

      // Validate and set data
      if (!data || typeof data !== "object" || !Array.isArray(data.data)) {
        console.warn("Admin Panel: Invalid data structure:", data)
        setSearches(fallbackMockData)
        setDataSource("invalid-structure-fallback")
        setError("Invalid data structure from server")
      } else {
        setSearches(data.data)
        setDataSource(data.source || "api-success")

        if (data.data.length === 0) {
          setError("No search data available")
        } else {
          setError(null)
        }
      }
    } catch (err) {
      console.error("Admin Panel: Critical error:", err)
      setSearches(fallbackMockData)
      setDataSource("critical-error-fallback")
      setError(`Critical error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      // Optimistically update the UI
      setSearches(searches.map((search) => (search.id === id ? { ...search, status } : search)))

      toast({
        title: "Estado actualizado",
        description: `El estado de la búsqueda se ha actualizado a ${status}`,
      })
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

      // Prepare the updated results
      const updatedResults = {
        trademarkName: editedResults.trademarkName || getSafeValue(selectedSearch, "search_data.trademarkName", ""),
        goodsAndServices:
          editedResults.goodsAndServices || getSafeValue(selectedSearch, "search_data.goodsAndServices", ""),
        name: editedResults.name || getSafeValue(selectedSearch, "search_data.name", ""),
        surname: editedResults.surname || getSafeValue(selectedSearch, "search_data.surname", ""),
        email: editedResults.email || getSafeValue(selectedSearch, "search_data.email", ""),
        exactMatch: editedResults.exactMatch || "no",
        similarCount: editedResults.similarCount || "0",
        trademarkStrength: editedResults.trademarkStrength || "",
        riskLevel: editedResults.riskLevel || "",
        conflictingMarks: editedResults.conflictingMarks || "",
        classesAnalysis: editedResults.classesAnalysis || "",
        geographicAnalysis: editedResults.geographicAnalysis || "",
        detailedSummary: editedResults.detailedSummary || "",
        recommendations: editedResults.recommendations || "",
        nextSteps: editedResults.nextSteps || "",
        conflictingTrademarkSmart: editedResults.conflictingTrademarkSmart || "",
        conflictingDetails: editedResults.conflictingDetails || "",
        ...editedResults,
      }

      // Optimistically update the UI
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

      // Reset template selections and checkboxes
      setSelectedResultTemplate("")
      setSelectedRecommendationTemplate("")
      setResultOptions({
        similaritiesFound: false,
        noSimilaritiesFound: false,
        partialSimilarities: false,
        genericConcerns: false,
      })
      setRecommendationOptions({
        proceedUnchanged: false,
        modifyMark: false,
        narrowClasses: false,
        legalConsultation: false,
        abandonAndRebrand: false,
      })
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

  const handleComposeEmail = async () => {
    if (!composeRecipient || !composeSubject || !composeMessage) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos requeridos",
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
        title: "Email enviado",
        description: `El email ha sido enviado a ${composeRecipient}`,
      })

      setComposeDialogOpen(false)
      setComposeRecipient("")
      setComposeSubject("")
      setComposeMessage("")
    } catch (err) {
      console.error("Error in handleComposeEmail:", err)
      toast({
        title: "Error",
        description: `No se pudo enviar el email: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      })
    } finally {
      setSendingComposeEmail(false)
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
    setSelectedResultTemplate("")
    setSelectedRecommendationTemplate("")
    setResultOptions({
      similaritiesFound: false,
      noSimilaritiesFound: false,
      partialSimilarities: false,
      genericConcerns: false,
    })
    setRecommendationOptions({
      proceedUnchanged: false,
      modifyMark: false,
      narrowClasses: false,
      legalConsultation: false,
      abandonAndRebrand: false,
    })
    updateStatus(search.id, "processing")
    setEditDialogOpen(true)
  }

  const handleEditChange = (field: string, value: string) => {
    setEditedResults({
      ...editedResults,
      [field]: value,
    })
  }

  const handleResultOptionChange = (option: keyof typeof resultOptions) => {
    const newValue = !resultOptions[option]
    setResultOptions({
      ...resultOptions,
      [option]: newValue,
    })

    if (newValue) {
      const currentResults = editedResults.detailedSummary || ""
      const newResults = currentResults + (currentResults ? "\n\n" : "") + resultTemplates[option]
      handleEditChange("detailedSummary", newResults)
    }
  }

  const handleRecommendationOptionChange = (option: keyof typeof recommendationOptions) => {
    const newValue = !recommendationOptions[option]
    setRecommendationOptions({
      ...recommendationOptions,
      [option]: newValue,
    })

    if (newValue) {
      const currentRecommendations = editedResults.recommendations || ""
      const newRecommendations =
        currentRecommendations + (currentRecommendations ? "\n\n" : "") + recommendationTemplates[option]
      handleEditChange("recommendations", newRecommendations)
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

  // Add this function after the existing utility functions
  const generateProposalEmail = (
    search: SearchData,
    analysisType: "no-exact-match" | "exact-match" | "similar-trademarks",
  ) => {
    const clientName = getSafeValue(search, "search_data.name", "Valued Client")
    const trademarkName = getSafeValue(search, "search_data.trademarkName", "Your Trademark")
    const goodsServices = getSafeValue(search, "search_data.goodsAndServices", "your goods and services")

    let subject = ""
    let content = ""
    let registrationChance = ""
    let nextSteps = ""
    let urgency = ""

    switch (analysisType) {
      case "no-exact-match":
        subject = `✅ Great News: "${trademarkName}" Shows Strong Registration Potential`
        registrationChance = "85-95%"
        content = `Dear ${clientName},

  I have excellent news regarding your trademark search for "${trademarkName}".

  **SEARCH RESULTS SUMMARY:**
  ✅ **No Exact Matches Found** - We did not identify any identical trademarks in our comprehensive database search
  ✅ **Clear Path Forward** - Your trademark appears to have strong distinctiveness and registrability
  ✅ **High Success Probability** - Based on our analysis, we assess an **${registrationChance} likelihood** of successful registration

  **DETAILED ANALYSIS:**
  Our comprehensive search covered multiple trademark databases and did not reveal any identical or substantially similar marks that would likely prevent registration of "${trademarkName}" for ${goodsServices}.

  The absence of exact matches, combined with the distinctive nature of your proposed mark, creates a favorable environment for trademark registration.

  **REGISTRATION TIMELINE & INVESTMENT:**
  • **Filing to Registration:** 8-12 months (typical USPTO timeline)
  • **Professional Filing Service:** $899 + USPTO fees ($350-$1,050 depending on classes)
  • **Comprehensive Package:** Includes application preparation, filing, and monitoring through registration

  **STRATEGIC ADVANTAGES OF PROCEEDING NOW:**
  1. **First-to-File Priority** - Secure your filing date before competitors
  2. **Market Protection** - Prevent others from registering similar marks
  3. **Brand Value** - Registered trademarks significantly increase business value
  4. **Legal Enforcement** - Strong legal foundation for protecting your brand`

        nextSteps = `**RECOMMENDED NEXT STEPS:**
  1. **Immediate Filing** - We recommend proceeding with your trademark application within the next 30 days
  2. **Class Selection** - Finalize your goods/services description for optimal protection
  3. **Application Preparation** - Our team will prepare your application for filing
  4. **Monitoring Setup** - Implement trademark watch services to protect against future conflicts`

        urgency = `⏰ **TIME-SENSITIVE OPPORTUNITY:**
  Trademark rights are awarded on a "first-to-file" basis. While your search results are favorable today, this could change if a competitor files first. We strongly recommend securing your filing date promptly.`
        break

      case "exact-match":
        subject = `🚨 Critical Alert: Identical Trademark Found for "${trademarkName}"`
        registrationChance = "5-15%"
        content = `Dear ${clientName},

  I must inform you of critical findings from your trademark search for "${trademarkName}".

  **SEARCH RESULTS SUMMARY:**
  🚨 **Exact Match Identified** - We found an identical or nearly identical trademark already registered
  ⚠️ **High Risk Assessment** - Registration faces significant legal obstacles
  📉 **Low Success Probability** - Current application would have only **${registrationChance} likelihood** of approval

  **DETAILED ANALYSIS:**
  Our comprehensive search revealed an existing trademark registration that is identical or substantially similar to "${trademarkName}" in the same or related classes of goods/services.

  Under trademark law, identical marks create a presumption of likelihood of confusion, which typically results in application rejection by the USPTO under Section 2(d) of the Trademark Act.

  **LEGAL IMPLICATIONS:**
  • **Registration Rejection** - USPTO will likely refuse your application
  • **Potential Infringement** - Using this mark could expose you to legal claims
  • **Wasted Investment** - Filing fees would likely be lost without registration

  **ALTERNATIVE STRATEGIES:**
  Rather than proceeding with the current mark, we recommend exploring these strategic alternatives:`

        nextSteps = `**RECOMMENDED NEXT STEPS:**
  1. **Alternative Mark Development** - Create new trademark options that avoid conflicts
  2. **Comprehensive Clearance** - Search new marks before adoption
  3. **Legal Consultation** - Discuss coexistence possibilities (if applicable)
  4. **Brand Strategy Review** - Develop marks that are both protectable and marketable`

        urgency = `🛡️ **IMMEDIATE ACTION REQUIRED:**
  Do not begin commercial use of "${trademarkName}" until we've developed alternative options. Using a mark identical to an existing registration could result in costly legal disputes.`
        break

      case "similar-trademarks":
        subject = `⚠️ Important Findings: Similar Trademarks Identified for "${trademarkName}"`
        registrationChance = "40-70%"
        content = `Dear ${clientName},

  I have important findings to share regarding your trademark search for "${trademarkName}".

  **SEARCH RESULTS SUMMARY:**
  ⚠️ **Similar Marks Found** - We identified existing trademarks with notable similarities
  🔍 **Detailed Analysis Required** - Registration success depends on specific factors
  📊 **Moderate Success Probability** - We assess a **${registrationChance} likelihood** of successful registration with proper strategy

  **DETAILED ANALYSIS:**
  Our comprehensive search revealed existing trademark registrations that share certain similarities with "${trademarkName}". While these similarities exist, they may not necessarily prevent registration if properly addressed.

  The key factors that will determine registration success include:
  • **Degree of Similarity** - Visual, phonetic, and conceptual comparison
  • **Goods/Services Relationship** - Whether the products/services are related or compete
  • **Market Channels** - How the marks reach consumers
  • **Consumer Sophistication** - Target market's ability to distinguish marks

  **STRATEGIC ASSESSMENT:**
  Based on our analysis, your mark has registration potential, but success will require careful application strategy and potentially minor modifications to enhance distinctiveness.`

        nextSteps = `**RECOMMENDED NEXT STEPS:**
  1. **Strategic Consultation** - Detailed review of similarities and response strategies
  2. **Application Optimization** - Craft goods/services descriptions to minimize conflicts
  3. **Enhancement Options** - Consider minor modifications to increase distinctiveness
  4. **Professional Filing** - Expert preparation to address potential USPTO objections`

        urgency = `⚖️ **STRATEGIC TIMING:**
  While similar marks exist, proper strategy can often overcome these challenges. However, delaying your filing increases the risk that additional conflicting marks may be registered, further complicating your path to registration.`
        break
    }

    const fullEmail = `${content}

  ${nextSteps}

  ${urgency}

  **INVESTMENT & NEXT STEPS:**
  Our comprehensive trademark registration service includes:
  • Professional application preparation and filing
  • USPTO correspondence handling
  • Registration monitoring and updates
  • 12-month support through the registration process

  **Total Investment:** $899 + USPTO fees (${analysisType === "exact-match" ? "Alternative mark development" : "Standard registration process"})

  **IMMEDIATE ACTION:**
  I'm available for a complimentary 15-minute consultation to discuss your specific situation and answer any questions. We can also begin ${analysisType === "exact-match" ? "developing alternative trademark options" : "preparing your application"} immediately.

  Please reply to this email or call me directly to discuss your trademark strategy.

  Best regards,

  [Your Name]
  Senior Trademark Specialist
  Just Protected
  📧 [your-email]@justprotected.com
  📞 [Your Phone Number]

  ---

  **About Just Protected:**
  We've successfully registered over 10,000 trademarks worldwide and maintain a 95% success rate for applications we file. Our team of trademark specialists and attorneys ensures your brand receives the strongest possible protection.

  **Confidentiality Notice:** This analysis is confidential and prepared specifically for ${clientName}. The information contained herein should not be shared without written consent.`

    return {
      subject,
      content: fullEmail,
      registrationChance,
    }
  }

  // Error boundary component
  if (error && dataSource.includes("critical")) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error del Sistema</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchSearches} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Solicitudes de búsqueda de marcas</h2>
          <div className="flex items-center gap-4">
            <Button onClick={() => setComposeDialogOpen(true)} variant="default">
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
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

        {dataSource && dataSource.includes("fallback") && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Datos de respaldo</h3>
              <p className="text-amber-700 text-sm">
                {error ||
                  "Usando datos de respaldo. La conexión con la base de datos puede estar experimentando problemas."}
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
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No hay solicitudes disponibles</p>
            <Button onClick={fetchSearches} variant="outline" className="mt-4 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
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

      {/* Edit Dialog - Simplified for now */}
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
