import { environment } from "@/config/environment";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    return createBrowserClient(environment.SUPABASE_URL!, environment.SUPABASE_ANON_KEY);
}