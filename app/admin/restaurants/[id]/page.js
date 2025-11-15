import RestaurantForm from "./RestaurantForm";

export default async function RestaurantEdit({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${params.id}`, {
    cache: "no-store",
    credentials: "include",
  });

  const restaurant = await res.json();

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-6">Edit Restaurant</h1>
      <RestaurantForm data={restaurant} id={params.id} />
    </div>
  );
}
