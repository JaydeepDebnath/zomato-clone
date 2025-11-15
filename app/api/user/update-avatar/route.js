import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let user;
    try {
      user = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { avatar } = await req.json();
    if (!avatar) {
      return NextResponse.json({ message: "Avatar URL required" }, { status: 400 });
    }

    const updated = await User.findByIdAndUpdate(
      user.id,
      { avatar },
      { new: true }
    ).select("-password");

    return NextResponse.json(updated);

  } catch (err) {
    console.error("Avatar update error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
