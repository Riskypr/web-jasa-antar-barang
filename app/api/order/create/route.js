import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        vehicle: body.vehicle,
        pickup_address: body.pickup_address,
        destination_address: body.destination_address,
        distance: body.distance,
        duration: body.duration,
        price: body.price,
      },
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Gagal simpan order" }, { status: 500 });
  }
}