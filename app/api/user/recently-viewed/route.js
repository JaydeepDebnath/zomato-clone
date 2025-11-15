import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ recentlyViewed: user.recentlyViewed });
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { restaurantId } = await req.json();

  // ############## remove if already exists ################
  user.recentlyViewed = user.recentlyViewed.filter(id => id.toString() !== restaurantId);

  // ################## add to first position ###############
  user.recentlyViewed.unshift(restaurantId);

  // #################### last 10 items #####################
  user.recentlyViewed = user.recentlyViewed.slice(0, 10);

  await user.save();

  return NextResponse.json({
    message: "Added to recently viewed",
    recentlyViewed: user.recentlyViewed,
  });
}
