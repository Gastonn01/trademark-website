-- Function to create the trademark_searches table if it doesn't exist
CREATE OR REPLACE FUNCTION create_trademark_searches_table()
RETURNS void AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'trademark_searches'
  ) THEN
    -- Create the table
    CREATE TABLE public.trademark_searches (
      id UUID PRIMARY KEY,
      email TEXT,
      trademark_name TEXT,
      status TEXT DEFAULT 'pending',
      notes TEXT,
      search_results JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Add indexes
    CREATE INDEX idx_trademark_searches_status ON public.trademark_searches(status);
    CREATE INDEX idx_trademark_searches_created_at ON public.trademark_searches(created_at);
    
    RAISE NOTICE 'Created trademark_searches table';
  ELSE
    RAISE NOTICE 'trademark_searches table already exists';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get all tables in the database
CREATE OR REPLACE FUNCTION get_all_tables()
RETURNS TABLE (table_name text, schema_name text) AS $$
BEGIN
  RETURN QUERY
  SELECT tables.tablename::text, tables.schemaname::text
  FROM pg_catalog.pg_tables tables
  WHERE tables.schemaname NOT IN ('pg_catalog', 'information_schema')
  ORDER BY tables.schemaname, tables.tablename;
END;
$$ LANGUAGE plpgsql;

-- Function to execute arbitrary SQL (use with caution!)
CREATE OR REPLACE FUNCTION execute_sql(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql;
