import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let admin;
    try {
      admin = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!admin.isAdmin) {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    }

    const user = await User.findById(params.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let admin;
    try {
      admin = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!admin.isAdmin) {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    }

    const data = await req.json();
    
    // prevent updating raw password
    if (data.password) delete data.password;

    const updatedUser = await User.findByIdAndUpdate(params.id, data, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let admin;
    try {
      admin = verifyJWT(token);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!admin.isAdmin) {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    }

    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
