import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";
// Ensure this matches exactly with what you set in your Server Action
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-me";

export function proxy(request: NextRequest) {
  // Renamed from proxy
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // 1. Protect /admin routes (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session || !session.includes(SESSION_SECRET)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. Prevent logged-in users from seeing the login page
  if (pathname === "/admin/login") {
    if (session && session.includes(SESSION_SECRET)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
