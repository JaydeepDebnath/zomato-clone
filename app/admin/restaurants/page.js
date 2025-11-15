import AdminTable from "@/components/admin/AdminTable";
import Link from "next/link";

export default async function RestaurantsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant`, {
    cache: "no-store",
    credentials: "include",
  });

  const restaurants = await res.json();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Restaurants</h1>
        <Link href="/admin/restaurants/new" className="px-4 py-2 bg-black text-white rounded-md">
          + Add Restaurant
        </Link>
      </div>

      <AdminTable
        data={restaurants}
        columns={["Name", "Cuisine", "Location", "Rating"]}
        onView={(id) => (window.location.href = `/admin/restaurants/${id}`)}
      />
    </div>
  );
}
