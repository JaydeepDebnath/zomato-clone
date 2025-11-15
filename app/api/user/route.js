import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (err) {
    console.error("GET /api/user/me error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
