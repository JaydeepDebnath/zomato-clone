import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
export async function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  if (url.startsWith("/dashboard") || url.startsWith("/api/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      verifyJWT(token); 
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid or expired token:", err.message);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
