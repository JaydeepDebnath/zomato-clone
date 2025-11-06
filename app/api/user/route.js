import { connectDB } from "@/lib/database";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newUser = await User.create(data);
  return new Response(JSON.stringify(newUser), { status: 201 });
}
