"use client";
export default function AdminCard({ title, value, delta }) {
return (
<div className="p-5 bg-white rounded-2xl shadow-sm border">
<p className="text-sm text-gray-500">{title}</p>
<h4 className="text-2xl font-bold mt-2">{value}</h4>
{delta !== undefined && (
<p className={`mt-2 text-sm ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
{delta >= 0 ? `▲ ${delta}%` : `▼ ${Math.abs(delta)}%`}
</p>
)}
</div>
);
}