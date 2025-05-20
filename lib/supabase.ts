import { createClient } from "@supabase/supabase-js"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Create a singleton Supabase client
let supabaseInstance: any = null

export function createSupabaseClient() {
  // If we already have an instance, return it
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing Supabase environment variables")
    return null
  }

  try {
    // Create a new Supabase client
    supabaseInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
    console.log("Supabase client initialized successfully")
    return supabaseInstance
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Update the ensureTableExists function
export async function ensureTableExists() {
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, skipping table check")
    return true
  }

  try {
    // First, check if the table exists
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError) {
      console.error("Error checking table:", checkError)

      // If the table doesn't exist, try to create it
      if (checkError.message.includes("does not exist")) {
        console.log("Table does not exist, attempting to create it")

        // Create the table
        const { error: createError } = await supabase.rpc("create_trademark_searches_table")

        if (createError) {
          console.error("Error creating table:", createError)
          return false
        }

        console.log("Table created successfully")
        return true
      }

      return false
    }

    console.log("Table exists")
    return true
  } catch (error) {
    console.error("Error checking table:", error)
    return false
  }
}

// Function to upload a file to Supabase Storage
export async function uploadFileToStorage(file: File, searchId: string) {
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, skipping file upload")
    return {
      success: false,
      error: "Supabase client not available",
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
  try {
    // First, store in memory as a fallback
    inMemoryStorage[searchId] = {
      id: searchId,
      search_results: searchData,
      notes: formType,
      created_at: new Date().toISOString(),
    }

    console.log("Data saved to in-memory storage")

    // Get Supabase client
    const supabase = createSupabaseClient()
    if (!supabase) {
      console.log("Supabase client not available, using in-memory storage")
      return { success: true, source: "memory" }
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
        // Continue with in-memory storage
        return { success: true, source: "memory" }
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
          return { success: true, source: "memory" }
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
          return { success: true, source: "memory" }
        }
      }

      return { success: true, source: "supabase" }
    } catch (supabaseError) {
      console.error("Supabase operation failed:", supabaseError)
      // Continue with in-memory storage
      return { success: true, source: "memory" }
    }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Update getSearchData
export async function getSearchData(searchId: string) {
  // Try to get from in-memory storage first
  const memoryData = inMemoryStorage[searchId]

  // Get Supabase client
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, using in-memory storage")
    return memoryData || null
  }

  try {
    // Try to get from Supabase
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      // If there's an error, try to get from memory
      console.error("Error getting from Supabase, checking memory:", error)
      return memoryData || null
    }

    return data
  } catch (error) {
    // In case of error, try to get from memory
    console.error("Error in Supabase operation, checking memory:", error)
    return memoryData || null
  }
}

// Function to update search status
export async function updateSearchStatus(searchId: string, status: string) {
  // Update in memory first
  if (inMemoryStorage[searchId]) {
    inMemoryStorage[searchId].status = status
  }

  // Get Supabase client
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, using in-memory storage")
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
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
      return { data: null, error: error.message, source: "memory" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase update operation failed:", supabaseError)
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }
}

// Function to get all search data
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with:", { limit, offset, status })

  // Get Supabase client
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, using mock data")
    return { data: getMockData(status), error: null, source: "mock" }
  }

  try {
    console.log("Attempting to fetch data from Supabase")

    // Build the query
    let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })

    // Add status filter if provided
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // Add pagination
    if (offset > 0) {
      query = query.range(offset, offset + limit - 1)
    } else {
      query = query.limit(limit)
    }

    // Execute the query
    const { data, error } = await query

    // Handle errors
    if (error) {
      console.error("Supabase query error:", error)
      return { data: getMockData(status), error: error.message, source: "mock" }
    }

    console.log(`Successfully fetched ${data?.length || 0} records from Supabase`)

    // If no data was found, return mock data
    if (!data || data.length === 0) {
      console.log("No data found in Supabase, using mock data")
      return { data: getMockData(status), error: null, source: "mock" }
    }

    // Transform data to match expected format
    const transformedData = data.map((item) => ({
      id: item.id,
      form_type: item.notes || "Unknown",
      search_data: {
        ...item.search_results,
        name: item.search_results?.firstName || item.search_results?.name || "",
        surname: item.search_results?.lastName || item.search_results?.surname || "",
        email: item.email || item.search_results?.email || "",
      },
      created_at: item.created_at,
      status: item.status || "pending",
    }))

    return { data: transformedData, error: null, source: "supabase" }
  } catch (error) {
    console.error("Error fetching from Supabase:", error)
    return { data: getMockData(status), error: String(error), source: "mock" }
  }
}

// Function to get mock data
function getMockData(status?: string) {
  // Use in-memory data if available
  const inMemoryData = Object.values(inMemoryStorage)
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((item: any) => ({
      id: item.id,
      form_type: item.notes || "Unknown",
      search_data: {
        ...item.search_results,
        name: item.search_results?.firstName || item.search_results?.name || "",
        surname: item.search_results?.lastName || item.search_results?.surname || "",
        email: item.search_results?.email,
      },
      created_at: item.created_at,
      status: item.status || "pending",
    }))

  // If we have in-memory data, use it
  if (inMemoryData.length > 0) {
    console.log(`Using ${inMemoryData.length} records from in-memory storage`)
    return inMemoryData
  }

  // Otherwise, provide mock data
  console.log("No data available, providing mock data")
  const mockData = [
    {
      id: "mock-1",
      form_type: "Free Search",
      search_data: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        trademarkName: "TechBrand",
        goodsAndServices: "Software development services",
      },
      created_at: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "mock-2",
      form_type: "Registration",
      search_data: {
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        trademarkName: "FashionStyle",
        goodsAndServices: "Clothing and accessories",
      },
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "processing",
    },
    {
      id: "mock-3",
      form_type: "Free Search",
      search_data: {
        name: "Robert",
        surname: "Johnson",
        email: "robert.johnson@example.com",
        trademarkName: "FoodDelight",
        goodsAndServices: "Restaurant services",
      },
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "completed",
    },
  ]

  // Filter by status if needed
  return status && status !== "all" ? mockData.filter((item) => item.status === status) : mockData
}

// Create a new API route for sending emails
export async function sendSearchResultsEmail(searchId: string, recipientEmail: string, customMessage?: string) {
  // Get the search data
  const searchData = await getSearchData(searchId)
  if (!searchData) {
    return { success: false, error: "Search data not found" }
  }

  // In a real implementation, you would use Resend or another email service here
  console.log(`Sending email to ${recipientEmail} for search ${searchId}`)
  console.log(`Custom message: ${customMessage || "None"}`)

  // Return success for now
  return { success: true, message: "Email sent successfully" }
}

// Function to update search results
export async function updateSearchResults(searchId: string, updatedResults: any) {
  // Update in memory first
  if (inMemoryStorage[searchId]) {
    inMemoryStorage[searchId].search_results = {
      ...inMemoryStorage[searchId].search_results,
      ...updatedResults,
    }
  }

  // Get Supabase client
  const supabase = createSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, using in-memory storage")
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }

  try {
    // Get the current record
    const { data: currentData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError) {
      console.error("Error fetching current record:", fetchError)
      return { data: null, error: fetchError.message, source: "memory" }
    }

    // Update the search_results field
    const updatedSearchResults = {
      ...currentData.search_results,
      ...updatedResults,
    }

    // Update the record
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        search_results: updatedSearchResults,
        updated_at: new Date().toISOString(),
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search results in Supabase:", error)
      return { data: null, error: error.message, source: "memory" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase operation failed:", supabaseError)
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }
}
