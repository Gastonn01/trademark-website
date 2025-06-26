import { createClient } from "@supabase/supabase-js"

// Create admin client for server-side operations
export function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  if (!supabaseUrl.includes("supabase.co")) {
    throw new Error("Invalid Supabase URL - must be a public supabase.co URL")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Simplified function to get trademark searches
export async function getTrademarkSearches(status?: string) {
  const supabase = createSupabaseAdmin()

  if (!supabase) {
    throw new Error("Failed to create Supabase client - check environment variables")
  }

  try {
    console.log("Attempting to query trademark_searches table...")

    let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log(`Successfully fetched ${data?.length || 0} records`)
    return data || []
  } catch (error) {
    console.error("Error in getTrademarkSearches:", error)
    throw error
  }
}

// Function to update search status
export async function updateSearchStatus(searchId: string, status: string) {
  const supabase = createSupabaseAdmin()

  if (!supabase) {
    throw new Error("Failed to create Supabase client")
  }

  try {
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", searchId)
      .select()

    if (error) {
      throw new Error(`Failed to update status: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error in updateSearchStatus:", error)
    throw error
  }
}

// Function to update search results and analysis
export async function updateSearchResults(searchId: string, results: string, analysis?: string) {
  const supabase = createSupabaseAdmin()

  if (!supabase) {
    throw new Error("Failed to create Supabase client")
  }

  try {
    const updateData: any = {
      results,
      updated_at: new Date().toISOString(),
    }

    if (analysis) {
      updateData.analysis = analysis
    }

    const { data, error } = await supabase.from("trademark_searches").update(updateData).eq("id", searchId).select()

    if (error) {
      throw new Error(`Failed to update search results: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error in updateSearchResults:", error)
    throw error
  }
}
