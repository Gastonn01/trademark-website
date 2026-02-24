-- Create table for discount signups
CREATE TABLE IF NOT EXISTS discount_signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_discount_email ON discount_signups(email);
CREATE INDEX IF NOT EXISTS idx_discount_created_at ON discount_signups(created_at);
