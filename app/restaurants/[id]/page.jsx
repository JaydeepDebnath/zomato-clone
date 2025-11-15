import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";
import { verifyJWT } from "@/lib/auth";

export async function GET(req, { params }) {
  await connectDB();
  const item = await Restaurant.findById(params.id);
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let user;
  try {
    user = verifyJWT(token);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!user.isAdmin) {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }

  const body = await req.json();
  const updated = await Restaurant.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = verifyJWT(token);
  if (!user.isAdmin) return NextResponse.json({ message: "Admin only" }, { status: 403 });

  await Restaurant.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
