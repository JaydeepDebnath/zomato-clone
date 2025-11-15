import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    const token = signJWT(
      {
        id : newUser._id,
        name : newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // console.log("Token : ", token)
   const response = NextResponse.json({ message: "Registered successfully" }, { status: 200 });

    response.cookies.set("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV="production",
      sameSite: process.env.NODE_ENV="production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60,
      path:"/"
    })

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
