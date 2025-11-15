import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ favorites: user.favorites });
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { restaurantId } = await req.json();
  if (!restaurantId) return NextResponse.json({ message: "Missing ID" }, { status: 400 });

  if (!user.favorites.includes(restaurantId)) {
    user.favorites.push(restaurantId);
    await user.save();
  }

  return NextResponse.json({ message: "Added to favorites", favorites: user.favorites });
}

export async function DELETE(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { restaurantId } = await req.json();

  user.favorites = user.favorites.filter(id => id.toString() !== restaurantId);
  await user.save();

  return NextResponse.json({ message: "Removed from favorites", favorites: user.favorites });
}
