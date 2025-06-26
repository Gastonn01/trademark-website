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

// Fallback mock data in case everything fails
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

  // COMPLETELY REWRITTEN fetchSearches function to avoid JSON parsing issues
  const fetchSearches = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Fetching searches with status filter:", statusFilter)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

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
        console.error("Fetch failed:", fetchError)
        throw new Error("Network request failed")
      }

      // Check content type before parsing
      const contentType = response.headers.get("content-type")
      console.log("Response content-type:", contentType)
      console.log("Response status:", response.status)

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json()
            console.error("API error (JSON):", errorData)
            throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`)
          } catch (jsonError) {
            console.error("Failed to parse error JSON:", jsonError)
            const text = await response.text()
            console.error("API error (text):", text)
            throw new Error(`HTTP ${response.status}: ${text || response.statusText}`)
          }
        } else {
          const text = await response.text()
          console.error("API error (non-JSON):", text)
          throw new Error(`HTTP ${response.status}: ${text || response.statusText}`)
        }
      }

      // Check if response is JSON
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Response is not JSON, content-type:", contentType)
        console.error("Response text:", text)
        throw new Error("Server returned non-JSON response")
      }

      let data
      try {
        const responseText = await response.text()
        console.log("Raw response (first 200 chars):", responseText.substring(0, 200))

        if (!responseText.trim()) {
          throw new Error("Empty response from server")
        }

        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("JSON parse failed:", parseError)
        throw new Error("Failed to parse server response")
      }

      console.log("Parsed data:", data)

      // Validate response structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response structure")
      }

      if (!Array.isArray(data.data)) {
        console.warn("data.data is not an array:", data.data)
        setSearches(fallbackMockData)
        setDataSource("fallback-invalid-structure")
        setError("Invalid data structure from server")
      } else {
        setSearches(data.data)
        setDataSource(data.source || "api")

        if (data.source && data.source.includes("mock")) {
          setError(`Using mock data (${data.source})`)
        } else if (data.data.length === 0) {
          setError("No data available")
        } else {
          setError(null)
        }
      }
    } catch (err) {
      console.error("Error in fetchSearches:", err)
      setSearches(fallbackMockData)
      setDataSource("error-fallback")
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
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

      // Prepare the updated results - include ALL edited fields
      const updatedResults = {
        // Basic search info
        trademarkName: editedResults.trademarkName || getSafeValue(selectedSearch, "search_data.trademarkName", ""),
        goodsAndServices:
          editedResults.goodsAndServices || getSafeValue(selectedSearch, "search_data.goodsAndServices", ""),
        name: editedResults.name || getSafeValue(selectedSearch, "search_data.name", ""),
        surname: editedResults.surname || getSafeValue(selectedSearch, "search_data.surname", ""),
        email: editedResults.email || getSafeValue(selectedSearch, "search_data.email", ""),

        // Analysis results
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

        // Smart analysis fields
        conflictingTrademarkSmart: editedResults.conflictingTrademarkSmart || "",
        conflictingDetails: editedResults.conflictingDetails || "",

        // Include any other edited results
        ...editedResults,
      }

      console.log("Admin Panel - Saving updated results:", updatedResults) // Enhanced debug log
      console.log("Admin Panel - Original search data:", selectedSearch.search_data) // Debug log

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

      console.log("Compose email response status:", response.status)

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
      })
    } finally {
      setSendingComposeEmail(false)
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

    // Update status to processing when opening to edit
    updateStatus(search.id, "processing")

    setEditDialogOpen(true)
  }

  const handleEditChange = (field: string, value: string) => {
    setEditedResults({
      ...editedResults,
      [field]: value,
    })
  }

  // Handle checkbox changes for result options
  const handleResultOptionChange = (option: keyof typeof resultOptions) => {
    // Toggle the checkbox
    const newValue = !resultOptions[option]
    setResultOptions({
      ...resultOptions,
      [option]: newValue,
    })

    // If checked, append the template text to the results field
    if (newValue) {
      const currentResults = editedResults.detailedSummary || ""
      const newResults = currentResults + (currentResults ? "\n\n" : "") + resultTemplates[option]
      handleEditChange("detailedSummary", newResults)
    }
  }

  // Handle checkbox changes for recommendation options
  const handleRecommendationOptionChange = (option: keyof typeof recommendationOptions) => {
    // Toggle the checkbox
    const newValue = !recommendationOptions[option]
    setRecommendationOptions({
      ...recommendationOptions,
      [option]: newValue,
    })

    // If checked, append the template text to the recommendations field
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

  const generateSmartLegalAnalysis = () => {
    const clientTM = getSafeValue(selectedSearch, "search_data.trademarkName", "")
    const clientGoods = getSafeValue(selectedSearch, "search_data.goodsAndServices", "")
    const conflictingTM = editedResults.conflictingTrademarkSmart || ""
    const conflictingDetails = editedResults.conflictingDetails || ""

    if (!clientTM || !conflictingTM) {
      toast({
        title: "Missing Information",
        description: "Please enter the conflicting trademark name",
      })
      return
    }

    // Analyze similarity using trademark law principles
    const similarity = analyzeTrademarkSimilarity(clientTM, conflictingTM)
    const goodsRelation = analyzeGoodsRelation(clientGoods, conflictingTM)

    // Generate comprehensive legal analysis
    const analysis = generateLegalAnalysis(
      clientTM,
      conflictingTM,
      clientGoods,
      similarity,
      goodsRelation,
      conflictingDetails,
    )

    // Update the state with all the generated analysis
    const newResults = {
      ...editedResults,
      detailedSummary: analysis.summary,
      recommendations: analysis.recommendations,
      riskLevel: analysis.riskLevel,
      trademarkStrength: analysis.strength,
      exactMatch: analysis.exactMatch,
      similarCount: "1",
      classesAnalysis: analysis.classAnalysis,
      conflictingMarks: `${conflictingTM}${conflictingDetails ? ` (${conflictingDetails})` : ""}`,
      conflictingTrademarkSmart: conflictingTM,
      conflictingDetails: conflictingDetails,
    }

    setEditedResults(newResults)

    // Force re-render of the textareas by updating their values
    setTimeout(() => {
      const detailedSummaryEl = document.getElementById("detailed-summary") as HTMLTextAreaElement
      const recommendationsEl = document.getElementById("recommendations") as HTMLTextAreaElement
      const classesAnalysisEl = document.getElementById("classes-analysis") as HTMLTextAreaElement
      const conflictingMarksEl = document.getElementById("conflicting-marks") as HTMLTextAreaElement

      if (detailedSummaryEl) detailedSummaryEl.value = analysis.summary
      if (recommendationsEl) recommendationsEl.value = analysis.recommendations
      if (classesAnalysisEl) classesAnalysisEl.value = analysis.classAnalysis
      if (conflictingMarksEl)
        conflictingMarksEl.value = `${conflictingTM}${conflictingDetails ? ` (${conflictingDetails})` : ""}`
    }, 100)

    toast({
      title: "Legal Analysis Generated!",
      description: `Professional analysis completed for ${clientTM} vs ${conflictingTM}`,
    })
  }

  // Enhanced trademark similarity analysis based on real legal principles
  const analyzeTrademarkSimilarity = (clientMark: string, conflictingMark: string) => {
    const client = clientMark.toLowerCase().trim()
    const conflicting = conflictingMark.toLowerCase().trim()

    // Handle edge cases first
    if (!client || !conflicting || client.length === 0 || conflicting.length === 0) {
      return { type: "invalid", score: 0, description: "Invalid trademark comparison" }
    }

    // Single character or very short marks
    if (client.length <= 2 || conflicting.length <= 2) {
      if (client === conflicting) {
        return { type: "identical", score: 100, description: "Identical short marks" }
      }
      return { type: "different", score: 0, description: "Insufficient trademark substance for meaningful comparison" }
    }

    // Exact match
    if (client === conflicting) {
      return { type: "identical", score: 100, description: "Identical trademarks" }
    }

    // Remove common business suffixes for comparison
    const cleanClient = client.replace(/\b(inc|llc|ltd|corp|company|co|corporation|limited)\b/g, "").trim()
    const cleanConflicting = conflicting.replace(/\b(inc|llc|ltd|corp|company|co|corporation|limited)\b/g, "").trim()

    // Check if one is too short after cleaning
    if (cleanClient.length <= 2 || cleanConflicting.length <= 2) {
      return { type: "different", score: 0, description: "Insufficient distinctive elements for comparison" }
    }

    if (cleanClient === cleanConflicting) {
      return { type: "identical-core", score: 95, description: "Identical core marks (ignoring business suffixes)" }
    }

    // Calculate multiple similarity metrics
    const phoneticSimilar = checkPhoneticSimilarity(cleanClient, cleanConflicting)
    const visualSimilar = checkVisualSimilarity(cleanClient, cleanConflicting)
    const structuralSimilar = checkStructuralSimilarity(cleanClient, cleanConflicting)

    // Weight the different types of similarity
    const weightedScore = Math.round(
      phoneticSimilar.score * 0.45 + // Phonetic is very important
        visualSimilar.score * 0.45 + // Visual is very important
        structuralSimilar.score * 0.1, // Structure is less important
    )

    // Determine the primary type of similarity
    let primaryType = "different"
    let description = "Sufficiently different marks"

    if (weightedScore >= 85) {
      primaryType = "very-high"
      description = "Very high similarity - likely to cause confusion"
    } else if (weightedScore >= 70) {
      primaryType = "high"
      description = "High similarity - significant risk of confusion"
    } else if (weightedScore >= 50) {
      primaryType = "moderate"
      description = "Moderate similarity - some risk of confusion"
    } else if (weightedScore >= 25) {
      primaryType = "low"
      description = "Low similarity - minimal risk of confusion"
    } else {
      primaryType = "different"
      description = "Sufficiently different marks"
    }

    // Add specific similarity details
    const details = []
    if (phoneticSimilar.score > 60) details.push(`phonetic similarity (${phoneticSimilar.score}%)`)
    if (visualSimilar.score > 60) details.push(`visual similarity (${visualSimilar.score}%)`)
    if (structuralSimilar.score > 60) details.push(`structural similarity (${structuralSimilar.score}%)`)

    if (details.length > 0) {
      description += ` - primarily due to ${details.join(", ")}`
    }

    return {
      type: primaryType,
      score: weightedScore,
      description,
      breakdown: {
        phonetic: phoneticSimilar.score,
        visual: visualSimilar.score,
        structural: structuralSimilar.score,
      },
    }
  }

  const checkPhoneticSimilarity = (mark1: string, mark2: string) => {
    // Enhanced phonetic similarity check

    // Very different lengths suggest different phonetic patterns
    const lengthRatio = Math.min(mark1.length, mark2.length) / Math.max(mark1.length, mark2.length)
    if (lengthRatio < 0.5) {
      return { score: Math.max(0, 20 * lengthRatio), reason: "Very different lengths" }
    }

    // Generate phonetic codes
    const soundex1 = generateSoundex(mark1)
    const soundex2 = generateSoundex(mark2)

    if (soundex1 === soundex2) {
      return { score: 85, reason: "Same phonetic pattern" }
    }

    // Check for common phonetic substitutions
    const phoneticVariations = [
      [/ph/g, "f"],
      [/ck/g, "k"],
      [/c(?=[eiy])/g, "s"],
      [/c/g, "k"],
      [/z/g, "s"],
      [/x/g, "ks"],
      [/qu/g, "kw"],
      [/gh/g, "f"],
    ]

    let normalized1 = mark1
    let normalized2 = mark2

    phoneticVariations.forEach(([pattern, replacement]) => {
      normalized1 = normalized1.replace(pattern, replacement as string)
      normalized2 = normalized2.replace(pattern, replacement as string)
    })

    if (normalized1 === normalized2) {
      return { score: 80, reason: "Similar after phonetic normalization" }
    }

    // Check syllable similarity
    const syllables1 = mark1.match(/[aeiou]+/g) || []
    const syllables2 = mark2.match(/[aeiou]+/g) || []

    if (syllables1.length === syllables2.length && syllables1.length > 0) {
      const syllableMatch = syllables1.filter((s) => syllables2.includes(s)).length / syllables1.length
      if (syllableMatch > 0.6) {
        return { score: 60 + syllableMatch * 20, reason: "Similar syllable structure" }
      }
    }

    // Final phonetic distance check
    const phoneticDistance = levenshteinDistance(normalized1, normalized2)
    const maxLength = Math.max(normalized1.length, normalized2.length)
    const phoneticSimilarity = Math.max(0, ((maxLength - phoneticDistance) / maxLength) * 60)

    return { score: Math.round(phoneticSimilarity), reason: "Phonetic distance calculation" }
  }

  const checkVisualSimilarity = (mark1: string, mark2: string) => {
    // Enhanced visual similarity check

    // Very different lengths are visually different
    const lengthRatio = Math.min(mark1.length, mark2.length) / Math.max(mark1.length, mark2.length)
    if (lengthRatio < 0.4) {
      return { score: Math.max(0, 15 * lengthRatio), reason: "Very different visual lengths" }
    }

    // Check for identical substrings
    const longestCommonSubstring = findLongestCommonSubstring(mark1, mark2)
    if (longestCommonSubstring.length >= 3) {
      const substringScore = (longestCommonSubstring.length / Math.max(mark1.length, mark2.length)) * 70
      if (substringScore > 50) {
        return { score: Math.round(substringScore), reason: `Common substring: "${longestCommonSubstring}"` }
      }
    }

    // Levenshtein distance for visual similarity
    const distance = levenshteinDistance(mark1, mark2)
    const maxLength = Math.max(mark1.length, mark2.length)
    const similarity = ((maxLength - distance) / maxLength) * 100

    // Adjust for visual patterns
    let adjustedSimilarity = similarity

    // Check for similar starting/ending patterns
    if (mark1.substring(0, 2) === mark2.substring(0, 2)) adjustedSimilarity += 10
    if (mark1.slice(-2) === mark2.slice(-2)) adjustedSimilarity += 10

    // Check for similar character patterns
    const pattern1 = mark1.replace(/[aeiou]/g, "V").replace(/[bcdfghjklmnpqrstvwxyz]/g, "C")
    const pattern2 = mark2.replace(/[aeiou]/g, "V").replace(/[bcdfghjklmnpqrstvwxyz]/g, "C")
    if (pattern1 === pattern2) adjustedSimilarity += 15

    return { score: Math.min(100, Math.round(adjustedSimilarity)), reason: "Visual pattern analysis" }
  }

  const checkStructuralSimilarity = (mark1: string, mark2: string) => {
    // Check structural patterns like capitalization, spacing, special characters
    let score = 0

    // Similar length structure
    const lengthRatio = Math.min(mark1.length, mark2.length) / Math.max(mark1.length, mark2.length)
    score += lengthRatio * 30

    // Similar word count
    const words1 = mark1.split(/\W+/).filter((w) => w.length > 0)
    const words2 = mark2.split(/\W+/).filter((w) => w.length > 0)

    if (words1.length === words2.length) {
      score += 20
    }

    // Similar character types (letters vs numbers vs symbols)
    const hasNumbers1 = /\d/.test(mark1)
    const hasNumbers2 = /\d/.test(mark2)
    const hasSymbols1 = /[^a-zA-Z0-9\s]/.test(mark1)
    const hasSymbols2 = /[^a-zA-Z0-9\s]/.test(mark2)

    if (hasNumbers1 === hasNumbers2) score += 10
    if (hasSymbols1 === hasSymbols2) score += 10

    return { score: Math.round(score), reason: "Structural pattern analysis" }
  }

  // Helper function to find longest common substring
  const findLongestCommonSubstring = (str1: string, str2: string): string => {
    let longest = ""

    for (let i = 0; i < str1.length; i++) {
      for (let j = 0; j < str2.length; j++) {
        let k = 0
        while (i + k < str1.length && j + k < str2.length && str1[i + k] === str2[j + k]) {
          k++
        }
        if (k > longest.length) {
          longest = str1.substring(i, i + k)
        }
      }
    }

    return longest
  }

  const analyzeGoodsRelation = (clientGoods: string, conflictingMark: string) => {
    // Analyze relationship between goods/services
    const goods = clientGoods.toLowerCase()

    // Common industry classifications
    const industries = {
      "food-beverage": ["food", "beverage", "drink", "restaurant", "cafe", "bar", "alcohol", "beer", "wine", "soda"],
      technology: ["software", "app", "computer", "tech", "digital", "internet", "web", "mobile", "ai", "data"],
      clothing: ["clothing", "apparel", "fashion", "shoes", "accessories", "jewelry", "watch"],
      automotive: ["car", "auto", "vehicle", "transport", "motor", "bike", "motorcycle"],
      healthcare: ["medical", "health", "pharmaceutical", "drug", "medicine", "hospital", "clinic"],
      finance: ["bank", "financial", "insurance", "investment", "credit", "loan", "payment"],
      entertainment: ["game", "entertainment", "music", "movie", "sport", "media", "tv", "radio"],
      retail: ["store", "shop", "retail", "market", "commerce", "sales"],
    }

    let clientIndustry = "general"
    for (const [industry, keywords] of Object.entries(industries)) {
      if (keywords.some((keyword) => goods.includes(keyword))) {
        clientIndustry = industry
        break
      }
    }

    // This is simplified - in reality you'd check the actual conflicting mark's goods/services
    return {
      industry: clientIndustry,
      relationship: "unknown", // Would need actual conflicting mark data
      riskLevel: "moderate",
    }
  }

  const generateLegalAnalysis = (
    clientTM: string,
    conflictingTM: string,
    clientGoods: string,
    similarity: any,
    goodsRelation: any,
    conflictingDetails: string,
  ) => {
    let riskLevel = "low"
    let strength = "strong"
    let exactMatch = "no"

    // Determine risk and strength based on similarity
    if (similarity.type === "identical" || similarity.type === "identical-core") {
      riskLevel = "very-high"
      strength = "very-weak"
      exactMatch = "yes"
    } else if (similarity.score > 80) {
      riskLevel = "high"
      strength = "weak"
    } else if (similarity.score > 60) {
      riskLevel = "moderate"
      strength = "moderate"
    } else {
      riskLevel = "low"
      strength = "strong"
    }

    const summary = `**PROFESSIONAL TRADEMARK ANALYSIS**

