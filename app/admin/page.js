import AdminCard from "@/components/admin/AdminCard";
import AdminChart from "@/components/admin/AdminChart";

export default async function AdminPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stats`, {
    cache: "no-store",
    credentials: "include",
  });

  const { stats, graph } = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Total Users" value={stats.totalUsers} delta={stats.userGrowth} />
        <AdminCard title="Total Orders" value={stats.totalOrders} delta={stats.orderGrowth} />
        <AdminCard title="Total Restaurants" value={stats.totalRestaurants} delta={stats.restaurantGrowth} />
      </div>

      {/* Chart */}
      <AdminChart title="Daily Orders Trend" data={graph} />
    </div>
  );
}
