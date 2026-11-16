-- Migration: Create admin_users table
-- Created: 2026-11-16

CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON public.admin_users
  FOR ALL USING (false);

-- Insert the owner admin
INSERT INTO public.admin_users (email, name, role)
  VALUES ('suren.genaiarchitect@gmail.com', 'Suren Murugesan', 'super_admin')
  ON CONFLICT DO NOTHING;