**Client's Mark:** "${clientTM}"
**Conflicting Mark:** "${conflictingTM}"${
      conflictingDetails
        ? `
**Registration Details:** ${conflictingDetails}`
        : ""
    }
**Goods/Services:** ${clientGoods}

**SIMILARITY ASSESSMENT:**
${similarity.description} (Similarity Score: ${similarity.score}%)

**LEGAL ANALYSIS:**
${generateDetailedLegalAnalysis(clientTM, conflictingTM, similarity, riskLevel)}

**LIKELIHOOD OF CONFUSION FACTORS:**
${generateConfusionFactors(clientTM, conflictingTM, similarity, clientGoods)}

**TRADEMARK STRENGTH ASSESSMENT:**
${generateStrengthAssessment(clientTM, strength, similarity)}`

    const recommendations = generateRecommendations(clientTM, conflictingTM, similarity, riskLevel)

    const classAnalysis = `**CLASSIFICATION ANALYSIS FOR "${clientTM}":**

**Requested Goods/Services:** ${clientGoods}

**Conflict Assessment:**
The existing registration for "${conflictingTM}" ${conflictingDetails ? `(${conflictingDetails}) ` : ""}presents ${
      riskLevel === "very-high"
        ? "critical"
        : riskLevel === "high"
          ? "significant"
          : riskLevel === "moderate"
            ? "moderate"
            : "minimal"
    } conflicts with your proposed registration.

