import { createClient } from "@supabase/supabase-js"

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseServiceKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Ensure both tables exist
export async function ensureTablesExist() {
  try {
    console.log("🔍 Checking if tables exist...")

    // Check trademark_searches table
    try {
      const { error: tsError } = await supabase.from("trademark_searches").select("id").limit(1)
      if (tsError) {
        console.log("❌ trademark_searches table does not exist, creating it...")
        const { error: createError } = await supabase.rpc("create_trademark_searches_table_if_not_exists")
        if (createError) {
          console.error("❌ Error creating trademark_searches table:", createError)
          throw createError
        }
        console.log("✅ trademark_searches table created successfully")
      } else {
        console.log("✅ trademark_searches table already exists")
      }
    } catch (error) {
      console.error("❌ Error checking/creating trademark_searches table:", error)
      throw error
    }

    // Check verification_requests table
    try {
      const { error: vrError } = await supabase.from("verification_requests").select("id").limit(1)
      if (vrError) {
        console.log("❌ verification_requests table does not exist, creating it...")
        // We'll need to create this table via SQL script
        console.log("⚠️ Please run the create-verification-requests-table.sql script")
      } else {
        console.log("✅ verification_requests table already exists")
      }
    } catch (error) {
      console.error("❌ Error checking verification_requests table:", error)
      throw error
    }
  } catch (error) {
    console.error("❌ Error in ensureTablesExist:", error)
    throw error
  }
}

// Save search data to trademark_searches table
export async function saveSearchData(searchId: string, formData: any, formType: string) {
  try {
    console.log("💾 Saving to trademark_searches:", {
      searchId,
      formType,
      trademarkName: formData.trademarkName,
      email: formData.email,
    })

    // Generate a unique ID if not provided
    const finalSearchId = searchId || generateUniqueId()

    const insertData = {
      id: finalSearchId,
      trademark_name: formData.trademarkName || formData.trademark_name || "Unknown",
      email: formData.email || "no-email@example.com",
      status: "pending",
      search_results: {
        ...formData,
        formType: formType,
        searchId: finalSearchId,
        submittedAt: new Date().toISOString(),
      },
    }

    try {
      const { data, error } = await supabase.from("trademark_searches").insert(insertData).select()

      if (error) {
        console.error("❌ SUPABASE INSERT FAILED:", error)
        throw error
      }

      console.log("✅ SUPABASE INSERT SUCCESSFUL!", data)
      return { success: true, data }
    } catch (error) {
      console.error("❌ Error during Supabase insert:", error)
      throw error
    }
  } catch (error) {
    console.error("❌ Error in saveSearchData:", error)
    throw error
  }
}

// Save verification data to verification_requests table
export async function saveVerificationData(verificationData: any) {
  try {
    console.log("💾 Saving to verification_requests:", {
      trademarkName: verificationData.trademarkName,
      email: verificationData.email,
      searchId: verificationData.searchId,
    })

    // Generate a unique ID if not provided
    const finalSearchId = verificationData.searchId || generateUniqueId()

    // Calculate estimated price based on countries and classes
    const estimatedPrice = calculateEstimatedPrice(
      verificationData.countries || [],
      verificationData.selectedClasses || [1],
    )

    // Store uploaded files in the search_results JSON field instead of a separate column
    const searchResults = {
      ...verificationData,
      formType: "verification",
      searchId: finalSearchId,
      submittedAt: new Date().toISOString(),
      uploadedFiles: verificationData.uploadedFiles || [], // Store files in JSON
    }

    const insertData = {
      id: finalSearchId,
      trademark_name: verificationData.trademarkName || "Unknown",
      email: verificationData.email || "no-email@example.com",
      status: "pending",
      search_results: searchResults,
      estimated_price: estimatedPrice,
      files_count: verificationData.filesCount || 0,
      selected_countries: verificationData.countries || [],
      selected_classes: verificationData.selectedClasses || [1],
      trademark_type: verificationData.trademarkType || "word",
      contact_phone: verificationData.phone || null,
      marketing_consent: verificationData.marketing || false,
    }

    console.log("📝 Attempting to insert verification data:", {
      id: insertData.id,
      trademark_name: insertData.trademark_name,
      email: insertData.email,
      files_count: insertData.files_count,
      uploadedFilesCount: verificationData.uploadedFiles?.length || 0,
    })

    try {
      const { data, error } = await supabase.from("verification_requests").insert(insertData).select()

      if (error) {
        console.error("❌ VERIFICATION INSERT FAILED:", error)
        console.error("❌ Error details:", JSON.stringify(error, null, 2))
        throw error
      }

      console.log("✅ VERIFICATION INSERT SUCCESSFUL!", data)
      return { success: true, data }
    } catch (error) {
      console.error("❌ Error during Supabase insert:", error)
      throw error
    }
  } catch (error) {
    console.error("❌ Error in saveVerificationData:", error)
    throw error
  }
}

