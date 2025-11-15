export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="h-48 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
      </div>
    </div>
  );
}
