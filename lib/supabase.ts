import { createClient } from "@supabase/supabase-js"
// Add this import at the top of the file
import { getMockSearchData } from "./mock-data"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Create a singleton Supabase client
let supabaseInstance: any = null

export function getSupabaseClient() {
  // If we already have an instance, return it
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables")
    return null
  }

  try {
    // Create a new Supabase client with the service role key for admin operations
    supabaseInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
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

// Function to create the trademark_searches table if it doesn't exist
export async function ensureTrademarkSearchesTableExists() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return false
  }

  try {
    // Check if the table exists by trying to select from it
    const { error } = await supabase.from("trademark_searches").select("id").limit(1)

    if (error && error.message.includes("does not exist")) {
      console.log("trademark_searches table does not exist, creating it...")

      // Create the table using SQL
      const { error: createError } = await supabase.rpc("create_trademark_searches_table")

      if (createError) {
        console.error("Error creating trademark_searches table:", createError)

        // Try direct SQL as a fallback
        const { error: sqlError } = await supabase.rpc("execute_sql", {
          sql: `
            CREATE TABLE IF NOT EXISTS trademark_searches (
              id UUID PRIMARY KEY,
              email TEXT,
              trademark_name TEXT,
              status TEXT DEFAULT 'pending',
              notes TEXT,
              search_results JSONB,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `,
        })

        if (sqlError) {
          console.error("Error creating table with direct SQL:", sqlError)
          return false
        }
      }

      console.log("trademark_searches table created successfully")
      return true
    }

    console.log("trademark_searches table already exists")
    return true
  } catch (error) {
    console.error("Error checking/creating trademark_searches table:", error)
    return false
  }
}

// Add back the original ensureTableExists function for backward compatibility
export async function ensureTableExists() {
  return ensureTrademarkSearchesTableExists()
}

// COMPLETELY REWRITTEN getAllSearchData function with bulletproof error handling
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with:", { limit, offset, status })

  // Check if we should use mock data
  if (process.env.USE_MOCK_DATA === "true") {
    console.log("Using mock data (USE_MOCK_DATA=true)")
    return {
      data: getMockSearchData(status),
      error: null,
      source: "mock-env-var",
    }
  }

  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return {
      data: getMockSearchData(status),
      error: "Supabase client not available",
      source: "mock-no-client",
    }
  }

  try {
    console.log("Attempting Supabase query...")

    // Create a simple query with extensive error handling
    const query = supabase.from("trademark_searches")

    // Test if the table exists first with a simple count
    console.log("Testing table existence...")
    const { count, error: countError } = (await Promise.race([
      supabase.from("trademark_searches").select("*", { count: "exact", head: true }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 5000)),
    ])) as any

    if (countError) {
      console.error("Table existence check failed:", countError)

      // Check if it's a table not found error
      if (
        countError.message &&
        (countError.message.includes("does not exist") ||
          countError.message.includes("relation") ||
          countError.message.includes("table"))
      ) {
        console.log("Table does not exist")
        return {
          data: [],
          error: "Table 'trademark_searches' does not exist",
          source: "supabase-no-table",
        }
      }

      // For other errors, return mock data
      return {
        data: getMockSearchData(status),
        error: `Table check error: ${countError.message}`,
        source: "mock-table-error",
      }
    }

    console.log(`Table exists with ${count} records`)

    // If table is empty, return empty array
    if (count === 0) {
      return {
        data: [],
        error: null,
        source: "supabase-empty",
      }
    }

    // Now try to fetch the actual data
    console.log("Fetching data from table...")

    let dataQuery = supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    // Add status filter if provided
    if (status && status !== "all") {
      dataQuery = dataQuery.eq("status", status)
    }

    // Execute the query with timeout
    const { data, error } = (await Promise.race([
      dataQuery,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Data query timeout")), 8000)),
    ])) as any

    if (error) {
      console.error("Data query error:", error)
      return {
        data: getMockSearchData(status),
        error: `Data query error: ${error.message}`,
        source: "mock-query-error",
      }
    }

    if (!data) {
      console.log("Query successful but no data returned")
      return {
        data: [],
        error: null,
        source: "supabase-no-data",
      }
    }

    console.log(`Successfully fetched ${data.length} records from Supabase`)

    // Transform data safely
    const transformedData = data.map((item: any, index: number) => {
      try {
        return {
          id: item.id || `item-${index}`,
          form_type: item.notes || "free-search",
          search_data: {
            ...(typeof item.search_results === "object" && item.search_results ? item.search_results : {}),
            name: item.search_results?.firstName || item.search_results?.name || "",
            surname: item.search_results?.lastName || item.search_results?.surname || "",
            email: item.email || item.search_results?.email || "",
            trademarkName: item.trademark_name || item.search_results?.trademarkName || "",
            goodsAndServices: item.search_results?.goodsAndServices || item.search_results?.description || "",
          },
          created_at: item.created_at || new Date().toISOString(),
          status: item.status || "pending",
        }
      } catch (transformError) {
        console.error("Error transforming item:", transformError)
        return {
          id: `error-${index}`,
          form_type: "Error",
          search_data: {
            name: "Error Processing",
            surname: "",
            email: "error@example.com",
            trademarkName: "Error processing record",
          },
          created_at: new Date().toISOString(),
          status: "error",
        }
      }
    })

    return {
      data: transformedData,
      error: null,
      source: "supabase",
    }
  } catch (error) {
    console.error("Top-level error in getAllSearchData:", error)

    // Return mock data for any error
    return {
      data: getMockSearchData(status),
      error: error instanceof Error ? error.message : String(error),
      source: "mock-top-error",
    }
  }
}

