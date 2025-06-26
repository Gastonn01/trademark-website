-- First, let's verify the database structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'trademark_searches'
ORDER BY ordinal_position;

-- Check if we have any actual data
SELECT COUNT(*) as total_records FROM trademark_searches;

-- Show sample data structure
SELECT id, email, trademark_name, status, created_at, notes
FROM trademark_searches 
LIMIT 5;
