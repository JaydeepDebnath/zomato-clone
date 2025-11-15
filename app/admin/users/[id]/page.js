import dynamic from "next/dynamic";
const AdminUserEditor = dynamic(() => import("./AdminUserEditor"), { ssr: false });

export default function UserEditPage({ params }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
      <AdminUserEditor userId={params.id} />
    </div>
  );
}
