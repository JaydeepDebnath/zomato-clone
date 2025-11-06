"use client";

import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";

export async function GET(req) {
  const cityName = decodeURIComponent(req.url.split("/").pop());
  await connectDB();

  const restaurants = await Restaurant.find({ location: cityName });

  return new Response(JSON.stringify(restaurants), { status: 200 });
}
