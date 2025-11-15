"use client";
import { useEffect, useState } from "react";

export default function AdminTable({
  endpoint,
  columns = [],
  pageSize = 10,
  initialSearch = "",
  onView,
  renderRowValue, // optional fn (row, col) => jsx
}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, limit: pageSize });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${endpoint}?search=${encodeURIComponent(search)}&page=${meta.page}&limit=${meta.limit}`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!ignore) {
          setData(json.data || json);
          setMeta(json.meta || { page: 1, pages: 1, total: json.length || 0, limit: meta.limit });
        }
      } catch (err) {
        console.error("AdminTable fetch error", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => (ignore = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, search, meta.page, meta.limit]);

  function goPage(p) {
    setMeta((m) => ({ ...m, page: Math.max(1, Math.min(m.pages || 1, p)) }));
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setMeta((m) => ({ ...m, page: 1 })); }}
          placeholder="Search..."
          className="border rounded-md px-3 py-2 w-64"
        />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Page</span>
          <button disabled={meta.page<=1} onClick={()=>goPage(meta.page-1)} className="px-2 py-1 border rounded">Prev</button>
          <span>{meta.page} / {meta.pages || 1}</span>
          <button disabled={meta.page>= (meta.pages || 1)} onClick={()=>goPage(meta.page+1)} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => <th key={c} className="text-left px-4 py-3">{c}</th>)}
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length+1} className="p-8 text-center">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length+1} className="p-8 text-center text-gray-500">No results</td></tr>
            ) : data.map((row) => (
              <tr key={row._id} className="border-t hover:bg-gray-50">
                {columns.map((col, i) => (
                  <td key={col} className="px-4 py-3">
                    {renderRowValue ? renderRowValue(row, col, i) : (row[col.toLowerCase()] ?? Object.values(row)[i] ?? "-")}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  {onView && <button onClick={()=>onView(row._id)} className="px-3 py-1 border rounded">View</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Showing {data.length} of {meta.total} results
      </div>
    </div>
  );
}