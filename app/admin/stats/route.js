import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { verifyJWT } from "@/lib/auth";
import Order from "@/models/Order";
import User from "@/models/User";
import Restaurant from "@/models/Restaurant";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let auth;
    try { auth = verifyJWT(token); } catch { return NextResponse.json({ message: "Invalid token" }, { status: 401 }); }
    if (!auth.isAdmin) return NextResponse.json({ message: "Admin only" }, { status: 403 });

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();

    const startOfToday = new Date(); startOfToday.setHours(0,0,0,0);
    const ordersToday = await Order.countDocuments({ createdAt: { $gte: startOfToday } });

    // ############## Growth ############
    const now = new Date();
    const sevenAgo = new Date(Date.now() - 7*24*60*60*1000);
    const fourteenAgo = new Date(Date.now() - 14*24*60*60*1000);

    const ordersLast7 = await Order.countDocuments({ createdAt: { $gte: sevenAgo } });
    const ordersPrev7 = await Order.countDocuments({ createdAt: { $gte: fourteenAgo, $lt: sevenAgo } });
    const orderGrowth = ordersPrev7 === 0 ? 100 : Math.round(((ordersLast7 - ordersPrev7) / ordersPrev7) * 100);

    //################# Weekly graph ############
    const graph = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(); dayStart.setHours(0,0,0,0); dayStart.setDate(dayStart.getDate() - i);
      const dayEnd = new Date(dayStart); dayEnd.setDate(dayStart.getDate() + 1);
      const count = await Order.countDocuments({ createdAt: { $gte: dayStart, $lt: dayEnd } });
      graph.push({ date: dayStart.toISOString().slice(0,10), value: count });
    }

    return NextResponse.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRestaurants,
        ordersToday,
        orderGrowth,
      },
      graph, // [{date, value}, ...]
    });
  } catch (err) {
    console.error("admin/stats error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
