import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        vehicle: body.vehicle,
        pickup_address: body.pickup_address,
        destination_address: body.destination_address,
        distance: body.distance,
        duration: body.duration,
        price: body.price,
        userId: decoded.userId,
      },
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Gagal simpan order" }, { status: 500 });
  }
}