**Legal Considerations:**
${generateClassLegalConsiderations(similarity, riskLevel, clientGoods)}`

    return {
      summary,
      recommendations,
      riskLevel,
      strength,
      exactMatch,
      classAnalysis,
    }
  }

  const generateDetailedLegalAnalysis = (
    clientTM: string,
    conflictingTM: string,
    similarity: any,
    riskLevel: string,
  ) => {
    if (similarity.type === "identical") {
      return `Under trademark law, identical marks create a presumption of likelihood of confusion. The USPTO will almost certainly reject this application under Section 2(d) of the Trademark Act (15 U.S.C. §1052(d)). This constitutes the strongest possible objection in trademark examination.`
    } else if (similarity.score > 80) {
      return `The high degree of similarity between "${clientTM}" and "${conflictingTM}" creates substantial risk under the likelihood of confusion standard. Courts apply the DuPont factors to assess confusion, and the mark similarity factor weighs heavily against registration.`
    } else if (similarity.score > 60) {
      return `The moderate similarity requires careful analysis of all DuPont factors. While the marks show some similarity, other factors such as goods/services relationship, trade channels, and consumer sophistication will be crucial in the examination.`
    } else {
      return `The limited similarity between the marks reduces likelihood of confusion concerns. However, a comprehensive analysis of all relevant factors is still necessary to ensure successful registration.`
    }
  }

  const generateConfusionFactors = (clientTM: string, conflictingTM: string, similarity: any, clientGoods: string) => {
    return `1. **Similarity of Marks:** ${similarity.description}
