import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const supabaseSecret =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Supabase URL belum diisi. Gunakan NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_URL."
  );
}

if (!supabaseSecret) {
  throw new Error(
    "Supabase secret belum diisi. Gunakan SUPABASE_SERVICE_ROLE_KEY atau SUPABASE_SECRET_KEY."
  );
}

export const supabaseServer = createClient(supabaseUrl, supabaseSecret, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