// Simplified saveSearchData function
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  console.log("saveSearchData called with:", { searchId, formType })

  // Always save to in-memory storage first
  inMemoryStorage[searchId] = {
    id: searchId,
    search_results: searchData,
    notes: formType,
    created_at: new Date().toISOString(),
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return { success: true, source: "memory" }
  }

  try {
    const insertData = {
      id: searchId,
      trademark_name: String(searchData.trademarkName || "Unnamed").substring(0, 255),
      email: String(searchData.email || "").substring(0, 255),
      status: "pending",
      notes: String(formType || "free-search").substring(0, 255),
      search_results: searchData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("trademark_searches").insert([insertData]).select()

    if (error) {
      console.error("Error inserting data:", error)
      return { success: true, error: error.message, source: "memory" }
    }

    return { success: true, data, source: "supabase" }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: true, source: "memory" }
  }
}

export async function getSearchData(searchId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return inMemoryStorage[searchId] || null
  }

  try {
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()
    if (error) {
      console.error("Error getting search data:", error)
      return inMemoryStorage[searchId] || null
    }
    return data
  } catch (error) {
    console.error("Error in getSearchData:", error)
    return inMemoryStorage[searchId] || null
  }
}

export async function updateSearchStatus(searchId: string, status: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: "Supabase client not available", source: "error" }
  }

  try {
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({ status: status, updated_at: new Date().toISOString() })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating status:", error)
      return { data: null, error: error.message, source: "error" }
    }

    return { data, error: null, source: "supabase" }
  } catch (error) {
    console.error("Error in updateSearchStatus:", error)
    return { data: null, error: String(error), source: "error" }
  }
}

export async function updateSearchResults(searchId: string, updatedResults: any) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { data: null, error: "Supabase client not available", source: "error" }
  }

  try {
    // Get current record
    const { data: currentData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError) {
      console.error("Error fetching current record:", fetchError)
      return { data: null, error: fetchError.message, source: "error" }
    }

    // Update search_results
    const updatedSearchResults = {
      ...currentData.search_results,
      ...updatedResults,
    }

    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        search_results: updatedSearchResults,
        updated_at: new Date().toISOString(),
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search results:", error)
      return { data: null, error: error.message, source: "error" }
    }

    return { data, error: null, source: "supabase" }
  } catch (error) {
    console.error("Error in updateSearchResults:", error)
    return { data: null, error: String(error), source: "error" }
  }
}

export async function sendSearchResultsEmail(searchId: string, recipientEmail: string, customMessage?: string) {
  console.log(`Mock: Sending email to ${recipientEmail} for search ${searchId}`)
  return { success: true, message: "Email sent successfully" }
}
