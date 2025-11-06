
export async function GET() {
  const faqs = [
    { id: 1, title: "Order Online", infos: "Stay home and order to your doorstep" },
    { id: 2, title: "Nightlife", infos: "Explore the city's top nightlife outlets" },
    { id: 3, title: "Dining", infos: "View the city's favourite venues" },
  ];

  return new Response(JSON.stringify(faqs), { status: 200 });
}
