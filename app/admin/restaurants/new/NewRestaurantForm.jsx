"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRestaurantForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", cuisine: "", location: "", rating: 0, description: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      router.push("/admin/restaurants");
    } catch (err) {
      alert("Error creating restaurant");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input className="w-full border px-3 py-2 rounded" placeholder="Cuisine" value={form.cuisine} onChange={e=>setForm({...form,cuisine:e.target.value})} />
      <input className="w-full border px-3 py-2 rounded" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
      <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <div className="flex gap-2">
        <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? "Saving..." : "Create"}</button>
        <button type="button" onClick={() => router.push("/admin/restaurants")} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
