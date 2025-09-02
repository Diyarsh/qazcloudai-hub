import { createClient } from '@supabase/supabase-js'

// These values are automatically provided by Lovable when using the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a client with fallback for when env vars are not set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)