import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // For edge runtime compatibility

export function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // ✅ List of public routes (no auth required)
  const publicRoutes = ["/", "/login", "/signup"];

  // ✅ Bypass auth check for public routes, static files, or Next.js internals
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // ✅ Use `request.cookies.get()` to read cookies in middleware
  const token = request.cookies.get("jwtToken")?.value;

  // ✅ If token not found, redirect to /login
  if (!token) {
    console.log("token doesnot exist")
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Match all routes except static files
};
