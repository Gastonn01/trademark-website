-- Create table for trademark registration submissions
CREATE TABLE IF NOT EXISTS trademark_registrations (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  razon_social VARCHAR(255),
  tipo_titular VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  cuit VARCHAR(50),
  dni VARCHAR(50),
  representante_legal VARCHAR(255),
  direccion TEXT,
  ciudad VARCHAR(100),
  provincia VARCHAR(100),
  codigo_postal VARCHAR(20),
  nombre_marca VARCHAR(255) NOT NULL,
  tipo_marca VARCHAR(50),
  productos_servicios TEXT,
  logo_file_name VARCHAR(255),
  clases_seleccionadas TEXT[],
  plan VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_trademark_email ON trademark_registrations(email);
CREATE INDEX IF NOT EXISTS idx_trademark_plan ON trademark_registrations(plan);
CREATE INDEX IF NOT EXISTS idx_trademark_created_at ON trademark_registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_trademark_marca ON trademark_registrations(nombre_marca);
