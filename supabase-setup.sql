-- One-time setup for a fresh Supabase project. Run once in the SQL Editor.
-- Replaces the old dead project's schema; matches exactly what
-- lib/supabase.ts writes and components/admin-panel.tsx reads.

create table if not exists public.trademark_searches (
  id uuid primary key default gen_random_uuid(),
  trademark_name text,
  email text,
  name text,
  surname text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_results jsonb not null default '{}'::jsonb,
  table_type text not null default 'trademark_searches',
  form_type text,
  estimated_price numeric,
  files_count integer,
  selected_countries jsonb,
  selected_classes jsonb,
  trademark_type text,
  contact_phone text,
  marketing_consent boolean
);

create index if not exists trademark_searches_status_idx on public.trademark_searches (status);
create index if not exists trademark_searches_created_at_idx on public.trademark_searches (created_at);
create index if not exists trademark_searches_table_type_idx on public.trademark_searches (table_type);

-- Verify
select column_name, data_type from information_schema.columns
where table_schema = 'public' and table_name = 'trademark_searches'
order by ordinal_position;
