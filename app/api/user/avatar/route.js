import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function PUT(req) {
  await connectDB();
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { avatar } = await req.json();
  if (!avatar) return NextResponse.json({ message: "Avatar missing" }, { status: 400 });

  user.avatar = avatar;
  await user.save();

  return NextResponse.json({ message: "Avatar updated", avatar });
}
