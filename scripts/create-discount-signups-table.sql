-- Create discount_signups table for storing promotional email signups
CREATE TABLE IF NOT EXISTS discount_signups (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_discount_signups_email ON discount_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_discount_signups_created_at ON discount_signups(created_at);

-- Add unique constraint on email to prevent duplicates
ALTER TABLE discount_signups ADD CONSTRAINT unique_discount_email UNIQUE (email);
