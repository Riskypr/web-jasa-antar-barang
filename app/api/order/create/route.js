import { prisma } from "@/lib/prisma";
import { connect } from "node:http2";

export async function POST(req) {
  try {
    const body = await req.json();
    
    if (!body.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.create({
      data: {
        vehicle: body.vehicle,
        pickup_address: body.pickup_address,
        destination_address: body.destination_address,
        distance: body.distance,
        duration: body.duration,
        price: body.price,
        userId: body.userId,
      },
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Gagal simpan order" }, { status: 500 });
  }
}