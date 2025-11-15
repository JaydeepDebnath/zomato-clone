import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ addresses: user.addresses });
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  user.addresses.push(body);
  await user.save();

  return NextResponse.json({ message: "Address added", addresses: user.addresses });
}

export async function PUT(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index, updatedAddress } = body;

  if (user.addresses[index]) {
    user.addresses[index] = updatedAddress;
    await user.save();
  }

  return NextResponse.json({ message: "Address updated", addresses: user.addresses });
}

export async function DELETE(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { index } = body;

  user.addresses.splice(index, 1);
  await user.save();

  return NextResponse.json({ message: "Address removed", addresses: user.addresses });
}
