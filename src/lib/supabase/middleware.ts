import { environment } from "@/config/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const cookieStore = await cookies();
    const {SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY} = environment;
    return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({name, value, options}) => {
                        cookieStore.set(name, value, options);
                    });
                } catch {
                    console.error("Error setting cookies", cookiesToSet);
                }
            }
        },
    });
}