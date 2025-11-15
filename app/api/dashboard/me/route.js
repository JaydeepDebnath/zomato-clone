import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import Order from "@/models/Order";
import Restaurant from "@/models/Restaurant";
import { verifyJWT } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ##### VERIFY TOKEN ####
    let decoded;
    try {
      decoded = verifyJWT(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id).lean();
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    const orders = await Order.find({ user: user._id })
      .populate("restaurant", "name image rating")
      .sort({ createdAt: -1 })
      .lean();

    // #### BUILD DASHBOARD STATS ####
    const stats = {
      totalOrders: orders.length,
      totalFavorites: user.favorites?.length || 0,
      totalRecentlyViewed: user.recentlyViewed?.length || 0,
      totalAddresses: user.addresses?.length || 0,
    };

    // #### GET FAVORITE RESTAURANTS DETAILS #####
    const favoriteRestaurants = await Restaurant.find({
      _id: { $in: user.favorites || [] },
    })
      .select("name cuisine rating image location")
      .lean();

    // ----- GET RECENTLY VIEWED RESTAURANTS -----
    const recentlyViewedRestaurants = await Restaurant.find({
      _id: { $in: user.recentlyViewed || [] },
    })
      .select("name cuisine rating image location")
      .lean();

    // #### RESPONSE #####
    return NextResponse.json({
      message: "Dashboard data loaded",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        isAdmin: user.isAdmin,
        addresses: user.addresses,
        createdAt: user.createdAt,
      },
      stats,
      orders,
      favoriteRestaurants,
      recentlyViewedRestaurants,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
