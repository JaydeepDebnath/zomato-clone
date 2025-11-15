"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUserEditor({ userId }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/user/${userId}`, { credentials: "include" })
      .then(r=>r.json())
      .then(data => { if(mounted) setUser(data); })
      .finally(()=>mounted && setLoading(false));
    return ()=>mounted=false;
  }, [userId]);

  async function save() {
    setSaving(true);
    await fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user.name, role: user.role, isAdmin: user.isAdmin }),
      credentials: "include",
    });
    setSaving(false);
    alert("Saved");
    router.push("/admin/users");
  }

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="space-y-4">
      <input className="w-full border px-3 py-2 rounded" value={user.name} onChange={e=>setUser({...user, name: e.target.value})} />
      <input className="w-full border px-3 py-2 rounded" value={user.email} disabled />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={user.isAdmin} onChange={(e)=>setUser({...user,isAdmin:e.target.checked})} />
          Is Admin
        </label>
        <select value={user.role||"user"} onChange={(e)=>setUser({...user,role:e.target.value})} className="border rounded px-2 py-1">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button onClick={save} disabled={saving} className="px-4 py-2 bg-black text-white rounded">{saving ? "Saving..." : "Save"}</button>
        <button onClick={()=>router.push("/admin/users")} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </div>
  );
}
