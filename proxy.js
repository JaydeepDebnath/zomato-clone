import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

// Everything here runs on Edge
export const config = {
  matcher: ["/admin/:path*", "/api/restaurant", "/api/restaurant/:path*"],
};

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // No token → not authenticated
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await verifyJWT(token);

    // Block route if user is not admin
    if (req.nextUrl.pathname.startsWith("/admin") && !user.isAdmin) {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    }

    // Allow request to continue
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
