import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({ children }) {
  const token = cookies().get("token")?.value;

  if (!token) redirect("/signin");

  let user;
  try {
    user = verifyJWT(token);
  } catch {
    redirect("/signin");
  }

  // Only admins can enter this area
  if (!user.isAdmin) {
    redirect("/dashboard"); // redirect normal users to user dashboard
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
