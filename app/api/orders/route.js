import { connectDB } from "@/lib/database";
import Order from "@/models/Order";

export async function GET() {
  await connectDB();
  const orders = await Order.find().populate("user").populate("restaurant");
  return new Response(JSON.stringify(orders), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newOrder = await Order.create(data);
  return new Response(JSON.stringify(newOrder), { status: 201 });
}