// Helper function to generate unique ID
function generateUniqueId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `${timestamp}-${random}`
}

// Helper function to calculate estimated price
function calculateEstimatedPrice(countries: any[], classes: number[]): number {
  // This is a simplified calculation - you can make it more sophisticated
  const basePrice = 500 // Base price per country
  const classPrice = 100 // Additional price per class

  const countryCount = Array.isArray(countries) ? countries.length : 1
  const classCount = Array.isArray(classes) ? Math.max(classes.length, 1) : 1

  return countryCount * basePrice + (classCount - 1) * classPrice
}

// Get all searches from both tables
export async function getAllSearches(tableType: "trademark_searches" | "verification_requests" | "all" = "all") {
  try {
    let allData: any[] = []

    if (tableType === "trademark_searches" || tableType === "all") {
      try {
        const { data: tsData, error: tsError } = await supabase
          .from("trademark_searches")
          .select("*")
          .order("created_at", { ascending: false })

        if (tsError) {
          console.error("Error fetching trademark_searches:", tsError)
        } else {
          // Add table_type to each record
          const tsDataWithType = (tsData || []).map((item) => ({
            ...item,
            table_type: "trademark_searches",
            form_type: item.search_results?.formType || "free-search",
          }))
          allData = [...allData, ...tsDataWithType]
        }
      } catch (error) {
        console.error("Error fetching trademark_searches:", error)
      }
    }

    if (tableType === "verification_requests" || tableType === "all") {
      try {
        const { data: vrData, error: vrError } = await supabase
          .from("verification_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (vrError) {
          console.error("Error fetching verification_requests:", vrError)
        } else {
          // Add table_type to each record
          const vrDataWithType = (vrData || []).map((item) => ({
            ...item,
            table_type: "verification_requests",
            form_type: "verification",
          }))
          allData = [...allData, ...vrDataWithType]
        }
      } catch (error) {
        console.error("Error fetching verification_requests:", error)
      }
    }

    // Sort by created_at descending
    allData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return allData
  } catch (error) {
    console.error("Error in getAllSearches:", error)
    throw error
  }
}

// Update search status (works for both tables)
export async function updateSearchStatus(
  id: string,
  status: string,
  tableType: "trademark_searches" | "verification_requests",
  notes?: string,
) {
  try {
    const updateData: any = { status }
    if (notes) {
      updateData.search_results = { notes }
    }

    try {
      const { data, error } = await supabase.from(tableType).update(updateData).eq("id", id).select()

      if (error) {
        console.error("Error updating search:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error during Supabase update:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in updateSearchStatus:", error)
    throw error
  }
}

// Get search by ID (checks both tables)
export async function getSearchById(id: string) {
  try {
    // Try trademark_searches first
    try {
      const { data: tsData, error: tsError } = await supabase
        .from("trademark_searches")
        .select("*")
        .eq("id", id)
        .single()

      if (!tsError && tsData) {
        return { ...tsData, table_type: "trademark_searches" }
      }
    } catch (error) {
      console.error("Error fetching from trademark_searches:", error)
    }

    // Try verification_requests
    try {
      const { data: vrData, error: vrError } = await supabase
        .from("verification_requests")
        .select("*")
        .eq("id", id)
        .single()

      if (!vrError && vrData) {
        return { ...vrData, table_type: "verification_requests" }
      }
    } catch (error) {
      console.error("Error fetching from verification_requests:", error)
    }

    throw new Error("Search not found in either table")
  } catch (error) {
    console.error("Error in getSearchById:", error)
    throw error
  }
}

// Delete search (works for both tables)
export async function deleteSearch(id: string, tableType: "trademark_searches" | "verification_requests") {
  try {
    try {
      const { error } = await supabase.from(tableType).delete().eq("id", id)

      if (error) {
        console.error("Error deleting search:", error)
        throw error
      }

      return { success: true }
    } catch (error) {
      console.error("Error during Supabase delete:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in deleteSearch:", error)
    throw error
  }
}

// Legacy function for backward compatibility
export async function ensureTrademarkSearchesTableExists() {
  return ensureTablesExist()
}

// Additional exports for compatibility
export function getSupabaseClient() {
  return supabase
}

export async function getSearchData(searchId: string) {
  return getSearchById(searchId)
}

export async function ensureTableExists() {
  return ensureTablesExist()
}

export async function getAllSearchData() {
  return getAllSearches()
}
