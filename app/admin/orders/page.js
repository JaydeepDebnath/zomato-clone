import AdminTable from "@/components/admin/AdminTable";

export default async function OrdersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    cache: "no-store",
    credentials: "include",
  });

  const orders = await res.json();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Orders</h1>

      <AdminTable
        data={orders}
        columns={["user", "restaurant", "total", "status"]}
      />
    </div>
  );
}
