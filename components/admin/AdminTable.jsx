"use client";
import { useEffect, useRef } from "react";

export default function AdminChart({ title, data = [] }) {
const ref = useRef(null);

useEffect(() => {
const canvas = ref.current;
if (!canvas || !data.length) return;
const ctx = canvas.getContext("2d");
const w = canvas.width = canvas.clientWidth * devicePixelRatio;
const h = canvas.height = canvas.clientHeight * devicePixelRatio;
ctx.clearRect(0, 0, w, h);

const max = Math.max(...data.map((d) => d.value || d));
const min = Math.min(...data.map((d) => d.value || d));

ctx.beginPath();
data.forEach((d, i) => {
const val = d.value ?? d;
const x = (i / (data.length - 1 || 1)) * w;
const y = h - ((val - min) / (max - min || 1)) * h;
if (i === 0) ctx.moveTo(x, y);
else ctx.lineTo(x, y);
});
ctx.strokeStyle = '#1f2937';
ctx.lineWidth = 2 * devicePixelRatio;
ctx.stroke();
}, [data]);

return (
<div className="p-5 bg-white rounded-2xl border shadow-sm">
<p className="text-sm text-gray-500">{title}</p>
<div className="mt-4 h-48">
<canvas ref={ref} className="w-full h-full" />
</div>
</div>
);
}
