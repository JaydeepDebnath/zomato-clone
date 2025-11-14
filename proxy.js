import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

// MUST be named "proxy", NOT "middleware"
export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;

  // Protect dashboard & API routes
  if (url.startsWith("/dashboard") || url.startsWith("/api/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    try {
      verifyJWT(token);
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid or expired token:", err.message);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

// MUST include matcher for proxy
export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
