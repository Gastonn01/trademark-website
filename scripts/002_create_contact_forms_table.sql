-- Create table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_form_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  form_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_form_submissions(created_at);
