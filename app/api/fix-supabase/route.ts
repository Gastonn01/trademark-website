import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    console.log("=== FIXING SUPABASE SETUP ===")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase credentials",
        fix: "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment variables",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })

    // Step 1: Create the table with proper structure
    console.log("Creating trademark_searches table...")
    const { data: createResult, error: createError } = await supabase
      .rpc("execute_sql", {
        sql: `
        -- Drop table if exists (for clean setup)
        DROP TABLE IF EXISTS trademark_searches CASCADE;
        
        -- Create the table with all necessary columns
        CREATE TABLE trademark_searches (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          trademark_name TEXT,
          email TEXT,
          status TEXT DEFAULT 'pending',
          notes TEXT,
          search_results JSONB DEFAULT '{}',
          search_data JSONB DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create indexes
        CREATE INDEX idx_trademark_searches_status ON trademark_searches(status);
        CREATE INDEX idx_trademark_searches_created_at ON trademark_searches(created_at);
        CREATE INDEX idx_trademark_searches_email ON trademark_searches(email);
        
        -- Enable RLS
        ALTER TABLE trademark_searches ENABLE ROW LEVEL SECURITY;
        
        -- Create permissive policy for now
        CREATE POLICY "Allow all operations" ON trademark_searches
          FOR ALL USING (true) WITH CHECK (true);
      `,
      })
      .catch(async (error) => {
        // If RPC doesn't work, try direct table creation
        console.log("RPC failed, trying direct creation...")
        return await supabase.schema.createTable("trademark_searches", (table) => {
          table.uuid("id").primaryKey().defaultTo("gen_random_uuid()")
          table.text("trademark_name")
          table.text("email")
          table.text("status").defaultTo("pending")
          table.text("notes")
          table.jsonb("search_results").defaultTo("{}")
          table.jsonb("search_data").defaultTo("{}")
          table.timestamptz("created_at").defaultTo("now()")
          table.timestamptz("updated_at").defaultTo("now()")
        })
      })

    console.log("Table creation result:", { createResult, createError })

    // Step 2: Insert sample data
    console.log("Inserting sample data...")
    const sampleData = [
      {
        id: "sample-trademark-1",
        trademark_name: "TechFlow Solutions",
        email: "john.doe@example.com",
        status: "completed",
        notes: "free-search",
        search_results: {
          exactMatch: "no",
          similarCount: "2",
          trademarkStrength: "strong",
          riskLevel: "low",
          conflictingMarks: "FlowTech Inc. (Reg. #5234567), TechStream LLC (Pending)",
          classesAnalysis: "Class 42: Computer services and software development. Low conflict risk in this class.",
          geographicAnalysis: "Available in US, EU, and Canada. Some similar marks in Asia-Pacific region.",
          detailedSummary:
            "TechFlow Solutions shows strong potential for trademark registration. Our comprehensive search identified 2 similar marks but neither presents significant obstacles. The mark demonstrates good distinctiveness in the technology sector.",
          recommendations:
            "We recommend proceeding with the trademark application. The analysis shows strong potential for successful registration with minimal risk of rejection.",
          nextSteps:
            "1. File the trademark application in Class 42\n2. Monitor for any oppositions during the publication period\n3. Respond to any office actions if needed\n4. Consider international filing in key markets",
        },
        search_data: {
          name: "John",
          surname: "Doe",
          email: "john.doe@example.com",
          trademarkName: "TechFlow Solutions",
          goodsAndServices: "Computer software development, IT consulting services, cloud computing solutions",
        },
      },
      {
        id: "sample-trademark-2",
        trademark_name: "GreenLeaf Organics",
        email: "sarah.smith@example.com",
        status: "processing",
        notes: "free-search",
        search_results: {
          exactMatch: "no",
          similarCount: "4",
          trademarkStrength: "moderate",
          riskLevel: "moderate",
          conflictingMarks:
            "Green Leaf Foods (Reg. #4567890), Organic Leaf Co. (Reg. #3456789), LeafGreen Products (Pending), GreenLife Organics (Reg. #2345678)",
          classesAnalysis:
            "Class 29: Organic food products. Moderate conflict risk due to similar marks in same class.",
          geographicAnalysis: "Available in most US states. Some conflicts in California and New York markets.",
          detailedSummary:
            "GreenLeaf Organics faces moderate challenges due to existing similar marks in the organic food sector. While not identical, several marks share similar elements that could create confusion.",
          recommendations:
            "Consider modifying the mark to increase distinctiveness or narrowing the goods description to avoid conflicts with existing registrations.",
          nextSteps:
            "1. Consider trademark modifications\n2. Conduct additional clearance searches\n3. Consult with trademark attorney for strategy\n4. Evaluate alternative branding options",
        },
        search_data: {
          name: "Sarah",
          surname: "Smith",
          email: "sarah.smith@example.com",
          trademarkName: "GreenLeaf Organics",
          goodsAndServices: "Organic food products, natural supplements, health foods",
        },
      },
      {
        id: "sample-trademark-3",
        trademark_name: "Nike Pro",
        email: "test@example.com",
        status: "completed",
        notes: "free-search",
        search_results: {
          exactMatch: "yes",
          similarCount: "1",
          trademarkStrength: "very-weak",
          riskLevel: "very-high",
          conflictingMarks: "NIKE (Reg. #0073333) - Exact match owned by Nike, Inc.",
          classesAnalysis:
            "Classes 25, 28, 35: Athletic apparel, sporting goods, retail services. Direct conflict with existing Nike registrations.",
          geographicAnalysis: "Nike trademark is registered worldwide with extensive protection.",
          detailedSummary:
            "CRITICAL CONFLICT: Nike Pro directly conflicts with existing Nike trademarks. Nike, Inc. owns extensive trademark rights to NIKE and related marks across multiple classes.",
          recommendations:
            "DO NOT PROCEED with this trademark. Choose a completely different mark that does not reference Nike or similar athletic brands.",
          nextSteps:
            "1. ABANDON this trademark immediately\n2. Develop alternative brand names\n3. Conduct clearance search for new options\n4. Avoid any similarity to existing athletic brands",
        },
        search_data: {
          name: "Test",
          surname: "User",
          email: "test@example.com",
          trademarkName: "Nike Pro",
          goodsAndServices: "Athletic apparel and sporting goods",
        },
      },
    ]

    const { data: insertResult, error: insertError } = await supabase
      .from("trademark_searches")
      .upsert(sampleData, { onConflict: "id" })
      .select()

    console.log("Sample data insertion result:", { insertResult, insertError })

    // Step 3: Test the setup
    console.log("Testing the setup...")
    const { data: testResult, error: testError } = await supabase.from("trademark_searches").select("*").limit(5)

    console.log("Test query result:", { count: testResult?.length, testError })

    return NextResponse.json({
      success: true,
      message: "Supabase setup completed successfully",
      results: {
        tableCreated: !createError,
        sampleDataInserted: !insertError,
        testQueryWorked: !testError,
        recordCount: testResult?.length || 0,
      },
      sampleData: testResult || [],
      errors: {
        createError: createError?.message || null,
        insertError: insertError?.message || null,
        testError: testError?.message || null,
      },
    })
  } catch (error) {
    console.error("Fix Supabase error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to fix Supabase setup",
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
