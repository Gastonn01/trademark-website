import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({
        success: false,
        error: "Supabase client not available. Check environment variables.",
      })
    }

    console.log("Attempting to create trademark_searches table...")

    // Try to create the table using raw SQL
    const { data, error } = await supabase.rpc("sql", {
      query: `
        CREATE TABLE IF NOT EXISTS trademark_searches (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT,
          trademark_name TEXT,
          status TEXT DEFAULT 'pending',
          notes TEXT,
          search_results JSONB DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create an index for better performance
        CREATE INDEX IF NOT EXISTS idx_trademark_searches_status ON trademark_searches(status);
        CREATE INDEX IF NOT EXISTS idx_trademark_searches_created_at ON trademark_searches(created_at);
      `,
    })

    if (error) {
      console.error("Error creating table with rpc:", error)

      // Try alternative method
      const { error: directError } = await supabase.from("trademark_searches").select("id").limit(1)

      if (directError && directError.message.includes("does not exist")) {
        return NextResponse.json({
          success: false,
          error: "Table does not exist and could not be created. Please create it manually in Supabase dashboard.",
          sqlScript: `
CREATE TABLE trademark_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  trademark_name TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  search_results JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trademark_searches_status ON trademark_searches(status);
CREATE INDEX idx_trademark_searches_created_at ON trademark_searches(created_at);
          `,
        })
      }
    }

    // Test the table
    const { count, error: testError } = await supabase
      .from("trademark_searches")
      .select("*", { count: "exact", head: true })

    if (testError) {
      return NextResponse.json({
        success: false,
        error: `Table creation uncertain: ${testError.message}`,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Table exists and is accessible. Current record count: ${count}`,
      recordCount: count,
    })
  } catch (error) {
    console.error("Critical error in create-table:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
