import dynamic from "next/dynamic";
const NewRestaurantForm = dynamic(() => import("./NewRestaurantForm"), { ssr: false });

export default function NewRestaurantPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Add New Restaurant</h1>
      <NewRestaurantForm />
    </div>
  );
}
