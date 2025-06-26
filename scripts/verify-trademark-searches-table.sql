-- Check if the trademark_searches table exists and show its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'trademark_searches'
ORDER BY ordinal_position;

-- Show sample data if any exists
SELECT 
    id,
    email,
    trademark_name,
    status,
    created_at,
    CASE 
        WHEN search_results IS NOT NULL THEN 'Has search_results'
        ELSE 'No search_results'
    END as has_results
FROM trademark_searches 
ORDER BY created_at DESC 
LIMIT 5;

-- Count total records
SELECT COUNT(*) as total_records FROM trademark_searches;
