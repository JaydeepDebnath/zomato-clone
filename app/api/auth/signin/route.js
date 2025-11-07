import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import { signJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = signJWT({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,},
      process.env.JWT_SECRET,
      { expiresIn:"7d" }
    );

    const response = NextResponse.json({ message: "Signed in successfully" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, 
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Sign in error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
