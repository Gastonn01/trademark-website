-- Crear tabla para aplicaciones de agentes
CREATE TABLE IF NOT EXISTS agent_applications (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  matricula VARCHAR(100) NOT NULL,
  colegio VARCHAR(200) NOT NULL,
  experiencia VARCHAR(50) NOT NULL,
  especialidades TEXT[] NOT NULL,
  ubicacion VARCHAR(200) NOT NULL,
  capacidad VARCHAR(50) NOT NULL,
  tarifas TEXT,
  comentarios TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_aplicacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notas_internas TEXT
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_agent_applications_email ON agent_applications(email);
CREATE INDEX IF NOT EXISTS idx_agent_applications_estado ON agent_applications(estado);
CREATE INDEX IF NOT EXISTS idx_agent_applications_fecha ON agent_applications(fecha_aplicacion);

-- Agregar comentarios a la tabla
COMMENT ON TABLE agent_applications IS 'Aplicaciones de agentes de marcas que quieren unirse a la plataforma';
COMMENT ON COLUMN agent_applications.estado IS 'Estados: pendiente, aprobado, rechazado, en_revision';
COMMENT ON COLUMN agent_applications.especialidades IS 'Array de especialidades del agente';
