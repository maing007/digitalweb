import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { tenantMiddleware } from "@/lib/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    const tenantCheck = await tenantMiddleware(request);
    if (tenantCheck.status === 403) return tenantCheck;
    return NextResponse.next({ request });
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/", "/api/:path*", "/((?!api|_next/_next|images|fonts|.*\\..*).*)"],
};
