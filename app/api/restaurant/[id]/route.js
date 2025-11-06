import { connectDB } from "@/lib/database";
import Restaurant from "@/models/Restaurant";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = req.url.split("/").pop();

  await connectDB();
  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    return new Response(JSON.stringify({ error: "Restaurant not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(restaurant), { status: 200 });
}
