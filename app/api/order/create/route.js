import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔥 ambil user dari cookie
    const decoded = getUserFromRequest(req);

    if (!decoded) {
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
        userId: decoded.userId, // 🔥 dari token
      },
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Gagal simpan order" }, { status: 500 });
  }
}