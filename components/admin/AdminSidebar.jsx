"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
const path = usePathname();

const items = [
{ href: "/admin", label: "Dashboard", icon: "🏠" },
{ href: "/admin/restaurants", label: "Restaurants", icon: "🍽️" },
{ href: "/admin/orders", label: "Orders", icon: "📦" },
{ href: "/admin/users", label: "Users", icon: "👥" },
];

return (
<aside className="w-72 bg-white border-r min-h-screen p-6 flex flex-col">
<div className="mb-8">
<h2 className="text-xl font-bold">Partner Panel</h2>
<p className="text-sm text-gray-500 mt-1">Admin Console</p>
</div>

<nav className="flex-1">
<ul className="space-y-1">
{items.map((it) => (
<li key={it.href}>
<Link
href={it.href}
className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition
${path === it.href ? "bg-gray-100 font-semibold" : "text-gray-700"}`}
>
<span className="text-lg">{it.icon}</span>
<span>{it.label}</span>
</Link>
</li>
))}
</ul>
</nav>

<div className="mt-6">
<button className="w-full px-4 py-2 bg-red-600 text-white rounded-md">Sign out</button>
</div>
</aside>
);
}