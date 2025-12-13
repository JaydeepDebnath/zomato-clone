export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import FAQ from "@/models/FAQ";

// Public endpoint: no auth
export async function GET() {
  await connectDB();
  const faqs = await FAQ.find().lean();
  return NextResponse.json(faqs);
}
