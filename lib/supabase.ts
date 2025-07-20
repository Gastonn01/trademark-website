import { createClient } from "@supabase/supabase-js"

// Client-side configuration (for admin panel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Server-side configuration (for API routes) - using the correct environment variable names
const supabaseUrl_server = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Log environment variable status for debugging
console.log("🔍 Environment variables status:", {
  NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseKey,
  SUPABASE_SERVICE_ROLE_KEY: !!supabaseServiceKey,
})

// ✅ 1. Crea el cliente de Supabase (client-side)
export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
  }
  return createClient(supabaseUrl, supabaseKey)
}

// ✅ 2. Trae todos los registros para el panel admin
export const getAllSearchData = async () => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching all search data:", error)
      throw new Error(error.message)
    }

    console.log("✅ Successfully fetched", data?.length || 0, "search records")
    return data
  } catch (error) {
    console.error("❌ Error in getAllSearchData:", error)
    throw error
  }
}

// ✅ 3. Trae un único registro por ID (opcional para vista detalle)
export const getSearchData = async (id: string) => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", id).single()

    if (error) {
      console.error("❌ Error fetching search data by ID:", error)
      throw new Error(error.message)
    }

    console.log("✅ Successfully fetched search record:", id)
    return data
  } catch (error) {
    console.error("❌ Error in getSearchData:", error)
    throw error
  }
}

// ✅ 4. Verifica si la tabla está operativa (uso interno/test)
export const ensureTableExists = async () => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from("trademark_searches").select("id").limit(1)

    if (error) {
      console.error("❌ Table check failed:", error)
      throw new Error("Table check failed: " + error.message)
    }

    console.log("✅ Table exists and is accessible")
    return true
  } catch (error) {
    console.error("❌ Error in ensureTableExists:", error)
    throw error
  }
}

// Server-side Supabase client (for API routes) - with proper fallback
export const supabase = (() => {
  // Only create server client if we have the service role key
  if (!supabaseUrl_server || !supabaseServiceKey) {
    console.warn("⚠️ Server-side Supabase client not available - missing environment variables:", {
      SUPABASE_URL: !!supabaseUrl_server,
      SUPABASE_SERVICE_ROLE_KEY: !!supabaseServiceKey,
    })
    return null
  }

  try {
    console.log("✅ Creating server-side Supabase client")
    return createClient(supabaseUrl_server, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (error) {
    console.error("❌ Failed to create server-side Supabase client:", error)
    return null
  }
})()

// Ensure the trademark_searches table exists (server-side only)
export async function ensureTrademarkSearchesTableExists() {
  if (!supabase) {
    console.warn("⚠️ Skipping table check - server-side Supabase client not available")
    return false
  }

  try {
    console.log("🔍 Checking if trademark_searches table exists...")

    const { data, error } = await supabase.from("trademark_searches").select("id").limit(1)

    if (error) {
      console.log("❌ Table does not exist or is not accessible:", error.message)

      // Try to create the table if we have the RPC function
      try {
        const { error: createError } = await supabase.rpc("create_trademark_searches_table_if_not_exists")

        if (createError) {
          console.error("❌ Error creating table:", createError)
          return false
        }

        console.log("✅ Table created successfully")
        return true
      } catch (rpcError) {
        console.warn("⚠️ Could not create table - RPC function may not exist")
        return false
      }
    } else {
      console.log("✅ Table already exists")
      return true
    }
  } catch (error) {
    console.error("❌ Error in ensureTrademarkSearchesTableExists:", error)
    return false
  }
}

// Save search data with corrected format (server-side only)
export async function saveSearchData(searchData: any) {
  if (!supabase) {
    console.error("❌ Cannot save search data - server-side Supabase client not available")
    throw new Error("Server-side Supabase client not available")
  }

  try {
    console.log("💾 Attempting to save search data:", {
      id: searchData.id,
      formType: searchData.form_type,
      trademarkName: searchData.trademark_name,
      email: searchData.email,
    })

    // Prepare the insert object with only valid Supabase columns
    const insertData = {
      id: searchData.id,
      trademark_name: searchData.trademark_name || "Unknown",
      email: searchData.email || "no-email@example.com",
      status: searchData.status || "submitted",
      search_results: {
        // Store all the original data in the JSONB field
        trademark_name: searchData.trademark_name,
        trademark_type: searchData.trademark_type,
        goods_and_services: searchData.goods_and_services,
        countries: searchData.countries,
        classes: searchData.classes,
        name: searchData.name,
        surname: searchData.surname,
        email: searchData.email,
        phone: searchData.phone,
        marketing_consent: searchData.marketing_consent,
        formType: searchData.form_type,
        searchId: searchData.id,
        submittedAt: searchData.created_at,
        updatedAt: searchData.updated_at,
      },
      created_at: searchData.created_at,
      updated_at: searchData.updated_at,
    }

    console.log("📝 Insert data prepared:", insertData)

    const { data, error } = await supabase.from("trademark_searches").insert(insertData).select()

    if (error) {
      console.error("❌ SUPABASE INSERT FAILED:", error)
      throw error
    }

    console.log("✅ SUPABASE INSERT SUCCESSFUL!", data)
    return { success: true, data }
  } catch (error) {
    console.error("❌ Error in saveSearchData:", error)
    throw error
  }
}

// Get all searches for admin panel (server-side)
export async function getAllSearches() {
  if (!supabase) {
    console.warn("⚠️ Cannot fetch searches - server-side Supabase client not available")
    return []
  }

  try {
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching searches:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllSearches:", error)
    throw error
  }
}

// Update search status (server-side)
export async function updateSearchStatus(id: string, status: string, notes?: string) {
  if (!supabase) {
    console.warn("⚠️ Cannot update search - server-side Supabase client not available")
    throw new Error("Server-side Supabase client not available")
  }

  try {
    const updateData: any = { status }
    if (notes) {
      updateData.search_results = { notes }
    }

    const { data, error } = await supabase.from("trademark_searches").update(updateData).eq("id", id).select()

    if (error) {
      console.error("Error updating search:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in updateSearchStatus:", error)
    throw error
  }
}

// Get search by ID (server-side)
export async function getSearchById(id: string) {
  if (!supabase) {
    console.warn("⚠️ Cannot fetch search by ID - server-side Supabase client not available")
    throw new Error("Server-side Supabase client not available")
  }

  try {
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching search by ID:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getSearchById:", error)
    throw error
  }
}

// Delete search (server-side)
export async function deleteSearch(id: string) {
  if (!supabase) {
    console.warn("⚠️ Cannot delete search - server-side Supabase client not available")
    throw new Error("Server-side Supabase client not available")
  }

  try {
    const { error } = await supabase.from("trademark_searches").delete().eq("id", id)

    if (error) {
      console.error("Error deleting search:", error)
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error in deleteSearch:", error)
    throw error
  }
}

// Client-side update function for admin panel
export const updateSearchRecord = async (id: string, status: string, notes?: string) => {
  try {
    const supabase = getSupabaseClient()

    // Get current search data
    const { data: currentData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError) {
      throw fetchError
    }

    // Update with new status and notes
    const updateData = {
      status,
      search_results: {
        ...currentData.search_results,
        notes: notes || currentData.search_results?.notes,
      },
    }

    const { data, error } = await supabase.from("trademark_searches").update(updateData).eq("id", id).select()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in updateSearchRecord:", error)
    throw error
  }
}

// Client-side delete function for admin panel
export const deleteSearchRecord = async (id: string) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from("trademark_searches").delete().eq("id", id)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error in deleteSearchRecord:", error)
    throw error
  }
}
