import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yorglpxmasdnpsuyfuye.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcmdscHhtYXNkbnBzdXlmdXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyODQyNDYsImV4cCI6MjAxMzg2MDI0Nn0.nuJ62-SYKtLz1pP-TChsPhIpMl2Pi6yt9dzJLurD8bg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
