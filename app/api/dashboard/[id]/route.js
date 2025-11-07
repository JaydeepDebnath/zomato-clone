import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    console.log("Requested user ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const user = await User.findById(id)
      .select("_id name email isAdmin")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Dashboard [id] API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
