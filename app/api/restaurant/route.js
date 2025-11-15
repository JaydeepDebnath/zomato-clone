import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";
import { verifyJWT } from "@/lib/auth";

export async function GET() {
  {
    await connectDB();

    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(url.searchParams.get("limit") || "10"));
    const sortBy = url.searchParams.get("sort") || "-createdAt";

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { cuisine: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Restaurant.countDocuments(filter);
    const restaurants = await Restaurant.find(filter)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      data: restaurants,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  }
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
