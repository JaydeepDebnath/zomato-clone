import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";
import { verifyJWT } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const data = await Restaurant.find();
  return NextResponse.json(data);
}

export async function POST(req) {
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
  const restaurant = await Restaurant.create(body);

  return NextResponse.json(restaurant, { status: 201 });
}
