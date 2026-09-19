import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet, _headers) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, { ...options });
            });
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const tenantId = request.cookies.get("tenant_id")?.value;
      if (!tenantId) {
        const { data: tenants } = await supabase.from("tenants").select("id").limit(1);
        if (tenants && tenants.length > 0) {
          response.cookies.set("tenant_id", tenants[0].id, {
            path: "/",
            httpOnly: true,
          });
        }
      }
    }
  } catch (e) {
    // Silent — proxy.ts handles session refresh
  }

  return response;
}
