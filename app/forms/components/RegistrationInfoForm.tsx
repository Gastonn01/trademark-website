"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2, Upload, Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Types for the form
type OwnerType = "person" | "entity"

interface Owner {
  id: string
  type: OwnerType
  name: string
  country: string
  address: string
  email: string
  ownershipPercentage: number
  // Additional fields that may be required based on country
  maritalStatus?: string
  translation?: string
  stateProvince?: string
  taxId?: string
  documents: {
    id: string
    type: string
    file: File | null
    name: string
  }[]
}

interface CountryRequirement {
  country: string
  requiredFields: string[]
  documents: {
    type: string
    required: boolean
    description: string
  }[]
}

// Sample country requirements - in a real app, this would come from an API or database
const countryRequirements: CountryRequirement[] = [
  {
    country: "US",
    requiredFields: ["stateProvince", "taxId"],
    documents: [
      {
        type: "identificationDocument",
        required: true,
        description: "Government-issued ID (passport, driver's license)",
      },
      { type: "proofOfAddress", required: true, description: "Proof of address (utility bill, bank statement)" },
      {
        type: "businessRegistration",
        required: false,
        description: "Business registration certificate (for entities)",
      },
    ],
  },
  {
    country: "EU",
    requiredFields: ["translation"],
    documents: [
      {
        type: "identificationDocument",
        required: true,
        description: "Government-issued ID (passport, national ID card)",
      },
      { type: "proofOfAddress", required: true, description: "Proof of address (utility bill, bank statement)" },
      { type: "powerOfAttorney", required: false, description: "Power of attorney (if applicable)" },
    ],
  },
  {
    country: "UK",
    requiredFields: [],
    documents: [
      {
        type: "identificationDocument",
        required: true,
        description: "Government-issued ID (passport, driver's license)",
      },
      { type: "proofOfAddress", required: true, description: "Proof of address (utility bill, bank statement)" },
    ],
  },
  {
    country: "CN",
    requiredFields: ["translation"],
    documents: [
      {
        type: "identificationDocument",
        required: true,
        description: "Government-issued ID (passport, national ID card)",
      },
      { type: "businessRegistration", required: true, description: "Business registration certificate (for entities)" },
      { type: "chineseTranslation", required: true, description: "Chinese translation of all documents" },
    ],
  },
  // Add more countries as needed
]

// List of countries for the dropdown
const countries = [
  { code: "US", name: "United States" },
  { code: "EU", name: "European Union" },
  { code: "UK", name: "United Kingdom" },
  { code: "CN", name: "China" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "IN", name: "India" },
  // Add more countries as needed
]

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Initial owner template
const createNewOwner = (): Owner => ({
  id: generateId(),
  type: "person",
  name: "",
  country: "",
  address: "",
  email: "",
  ownershipPercentage: 100,
  documents: [],
})

