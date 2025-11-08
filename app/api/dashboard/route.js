import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (!email && !name) {
      return NextResponse.json(
        { error: "Please provide an email or name parameter" },
        { status: 400 }
      );
    }

    const query = {};
    if (email) query.email = email;
    if (name) query.name = { $regex: new RegExp(name, "i") };

    const users = await User.find(query)
      .select("_id name email isAdmin")
      .lean();

    if (!users.length) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Dashboard search API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
