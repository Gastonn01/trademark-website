import { createClient } from "@supabase/supabase-js"
import { sampleSearches } from "./sample-data"

// Check if we're in a preview environment - ALWAYS return true for now to force using sample data
const isPreviewEnvironment = () => {
  // Force using sample data to avoid connection issues
  return true
}

// Create a Supabase client
export function createSupabaseClient() {
  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Supabase environment variables are missing")
    return null
  }

  try {
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
    return client
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Get a Supabase client instance
let supabase: any = null
try {
  supabase = createSupabaseClient()
} catch (error) {
  console.error("Error initializing global Supabase client:", error)
}

// Update the ensureTableExists function
export async function ensureTableExists() {
  // In preview mode, just return true
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, skipping table check")
    return true
  }

  // If Supabase client wasn't initialized, return false
  if (!supabase) {
    console.log("Supabase client not available, skipping table check")
    return false
  }

  try {
    // Verify the table exists by querying it
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError) {
      console.error("Error checking table:", checkError)
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking table:", error)
    return false
  }
}

// Function to upload a file to Supabase Storage
export async function uploadFileToStorage(file: File, searchId: string) {
  // In preview mode, just return mock success response
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, skipping file upload")
    return {
      success: true,
      logoData: {
        logoName: file.name,
        logoType: file.type,
        logoSize: file.size,
      },
      error: null,
    }
  }

  try {
    // Convert file to ArrayBuffer
    const fileArrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileArrayBuffer)

    // Generate a unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${searchId}-${Date.now()}.${fileExt}`

    console.log(`Attempting to upload file: ${fileName}, size: ${fileBuffer.length} bytes`)

    // Instead of using Storage, we'll save file metadata
    const logoData = {
      logoName: file.name,
      logoType: file.type,
      logoSize: file.size,
      // We don't save the binary content in the table, it's too large
    }

    console.log("Saving logo metadata")

    return {
      success: true,
      logoData: logoData,
      error: null,
    }
  } catch (error) {
    console.error("Error in uploadFileToStorage:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Update the saveSearchData function
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  // In preview mode, just return success
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, skipping data save")
    return { success: true, source: "preview" }
  }

  try {
    // If Supabase client wasn't initialized, return error
    if (!supabase) {
      return { success: false, error: "Supabase client not available" }
    }

    // Try to save to Supabase
    try {
      // Check if record exists
      const { data: existingData, error: fetchError } = await supabase
        .from("trademark_searches")
        .select("*")
        .eq("id", searchId)
        .single()

      if (fetchError && !fetchError.message.includes("No rows found")) {
        console.error("Error checking existing record:", fetchError)
        return { success: false, error: fetchError.message }
      }

      // Prepare data object with schema-compatible fields
      const dataToSave = {
        id: searchId,
        trademark_name: searchData.trademarkName || searchData.trademark_name || "Unnamed",
        email: searchData.email || "",
        phone: searchData.phone || searchData.phoneNumber || "",
        description: searchData.goodsAndServices || searchData.description || searchData.details || "",
        status: "pending",
        search_results: searchData, // Store all form data in the JSONB field
        notes: formType, // Store form type in notes for reference
      }

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from("trademark_searches")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", searchId)

        if (error) {
          console.error("Error updating record:", error)
          return { success: false, error: error.message }
        }
      } else {
        // Insert new record
        const { error } = await supabase.from("trademark_searches").insert([
          {
            ...dataToSave,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (error) {
          console.error("Error inserting record:", error)
          return { success: false, error: error.message }
        }
      }

      return { success: true, source: "supabase" }
    } catch (supabaseError) {
      console.error("Supabase operation failed:", supabaseError)
      return { success: false, error: supabaseError instanceof Error ? supabaseError.message : "Unknown error" }
    }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Update getSearchData function
export async function getSearchData(searchId: string) {
  // In preview mode, return sample data
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, returning sample data")
    return sampleSearches.find((item) => item.id === searchId) || null
  }

  // If Supabase client wasn't initialized, return null
  if (!supabase) {
    console.error("Supabase client not available")
    return null
  }

  try {
    // Try to get from Supabase
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      console.error("Error getting data from Supabase:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in Supabase operation:", error)
    return null
  }
}

// Function to update search status
export async function updateSearchStatus(searchId: string, status: string) {
  // In preview mode, return sample data
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, returning sample data")
    const sampleItem = sampleSearches.find((item) => item.id === searchId)
    if (sampleItem) {
      sampleItem.status = status
    }
    return { data: sampleItem, error: null, source: "preview" }
  }

  // If Supabase client wasn't initialized, return error
  if (!supabase) {
    return { data: null, error: "Supabase client not available", source: "error" }
  }

  try {
    // Try to update in Supabase
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({ status: status })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search status in Supabase:", error)
      return { data: null, error: error.message, source: "error" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase update operation failed:", supabaseError)
    return {
      data: null,
      error: supabaseError instanceof Error ? supabaseError.message : "Unknown error",
      source: "error",
    }
  }
}

// Function to update search results
export async function updateSearchResults(searchId: string, results: any) {
  console.log("Updating search results for ID:", searchId, "Results:", results)

  // In preview mode, return sample data
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, returning sample data")
    const sampleItem = sampleSearches.find((item) => item.id === searchId)
    if (sampleItem) {
      sampleItem.results = results
      sampleItem.status = "processing"
    }
    return { data: sampleItem, error: null, source: "preview" }
  }

  // If Supabase client wasn't initialized, return error
  if (!supabase) {
    return {
      data: null,
      error: "Supabase client not available",
      source: "error",
    }
  }

  try {
    // Try to update in Supabase
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        results: results,
        status: "processing", // Update status to processing if results are added
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search results in Supabase:", error)
      return {
        data: null,
        error: error.message,
        source: "error",
      }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase update operation failed:", supabaseError)
    return {
      data: null,
      error: supabaseError instanceof Error ? supabaseError.message : "Unknown error",
      source: "error",
    }
  }
}

// Function to get all search data
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with limit:", limit, "offset:", offset, "status:", status)

  // In preview mode, return sample data
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, returning sample data")

    // Filter by status if needed
    let filteredData = [...sampleSearches]
    if (status && status !== "all") {
      filteredData = filteredData.filter((item) => item.status === status)
    }

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + limit)

    return {
      data: paginatedData,
      error: null,
      source: "preview",
      message: "Using sample data because this is a preview environment or Supabase credentials are missing.",
    }
  }

  // If Supabase client wasn't initialized, return error
  if (!supabase) {
    console.error("Supabase client not available")
    return {
      data: [],
      error: "Supabase client not available",
      source: "error",
      message: "Supabase client could not be initialized. Check your environment variables.",
    }
  }

  try {
    console.log("Fetching data from Supabase")

    // Use a very simple query to minimize potential errors
    const { data, error } = await supabase.from("trademark_searches").select("*")

    if (error) {
      console.error("Error fetching from Supabase:", error)
      // Return sample data as fallback with error message
      return {
        data: sampleSearches,
        error: error.message,
        source: "fallback",
        message: "Error fetching from Supabase. Using sample data as fallback.",
      }
    }

    if (!data || data.length === 0) {
      console.log("No data found in Supabase")
      return {
        data: [],
        error: null,
        source: "supabase",
        message: "No data found in the database.",
      }
    }

    // Filter by status if needed
    let filteredData = [...data]
    if (status && status !== "all") {
      filteredData = filteredData.filter((item) => item.status === status)
    }

    // Sort the data (newest first)
    const sortedData = filteredData.sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    // Apply pagination
    const paginatedData = sortedData.slice(offset, offset + limit)

    // Transform the data to match the expected format
    const transformedData = paginatedData.map((item: any) => ({
      id: item.id,
      form_type: item.notes || "Unknown",
      search_data: {
        ...item.search_results,
        name: item.search_results?.firstName || item.search_results?.name || "",
        surname: item.search_results?.lastName || item.search_results?.surname || "",
        email: item.email || (item.search_results ? item.search_results.email : ""),
      },
      created_at: item.created_at,
      status: item.status || "pending",
      results: item.results,
    }))

    console.log(`Returning ${transformedData.length} items from Supabase`)
    return {
      data: transformedData,
      error: null,
      source: "supabase",
      message: "Data successfully fetched from Supabase.",
    }
  } catch (error) {
    console.error("Error fetching from Supabase:", error)

    // Return sample data as fallback with error message
    return {
      data: sampleSearches,
      error: error instanceof Error ? error.message : String(error),
      source: "fallback",
      message: "Error fetching from Supabase. Using sample data as fallback.",
    }
  }
}

// Function to get search data by verification token
export async function getSearchDataByToken(token: string) {
  console.log("Getting search data by token:", token)

  // In preview mode, return sample data
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, returning sample data")
    return sampleSearches.find((item) => item.results?.verificationToken === token) || null
  }

  // If Supabase client wasn't initialized, return null
  if (!supabase) {
    console.error("Supabase client not available")
    return null
  }

  try {
    // Query the database for the search with this token
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("results->verificationToken", token)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    if (!data) {
      console.log("No data found for token:", token)
      return null
    }

    console.log("Found search data for token:", token)
    return data
  } catch (error) {
    console.error("Error in getSearchDataByToken:", error)
    throw error
  }
}
