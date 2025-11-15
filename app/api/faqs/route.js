import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
// import FAQ from "@/models/FAQ";
import { verifyJWT } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const faqs = await FAQ.find();
  return NextResponse.json(faqs);
}

export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = verifyJWT(token);
  if (!user.isAdmin) {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }

  const data = await req.json();
  const faq = await FAQ.create(data);

  return NextResponse.json(faq, { status: 201 });
}
