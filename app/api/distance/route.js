export async function POST(req) {
  const { from, to } = await req.json();

  const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`;

  const res = await fetch(url);
  const data = await res.json();

  const route = data.routes[0];

  const distance = route.distance / 1000; // km
  const duration = route.duration / 60; // menit

  return Response.json({ distance, duration });
}