import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let userData;
    try {
      userData = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const changes = await req.json();
    delete changes.email;
    delete changes.password;
    delete changes.isAdmin;

    const updatedUser = await User.findByIdAndUpdate(userData.id, changes, {
      new: true,
    }).select("-password");

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
