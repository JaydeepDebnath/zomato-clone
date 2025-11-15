"use client";
import AdminTable from "@/components/admin/AdminTable";
import { useRouter } from "next/navigation";

export default function RestaurantsPageClient() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Restaurants</h1>
        <button onClick={()=>router.push('/admin/restaurants/new')} className="px-4 py-2 bg-black text-white rounded">Add Restaurant</button>
      </div>

      <AdminTable
        endpoint="/api/restaurant"
        columns={["Name", "cuisine", "location", "rating"]}
        pageSize={10}
        onView={(id)=>router.push(`/admin/restaurants/${id}`)}
      />
    </div>
  );
}
