import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";

export async function GET(req, { params }) {
  await connectDB();

  const city = params.name;
  const list = await Restaurant.find({ location: city });

  return NextResponse.json(list);
}