export function RegistrationInfoForm({ token }: { token?: string }) {
  const router = useRouter()
  const [owners, setOwners] = useState<Owner[]>([createNewOwner()])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [submissionId, setSubmissionId] = useState<string | null>(null)

  // Load data from token if provided
  useEffect(() => {
    if (token) {
      // In a real application, you would fetch the data using the token
      const fetchDataWithToken = async () => {
        try {
          const response = await fetch(`/api/get-registration-data?token=${token}`)
          if (response.ok) {
            const data = await response.json()
            if (data.success && data.registrationData) {
              setOwners(data.registrationData.owners || [createNewOwner()])
            }
          }
        } catch (error) {
          console.error("Error fetching data with token:", error)
        }
      }

      fetchDataWithToken()
    }
  }, [token])

  // Add a new owner
  const addOwner = () => {
    setOwners([...owners, createNewOwner()])
  }

  // Remove an owner
  const removeOwner = (id: string) => {
    if (owners.length > 1) {
      setOwners(owners.filter((owner) => owner.id !== id))

      // Recalculate percentages
      const remainingOwners = owners.filter((owner) => owner.id !== id)
      const equalPercentage = 100 / remainingOwners.length
      setOwners(
        remainingOwners.map((owner) => ({
          ...owner,
          ownershipPercentage: Number.parseFloat(equalPercentage.toFixed(2)),
        })),
      )
    }
  }

  // Update owner information
  const updateOwner = (id: string, field: keyof Owner, value: any) => {
    setOwners(
      owners.map((owner) => {
        if (owner.id === id) {
          return { ...owner, [field]: value }
        }
        return owner
      }),
    )
  }

  // Get required documents based on country
  const getRequiredDocuments = (countryCode: string) => {
    const country = countryRequirements.find((c) => c.country === countryCode)
    return country?.documents || []
  }

  // Check if a field is required for a country
  const isFieldRequired = (countryCode: string, field: string) => {
    const country = countryRequirements.find((c) => c.country === countryCode)
    return country?.requiredFields.includes(field) || false
  }

  // Handle document upload
  const handleDocumentUpload = (ownerId: string, documentType: string, file: File) => {
    setOwners(
      owners.map((owner) => {
        if (owner.id === ownerId) {
          // Check if document already exists
          const existingDocIndex = owner.documents.findIndex((doc) => doc.type === documentType)

          if (existingDocIndex >= 0) {
            // Update existing document
            const updatedDocs = [...owner.documents]
            updatedDocs[existingDocIndex] = {
              ...updatedDocs[existingDocIndex],
              file,
              name: file.name,
            }
            return { ...owner, documents: updatedDocs }
          } else {
            // Add new document
            return {
              ...owner,
              documents: [
                ...owner.documents,
                {
                  id: generateId(),
                  type: documentType,
                  file,
                  name: file.name,
                },
              ],
            }
          }
        }
        return owner
      }),
    )
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Validate form
      let isValid = true
      let validationMessage = ""

      // Check if all owners have required fields
      owners.forEach((owner, index) => {
        if (!owner.name || !owner.country || !owner.address || !owner.email) {
          isValid = false
          validationMessage = `Owner ${index + 1} is missing required information.`
        }

        // Check country-specific required fields
        if (owner.country) {
          const requiredFields = countryRequirements.find((c) => c.country === owner.country)?.requiredFields || []
          requiredFields.forEach((field) => {
            if (!owner[field as keyof Owner]) {
              isValid = false
              validationMessage = `Owner ${index + 1} is missing required field: ${field}.`
            }
          })

          // Check required documents
          const requiredDocs = getRequiredDocuments(owner.country)
            .filter((doc) => doc.required)
            .map((doc) => doc.type)

          const missingDocs = requiredDocs.filter(
            (docType) => !owner.documents.some((doc) => doc.type === docType && doc.file),
          )

          if (missingDocs.length > 0) {
            isValid = false
            validationMessage = `Owner ${index + 1} is missing required documents: ${missingDocs.join(", ")}.`
          }
        }
      })

      // Check if ownership percentages add up to 100%
      const totalPercentage = owners.reduce((sum, owner) => sum + owner.ownershipPercentage, 0)
      if (Math.abs(totalPercentage - 100) > 0.01) {
        isValid = false
        validationMessage = `Ownership percentages must add up to 100%. Current total: ${totalPercentage}%.`
      }

      if (!isValid) {
        setErrorMessage(validationMessage)
        setIsSubmitting(false)
        return
      }

      // Create FormData for submission
      const formData = new FormData()
      formData.append("ownerCount", owners.length.toString())

      // Add all owner data to FormData
      owners.forEach((owner, index) => {
        formData.append(`owners[${index}][id]`, owner.id)
        formData.append(`owners[${index}][type]`, owner.type)
        formData.append(`owners[${index}][name]`, owner.name)
        formData.append(`owners[${index}][country]`, owner.country)
        formData.append(`owners[${index}][address]`, owner.address)
        formData.append(`owners[${index}][email]`, owner.email)
        formData.append(`owners[${index}][ownershipPercentage]`, owner.ownershipPercentage.toString())

        // Add optional fields if they exist
        if (owner.maritalStatus) {
          formData.append(`owners[${index}][maritalStatus]`, owner.maritalStatus)
        }

        if (owner.translation) {
          formData.append(`owners[${index}][translation]`, owner.translation)
        }

        if (owner.stateProvince) {
          formData.append(`owners[${index}][stateProvince]`, owner.stateProvince)
        }

        if (owner.taxId) {
          formData.append(`owners[${index}][taxId]`, owner.taxId)
        }

        // Add documents
        const documentTypes = owner.documents.filter((doc) => doc.file).map((doc) => doc.type)

        documentTypes.forEach((docType) => {
          formData.append(`owners[${index}][documentTypes][]`, docType)
        })

        owner.documents.forEach((doc) => {
          if (doc.file) {
            formData.append(`owners[${index}][documents][${doc.type}]`, doc.file)
          }
        })
      })

      // Submit the form data to the API
      const response = await fetch("/api/submit-registration-info", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSuccessMessage("Registration information submitted successfully!")
        setSubmissionId(result.submissionId)

        // Optional: redirect to a thank you page after a delay
        // setTimeout(() => {
        //   router.push(`/thank-you?id=${result.submissionId}`)
        // }, 3000)
      } else {
        throw new Error(result.message || "Failed to submit registration information")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{successMessage}</span>
          </div>
          {submissionId && (
            <p className="mt-2 text-sm">
              Your submission ID: <span className="font-medium">{submissionId}</span>
            </p>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Owners Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Trademark Owners</h2>
          <Button type="button" onClick={addOwner} variant="outline" className="flex items-center gap-2">
            <PlusCircle size={16} />
            Add Owner
          </Button>
        </div>

        {owners.map((owner, index) => (
          <Card key={owner.id} className="border-2">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Owner {index + 1}</h3>
                {owners.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeOwner(owner.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                )}
              </div>

              {/* Owner Type */}
              <div className="mb-4">
                <Label htmlFor={`owner-type-${owner.id}`}>Owner Type</Label>
                <Select value={owner.type} onValueChange={(value: OwnerType) => updateOwner(owner.id, "type", value)}>
                  <SelectTrigger id={`owner-type-${owner.id}`}>
                    <SelectValue placeholder="Select owner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="person">Individual Person</SelectItem>
                    <SelectItem value="entity">Business Entity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Owner Name */}
              <div className="mb-4">
                <Label htmlFor={`owner-name-${owner.id}`}>
                  {owner.type === "person" ? "Full Name" : "Entity Name"}
                </Label>
                <Input
                  id={`owner-name-${owner.id}`}
                  value={owner.name}
                  onChange={(e) => updateOwner(owner.id, "name", e.target.value)}
                  placeholder={owner.type === "person" ? "John Doe" : "Acme Corporation"}
                  required
                />
              </div>

              {/* Country */}
              <div className="mb-4">
                <Label htmlFor={`owner-country-${owner.id}`}>Country</Label>
                <Select value={owner.country} onValueChange={(value) => updateOwner(owner.id, "country", value)}>
                  <SelectTrigger id={`owner-country-${owner.id}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="mb-4">
                <Label htmlFor={`owner-address-${owner.id}`}>Address</Label>
                <Textarea
                  id={`owner-address-${owner.id}`}
                  value={owner.address}
                  onChange={(e) => updateOwner(owner.id, "address", e.target.value)}
                  placeholder="123 Main St, City, State, Zip"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <Label htmlFor={`owner-email-${owner.id}`}>Email</Label>
                <Input
                  id={`owner-email-${owner.id}`}
                  type="email"
                  value={owner.email}
                  onChange={(e) => updateOwner(owner.id, "email", e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>

              {/* Ownership Percentage */}
              <div className="mb-4">
                <Label htmlFor={`owner-percentage-${owner.id}`}>Ownership Percentage</Label>
                <div className="flex items-center">
                  <Input
                    id={`owner-percentage-${owner.id}`}
                    type="number"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={owner.ownershipPercentage}
                    onChange={(e) => updateOwner(owner.id, "ownershipPercentage", Number.parseFloat(e.target.value))}
                    required
                    className="w-24"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>

              {/* Country-specific fields */}
              {owner.country && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">
                    Additional Information for {countries.find((c) => c.code === owner.country)?.name}
                  </h4>

                  {/* State/Province (US) */}
                  {isFieldRequired(owner.country, "stateProvince") && (
                    <div className="mb-4">
                      <Label htmlFor={`owner-state-${owner.id}`}>State/Province</Label>
                      <Input
                        id={`owner-state-${owner.id}`}
                        value={owner.stateProvince || ""}
                        onChange={(e) => updateOwner(owner.id, "stateProvince", e.target.value)}
                        placeholder="California"
                        required
                      />
                    </div>
                  )}

                  {/* Tax ID (US) */}
                  {isFieldRequired(owner.country, "taxId") && (
                    <div className="mb-4">
                      <Label htmlFor={`owner-taxid-${owner.id}`}>
                        {owner.type === "person" ? "SSN/Tax ID" : "EIN/Tax ID"}
                      </Label>
                      <Input
                        id={`owner-taxid-${owner.id}`}
                        value={owner.taxId || ""}
                        onChange={(e) => updateOwner(owner.id, "taxId", e.target.value)}
                        placeholder={owner.type === "person" ? "XXX-XX-XXXX" : "XX-XXXXXXX"}
                        required
                      />
                    </div>
                  )}

                  {/* Translation (EU, CN) */}
                  {isFieldRequired(owner.country, "translation") && (
                    <div className="mb-4">
                      <Label htmlFor={`owner-translation-${owner.id}`}>Trademark Translation (if applicable)</Label>
                      <Textarea
                        id={`owner-translation-${owner.id}`}
                        value={owner.translation || ""}
                        onChange={(e) => updateOwner(owner.id, "translation", e.target.value)}
                        placeholder="Provide translation of your trademark in the local language"
                      />
                    </div>
                  )}

                  {/* Marital Status (for some countries) */}
                  {isFieldRequired(owner.country, "maritalStatus") && owner.type === "person" && (
                    <div className="mb-4">
                      <Label htmlFor={`owner-marital-${owner.id}`}>Marital Status</Label>
                      <Select
                        value={owner.maritalStatus || ""}
                        onValueChange={(value) => updateOwner(owner.id, "maritalStatus", value)}
                      >
                        <SelectTrigger id={`owner-marital-${owner.id}`}>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {/* Required Documents */}
              {owner.country && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Required Documents</h4>
                  <div className="space-y-4">
                    {getRequiredDocuments(owner.country).map((doc) => {
                      const existingDoc = owner.documents.find((d) => d.type === doc.type)
                      return (
                        <div key={doc.type} className="border p-4 rounded-md">
                          <div className="flex items-start gap-2 mb-2">
                            <Checkbox id={`doc-${owner.id}-${doc.type}`} checked={!!existingDoc?.file} disabled />
                            <div>
                              <Label htmlFor={`doc-${owner.id}-${doc.type}`} className="font-medium">
                                {doc.description}
                                {doc.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <Input
                                id={`file-${owner.id}-${doc.type}`}
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDocumentUpload(owner.id, doc.type, e.target.files[0])
                                  }
                                }}
                                className="hidden"
                              />
                              <Label
                                htmlFor={`file-${owner.id}-${doc.type}`}
                                className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
                              >
                                <Upload size={16} />
                                {existingDoc?.file ? "Change File" : "Upload File"}
                              </Label>
                              {existingDoc?.file && (
                                <span className="text-sm text-gray-600 truncate max-w-xs">{existingDoc.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button type="submit" disabled={isSubmitting} className="w-full max-w-md" size="lg">
          {isSubmitting ? "Submitting..." : "Submit Registration Information"}
        </Button>
      </div>
    </form>
  )
}
