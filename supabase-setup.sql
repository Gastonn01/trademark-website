-- Ejecuta este script en el SQL Editor de Supabase

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS trademark_searches (
  id UUID PRIMARY KEY,
  form_type TEXT NOT NULL,
  search_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL
);

-- Verificar que la tabla se creó correctamente
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public'
  AND table_name = 'trademark_searches'
);
