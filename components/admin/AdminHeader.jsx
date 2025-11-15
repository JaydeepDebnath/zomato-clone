"use client";
import { useState } from "react";

export default function AdminHeader() {
const [q, setQ] = useState("");

return (
<header className="flex items-center justify-between border-b p-4 bg-white">
<div className="flex items-center gap-4">
<h3 className="text-lg font-semibold">Admin</h3>
<div className="hidden md:block">
<input
value={q}
onChange={(e) => setQ(e.target.value)}
placeholder="Search restaurants, orders, users..."
className="border rounded-md px-3 py-2 w-80"
/>
</div>
</div>

<div className="flex items-center gap-4">
<button className="text-sm px-3 py-2 rounded-md hover:bg-gray-100">Docs</button>
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">AD</div>
</div>
</div>
</header>
);
}