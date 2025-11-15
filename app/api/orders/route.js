import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Order from "@/models/Order";
import { verifyJWT } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = verifyJWT(token);

  if (user.isAdmin) {
    const orders = await Order.find().populate("user").populate("restaurant");
    return NextResponse.json(orders);
  }

  const orders = await Order.find({ user: user.id }).populate("restaurant");
  return NextResponse.json(orders);
}

export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = verifyJWT(token);

  const body = await req.json();

  const newOrder = await Order.create({
    ...body,
    user: user.id
  });

  return NextResponse.json(newOrder, { status: 201 });
}
