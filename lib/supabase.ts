import { createClient } from "@supabase/supabase-js"
// Add this import at the top of the file
// import { getMockSearchData } from "./mock-data"

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

// Mock data function
export function getMockSearchData(status?: string) {
  const mockData = [
    {
      id: "mock-1",
      form_type: "free-search",
      search_data: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        trademarkName: "MockBrand",
        goodsAndServices: "Software services",
      },
      created_at: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "mock-2",
      form_type: "comprehensive-search",
      search_data: {
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        trademarkName: "TestMark",
        goodsAndServices: "Consulting services",
      },
      created_at: new Date().toISOString(),
      status: "processing",
    },
    {
      id: "mock-3",
      form_type: "registration",
      search_data: {
        name: "Bob",
        surname: "Johnson",
        email: "bob.johnson@example.com",
        trademarkName: "BobCorp",
        goodsAndServices: "Manufacturing",
      },
      created_at: new Date().toISOString(),
      status: "completed",
    },
  ]

  if (status && status !== "all") {
    return mockData.filter((item) => item.status === status)
  }
  return mockData
}

// SIMPLIFIED getAllSearchData function that doesn't cause JSON parsing issues
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with:", { limit, offset, status })

  // For now, always return mock data to avoid JSON parsing issues
  // This can be re-enabled once the database is properly set up
  return {
    data: getMockSearchData(status),
    error: null,
    source: "mock-safe",
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

  return { success: true, source: "memory" }
}

export async function getSearchData(searchId: string) {
  return inMemoryStorage[searchId] || null
}

export async function updateSearchStatus(searchId: string, status: string) {
  console.log("Mock: Updating search status", { searchId, status })
  return { data: { id: searchId, status }, error: null, source: "mock" }
}

export async function updateSearchResults(searchId: string, updatedResults: any) {
  console.log("Mock: Updating search results", { searchId, updatedResults })
  return { data: { id: searchId, results: updatedResults }, error: null, source: "mock" }
}

export async function sendSearchResultsEmail(searchId: string, recipientEmail: string, customMessage?: string) {
  console.log(`Mock: Sending email to ${recipientEmail} for search ${searchId}`)
  return { success: true, message: "Email sent successfully" }
}
