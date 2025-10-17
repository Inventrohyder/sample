/**
 * Supabase Client Configuration
 * Singleton instance for accessing Supabase services
 *
 * Environment variables (required):
 * - EXPO_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - EXPO_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon/public API key
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Validate environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.\n" +
      "Required variables:\n" +
      "- EXPO_PUBLIC_SUPABASE_URL\n" +
      "- EXPO_PUBLIC_SUPABASE_ANON_KEY\n\n" +
      "Copy .env.example to .env and add your credentials from:\n" +
      "https://supabase.com/dashboard/project/_/settings/api",
  );
}

/**
 * Supabase client instance
 * Provides type-safe access to database, auth, storage, and realtime
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist auth session in async storage (for React Native)
    storage: undefined, // Will add AsyncStorage later if needed
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
