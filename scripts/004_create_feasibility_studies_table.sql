-- Create table for feasibility study requests
CREATE TABLE IF NOT EXISTS feasibility_studies (
  id SERIAL PRIMARY KEY,
  marca VARCHAR(255) NOT NULL,
  productos TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feasibility_email ON feasibility_studies(email);
CREATE INDEX IF NOT EXISTS idx_feasibility_created_at ON feasibility_studies(created_at);
CREATE INDEX IF NOT EXISTS idx_feasibility_marca ON feasibility_studies(marca);
