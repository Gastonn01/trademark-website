-- Create the trademark_searches table with all necessary columns
CREATE TABLE IF NOT EXISTS trademark_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trademark_name TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  search_results JSONB,
  search_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trademark_searches_status ON trademark_searches(status);
CREATE INDEX IF NOT EXISTS idx_trademark_searches_created_at ON trademark_searches(created_at);
CREATE INDEX IF NOT EXISTS idx_trademark_searches_email ON trademark_searches(email);

-- Enable Row Level Security (RLS) - but allow all operations for now
ALTER TABLE trademark_searches ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later)
CREATE POLICY "Allow all operations on trademark_searches" ON trademark_searches
  FOR ALL USING (true) WITH CHECK (true);

-- Insert some sample data for testing
INSERT INTO trademark_searches (
  id,
  trademark_name,
  email,
  status,
  notes,
  search_results,
  search_data
) VALUES (
  'sample-1',
  'Sample Trademark',
  'sample@example.com',
  'completed',
  'free-search',
  '{
    "exactMatch": "no",
    "similarCount": "2",
    "trademarkStrength": "strong",
    "riskLevel": "low",
    "conflictingMarks": "Similar Mark 1, Similar Mark 2",
    "detailedSummary": "This is a sample trademark analysis with good prospects for registration.",
    "recommendations": "We recommend proceeding with the trademark application as the analysis shows strong potential for success.",
    "nextSteps": "1. File the trademark application\n2. Monitor for any oppositions\n3. Respond to any office actions if needed"
  }',
  '{
    "name": "John",
    "surname": "Doe",
    "email": "sample@example.com",
    "trademarkName": "Sample Trademark",
    "goodsAndServices": "Software development and consulting services"
  }'
) ON CONFLICT (id) DO NOTHING;

-- Verify the table was created and data inserted
SELECT 
  COUNT(*) as total_records,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count
FROM trademark_searches;
