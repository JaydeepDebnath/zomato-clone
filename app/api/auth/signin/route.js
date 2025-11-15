import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with defaults from the updated model
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: "",              // default empty
      bio: "",
      phone: "",
      role: "user",
      isAdmin: false,

      // dashboard-related fields:
      addresses: [],
      favorites: [],
      recentlyViewed: [],

      createdAt: new Date(),
    });

    // Create JWT payload
    const token = signJWT(
      {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        bio: newUser.bio,
        phone: newUser.phone,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
        addresses: newUser.addresses,
        favorites: newUser.favorites,
        recentlyViewed: newUser.recentlyViewed,
        createdAt: newUser.createdAt,
      },
    });

    // Set auth cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
