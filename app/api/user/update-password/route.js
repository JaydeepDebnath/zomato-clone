import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";
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

    const { oldPassword, newPassword } = await req.json();

    const found = await User.findById(user.id);
    const match = await bcrypt.compare(oldPassword, found.password);
    if (!match) {
      return NextResponse.json({ message: "Old password incorrect" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    found.password = hashed;
    await found.save();

    return NextResponse.json({ message: "Password updated" }, { status: 200 });

  } catch (err) {
    console.error("Password update error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
