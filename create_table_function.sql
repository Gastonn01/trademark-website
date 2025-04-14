-- Ejecuta este script en el SQL Editor de Supabase

-- Crear una función RPC para crear la tabla
CREATE OR REPLACE FUNCTION create_trademark_searches_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Crear la tabla si no existe
  CREATE TABLE IF NOT EXISTS public.trademark_searches (
    id UUID PRIMARY KEY,
    form_type TEXT NOT NULL,
    search_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL
  );
  
  -- Añadir comentarios a la tabla
  COMMENT ON TABLE public.trademark_searches IS 'Tabla para almacenar las solicitudes de búsqueda de marcas';
  
  -- Añadir índices para mejorar el rendimiento
  CREATE INDEX IF NOT EXISTS trademark_searches_status_idx ON public.trademark_searches (status);
  CREATE INDEX IF NOT EXISTS trademark_searches_created_at_idx ON public.trademark_searches (created_at);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating table: %', SQLERRM;
    RETURN FALSE;
END;
$$;
