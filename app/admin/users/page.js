import AdminTable from "@/components/admin/AdminTable";

export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    cache: "no-store",
    credentials: "include",
  });

  const users = await res.json();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Users</h1>

      <AdminTable
        data={users}
        columns={["name", "email", "role"]}
      />
    </div>
  );
}
