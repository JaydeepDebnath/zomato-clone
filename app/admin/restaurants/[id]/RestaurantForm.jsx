"use client";

import { useState } from "react";

export default function RestaurantForm({ data, id }) {
  const [form, setForm] = useState(data);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    await fetch(`/api/restaurant/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    setLoading(false);
    alert("Restaurant updated");
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full border px-3 py-2 rounded-md"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Restaurant Name"
      />

      <input
        className="w-full border px-3 py-2 rounded-md"
        value={form.cuisine}
        onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
        placeholder="Cuisine Type"
      />

      <input
        className="w-full border px-3 py-2 rounded-md"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="Location"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
