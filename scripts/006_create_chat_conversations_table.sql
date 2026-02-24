-- Create table for chat conversations
CREATE TABLE IF NOT EXISTS chat_conversations (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  messages JSONB NOT NULL,
  user_email TEXT,
  needs_agent BOOLEAN DEFAULT FALSE,
  has_repetitive_questions BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster session lookups
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_needs_agent ON chat_conversations(needs_agent);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at);
