import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedApiRoute = 
    pathname.startsWith("/api/") && 
    !pathname.startsWith("/api/auth/") &&
    !pathname.startsWith("/api/services"); // Public API example

  if (isDashboardRoute || isAdminRoute || isProtectedApiRoute) {
    if (!token) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
      // Clear invalid token cookie and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }

    // Role-based Access Control
    if (isAdminRoute && payload.role !== "admin") {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isDashboardRoute && payload.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Prevent logged-in users from accessing login/register pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    const payload = await verifyToken(token);
    if (payload) {
      if (payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg).*)',
  ],
};