2. **Similarity of Goods/Services:** Analysis required of actual conflicting registration
3. **Trade Channels:** Requires investigation of how both marks reach consumers
4. **Consumer Sophistication:** Depends on target market for ${clientGoods}
5. **Strength of Prior Mark:** Assessment needed of "${conflictingTM}" distinctiveness
6. **Intent:** No evidence of intent to trade on prior mark's reputation
7. **Actual Confusion:** No evidence currently available`
  }

  const generateStrengthAssessment = (clientTM: string, strength: string, similarity: any) => {
    if (strength === "very-weak") {
      return `"${clientTM}" faces significant distinctiveness challenges due to the existing identical or nearly identical registration. The mark's ability to function as a trademark identifier is severely compromised.`
    } else if (strength === "weak") {
      return `"${clientTM}" has limited distinctiveness in light of the similar existing registration. The mark may require additional elements or modifications to achieve registrability.`
    } else if (strength === "moderate") {
      return `"${clientTM}" demonstrates moderate distinctiveness. While there are some concerns due to existing similar marks, the mark retains some capacity to identify and distinguish goods/services.`
    } else {
      return `"${clientTM}" appears to have good distinctiveness and trademark strength. The limited similarity with existing marks does not significantly impair its ability to function as a trademark.`
    }
  }

  const generateRecommendations = (clientTM: string, conflictingTM: string, similarity: any, riskLevel: string) => {
    if (riskLevel === "very-high") {
      return `**CRITICAL RECOMMENDATION: DO NOT PROCEED**

1. **ABANDON CURRENT MARK:** The identical or nearly identical nature of "${clientTM}" to "${conflictingTM}" makes registration virtually impossible and creates significant legal risks.

2. **DEVELOP ALTERNATIVE MARKS:** Create completely different trademark options that avoid any similarity to "${conflictingTM}".

3. **IMMEDIATE LEGAL CONSULTATION:** Consult with trademark counsel before any commercial use to avoid potential infringement claims.

4. **CLEARANCE SEARCH FOR NEW MARKS:** Conduct comprehensive searches for any alternative marks before adoption.

**LEGAL RISK:** Proceeding could result in trademark infringement liability, injunctive relief, and monetary damages.`
    } else if (riskLevel === "high") {
      return `**RECOMMENDATION: SIGNIFICANT MODIFICATION REQUIRED**

1. **SUBSTANTIAL MODIFICATION:** Modify "${clientTM}" to create greater distinction from "${conflictingTM}".

2. **LEGAL CONSULTATION:** Engage trademark counsel to assess modification options and registration strategy.

3. **COEXISTENCE ANALYSIS:** Investigate whether the goods/services are sufficiently different to allow coexistence.

4. **MONITORING STRATEGY:** If proceeding, implement monitoring for any expansion of "${conflictingTM}" into your market.

**REGISTRATION PROSPECTS:** Moderate with significant modifications and strategic approach.`
    } else if (riskLevel === "moderate") {
      return `**RECOMMENDATION: STRATEGIC MODIFICATIONS**

1. **ENHANCE DISTINCTIVENESS:** Consider minor modifications to "${clientTM}" to increase distinction from "${conflictingTM}".

2. **PRECISE GOODS/SERVICES:** Carefully craft goods/services description to minimize overlap.

3. **PROFESSIONAL CONSULTATION:** Consider trademark counsel consultation for optimal filing strategy.

4. **EVIDENCE OF USE:** Develop strong evidence of use and consumer recognition if already using the mark.

**REGISTRATION PROSPECTS:** Good with proper strategy and potential minor modifications.`
    } else {
      return `**RECOMMENDATION: PROCEED WITH CONFIDENCE**

1. **FILE APPLICATION:** The analysis supports proceeding with trademark registration for "${clientTM}".

2. **OPTIMIZE APPLICATION:** Ensure precise goods/services description and proper classification.

3. **EXPEDITED PROCESSING:** Consider TEAS Plus or expedited examination to secure priority.

4. **MONITORING:** Implement trademark monitoring to protect against future conflicting applications.

**REGISTRATION PROSPECTS:** Excellent - proceed with standard filing procedures.`
    }
  }

  const generateClassLegalConsiderations = (similarity: any, riskLevel: string, clientGoods: string) => {
    if (riskLevel === "very-high") {
      return `The identical or nearly identical marks create per se likelihood of confusion regardless of goods/services classification. Even in different classes, the similarity is so high that consumer confusion is presumed under trademark law.`
    } else if (riskLevel === "high") {
      return `The significant similarity requires careful analysis of the relationship between the goods/services. Related goods in different classes can still create likelihood of confusion under the "related goods" doctrine.`
    } else {
      return `The limited similarity allows for potential coexistence, particularly if the goods/services operate in different market channels or serve different consumer bases. Proper classification strategy can minimize conflict risk.`
    }
  }

  // Utility functions
  const generateSoundex = (str: string) => {
    // Simplified Soundex algorithm
    const code = str.toLowerCase().replace(/[^a-z]/g, "")
    if (!code) return "0000"

    const soundexMap: { [key: string]: string } = {
      b: "1",
      f: "1",
      p: "1",
      v: "1",
      c: "2",
      g: "2",
      j: "2",
      k: "2",
      q: "2",
      s: "2",
      x: "2",
      z: "2",
      d: "3",
      t: "3",
      l: "4",
      m: "5",
      n: "5",
      r: "6",
    }

    let result = code[0].toUpperCase()
    for (let i = 1; i < code.length && result.length < 4; i++) {
      const digit = soundexMap[code[i]]
      if (digit && digit !== result[result.length - 1]) {
        result += digit
      }
    }

    return result.padEnd(4, "0")
  }

  const levenshteinDistance = (str1: string, str2: string) => {
    const matrix = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[str2.length][str1.length]
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
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedSearch(search)
                            setShowProposalPreview(true)
                          }}
                          title="Generate proposal email"
                          className="bg-green-50 hover:bg-green-100 border-green-200"
                        >
                          <Mail className="h-4 w-4 text-green-600" />
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar resultados de búsqueda</DialogTitle>
            <DialogDescription>Edita los resultados de la búsqueda antes de enviarlos al cliente.</DialogDescription>
          </DialogHeader>

          {selectedSearch && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="results">Resultados</TabsTrigger>
                <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4 max-h-[50vh] overflow-y-auto">
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

                <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Nota:</p>
                    <p>
                      Al abrir para editar, el estado de la búsqueda se ha actualizado automáticamente a "En proceso".
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-4 mt-4 max-h-[50vh] overflow-y-auto">
                <div className="bg-gray-50 p-4 rounded-md border mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Análisis detallado de búsqueda</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Complete los campos específicos para generar un análisis profesional detallado:
                  </p>
                </div>

                {/* Exact Match Section */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="exact-match" className="text-right">
                    Coincidencia exacta
                  </Label>
                  <Select
                    value={editedResults.exactMatch || "no"}
                    onValueChange={(value) => handleEditChange("exactMatch", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="¿Se encontró una coincidencia exacta?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No se encontró coincidencia exacta</SelectItem>
                      <SelectItem value="yes">Sí, se encontró coincidencia exacta</SelectItem>
                      <SelectItem value="pending">Pendiente de verificación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Similar Trademarks Count */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="similar-count" className="text-right">
                    Marcas similares
                  </Label>
                  <Input
                    id="similar-count"
                    type="number"
                    min="0"
                    value={editedResults.similarCount || "0"}
                    onChange={(e) => handleEditChange("similarCount", e.target.value)}
                    className="col-span-3"
                    placeholder="Número de marcas similares encontradas"
                  />
                </div>

                {/* Trademark Strength */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trademark-strength" className="text-right">
                    Fortaleza de la marca
                  </Label>
                  <Select
                    value={editedResults.trademarkStrength || ""}
                    onValueChange={(value) => handleEditChange("trademarkStrength", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Evalúe la fortaleza de la marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-strong">Muy fuerte - Marca distintiva y única</SelectItem>
                      <SelectItem value="strong">Fuerte - Buena distintividad</SelectItem>
                      <SelectItem value="moderate">Moderada - Alguna distintividad</SelectItem>
                      <SelectItem value="weak">Débil - Limitada distintividad</SelectItem>
                      <SelectItem value="very-weak">Muy débil - Descriptiva o genérica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Risk Level */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="risk-level" className="text-right">
                    Nivel de riesgo
                  </Label>
                  <Select
                    value={editedResults.riskLevel || ""}
                    onValueChange={(value) => handleEditChange("riskLevel", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Evalúe el riesgo de registro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Bajo - Pocas probabilidades de rechazo</SelectItem>
                      <SelectItem value="moderate">Moderado - Algunas preocupaciones</SelectItem>
                      <SelectItem value="high">Alto - Riesgo significativo de rechazo</SelectItem>
                      <SelectItem value="very-high">Muy alto - Rechazo muy probable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conflicting Marks Details */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="conflicting-marks" className="text-right">
                    Marcas en conflicto
                  </Label>
                  <Textarea
                    id="conflicting-marks"
                    value={editedResults.conflictingMarks || ""}
                    onChange={(e) => handleEditChange("conflictingMarks", e.target.value)}
                    className="col-span-3"
                    rows={4}
                    placeholder="Liste las marcas específicas que presentan conflictos (nombre, número de registro, clases)"
                  />
                </div>

                {/* Classes Analysis */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="classes-analysis" className="text-right">
                    Análisis de clases
                  </Label>
                  <Textarea
                    id="classes-analysis"
                    value={editedResults.classesAnalysis || ""}
                    onChange={(e) => handleEditChange("classesAnalysis", e.target.value)}
                    className="col-span-3"
                    rows={4}
                    placeholder="Análisis detallado de las clases de productos/servicios y conflictos por clase"
                  />
                </div>

                {/* Geographic Analysis */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="geographic-analysis" className="text-right">
                    Análisis geográfico
                  </Label>
                  <Textarea
                    id="geographic-analysis"
                    value={editedResults.geographicAnalysis || ""}
                    onChange={(e) => handleEditChange("geographicAnalysis", e.target.value)}
                    className="col-span-3"
                    rows={3}
                    placeholder="Análisis de disponibilidad por países/regiones"
                  />
                </div>

                {/* Detailed Results Summary */}
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

                {/* Smart Legal Analysis Generator */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-md border border-blue-200 mb-4">
                  <h3 className="font-medium text-blue-900 mb-2">⚖️ Smart Legal Analysis</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Enter the conflicting trademark you found, and I'll generate professional legal analysis based on
                    trademark law:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Client's Application:</h4>
                      <p className="text-sm text-gray-600">
                        <strong>Trademark:</strong>{" "}
                        {getSafeValue(selectedSearch, "search_data.trademarkName", "Not specified")}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Goods/Services:</strong>{" "}
                        {getSafeValue(selectedSearch, "search_data.goodsAndServices", "Not specified")}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="conflicting-trademark-smart" className="text-sm font-medium">
                          Conflicting Trademark Found
                        </Label>
                        <Input
                          id="conflicting-trademark-smart"
                          value={editedResults.conflictingTrademarkSmart || ""}
                          onChange={(e) => handleEditChange("conflictingTrademarkSmart", e.target.value)}
                          placeholder="e.g., Coca-Cola, McDonald's, Apple Inc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="conflicting-details" className="text-sm font-medium">
                          Conflicting Mark Details (Optional)
                        </Label>
                        <Input
                          id="conflicting-details"
                          value={editedResults.conflictingDetails || ""}
                          onChange={(e) => handleEditChange("conflictingDetails", e.target.value)}
                          placeholder="e.g., Reg. No. 1234567, Class 32, Filed 2020"
                        />
                      </div>
                    </div>

                    <Button onClick={() => generateSmartLegalAnalysis()} className="w-full" variant="default">
                      🎯 Generate Legal Analysis Based on Trademark Law
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4 mt-4 max-h-[50vh] overflow-y-auto">
                <div className="bg-gray-50 p-4 rounded-md border mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Opciones de recomendaciones</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Selecciona las recomendaciones que apliquen para generar automáticamente el contenido:
                  </p>
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
                    rows={10}
                    placeholder="Añade aquí recomendaciones para el cliente"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="next-steps" className="text-right">
                    Próximos pasos
                  </Label>
                  <Textarea
                    id="next-steps"
                    value={editedResults.nextSteps || ""}
                    onChange={(e) => handleEditChange("nextSteps", e.target.value)}
                    className="col-span-3"
                    rows={5}
                    placeholder="Indica los próximos pasos a seguir"
                  />
                </div>
              </TabsContent>
            </Tabs>
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

      {/* Proposal Email Generator Dialog */}
      <Dialog open={showProposalPreview} onOpenChange={setShowProposalPreview}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate Proposal Email</DialogTitle>
            <DialogDescription>
              Select the type of analysis result to generate a professional proposal email.
            </DialogDescription>
          </DialogHeader>

          {selectedSearch && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border">
                <h3 className="font-medium text-blue-900 mb-2">Client Information</h3>
                <p>
                  <strong>Name:</strong> {getSafeValue(selectedSearch, "search_data.name")}{" "}
                  {getSafeValue(selectedSearch, "search_data.surname")}
                </p>
                <p>
                  <strong>Email:</strong> {getSafeValue(selectedSearch, "search_data.email")}
                </p>
                <p>
                  <strong>Trademark:</strong> {getSafeValue(selectedSearch, "search_data.trademarkName")}
                </p>
                <p>
                  <strong>Goods/Services:</strong> {getSafeValue(selectedSearch, "search_data.goodsAndServices")}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Select Analysis Type:</h3>

                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={() => {
                      const email = generateProposalEmail(selectedSearch, "no-exact-match")
                      setProposalEmailContent(email.content)
                      setCustomMessage(email.content)
                      setRecipientEmail(getSafeValue(selectedSearch, "search_data.email"))
                      setShowProposalPreview(false)
                      setEmailDialogOpen(true)
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium text-green-800">✅ No Exact Match Found (85-95% Success)</div>
                      <div className="text-sm text-green-600">Strong registration potential, recommend proceeding</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
                    onClick={() => {
                      const email = generateProposalEmail(selectedSearch, "similar-trademarks")
                      setProposalEmailContent(email.content)
                      setCustomMessage(email.content)
                      setRecipientEmail(getSafeValue(selectedSearch, "search_data.email"))
                      setShowProposalPreview(false)
                      setEmailDialogOpen(true)
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium text-yellow-800">⚠️ Similar Trademarks Found (40-70% Success)</div>
                      <div className="text-sm text-yellow-600">Moderate risk, strategic approach needed</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 bg-red-50 hover:bg-red-100 border-red-200"
                    onClick={() => {
                      const email = generateProposalEmail(selectedSearch, "exact-match")
                      setProposalEmailContent(email.content)
                      setCustomMessage(email.content)
                      setRecipientEmail(getSafeValue(selectedSearch, "search_data.email"))
                      setShowProposalPreview(false)
                      setEmailDialogOpen(true)
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium text-red-800">🚨 Exact Match Found (5-15% Success)</div>
                      <div className="text-sm text-red-600">High risk, alternative strategies required</div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                <p>
                  <strong>Note:</strong> Selecting an option will generate a professional proposal email and open it in
                  the email composer for review and sending.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProposalPreview(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
