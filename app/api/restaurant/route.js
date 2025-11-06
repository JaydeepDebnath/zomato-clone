"use client";

import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";

export async function GET() {
  await connectDB();
  const restaurants = await Restaurant.find();
  return new Response(JSON.stringify(restaurants), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newRestaurant = await Restaurant.create(data);
  return new Response(JSON.stringify(newRestaurant), { status: 201 });
}
