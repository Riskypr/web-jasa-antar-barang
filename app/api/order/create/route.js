import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {
  ADMIN_FEE,
  calculateVehiclePrice,
  calculateTotalPrice,
} from "@/utils/pricing";

export async function POST(req) {
  try {
    // const cookieStore = cookies();
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

    // ambil vehicle dari DB (biar dapet ID + harga asli)
    const vehicle =
      await prisma.vehicle.findUnique({
        where: {
          id: body.vehicleId,
        },
      });

    if (!vehicle) {
      return Response.json({ error: "Vehicle tidak ditemukan" }, { status: 404 });
    }

    const servicePrice =
  calculateVehiclePrice(
    Number(body.distance),
    vehicle.pricePerKm,
    vehicle.basePrice
  );

const totalPrice =
  calculateTotalPrice(
    Number(body.distance),
    vehicle.pricePerKm,
    vehicle.basePrice
  );

const distancePrice =
  Math.max(
    0,
    servicePrice -
      vehicle.basePrice
  );

const order =
  await prisma.order.create({
    data: {
      customerId: decoded.userId,
      vehicleId: vehicle.id,
      pickupAddress: body.pickupAddress,
      destinationAddress: body.destinationAddress,
      distance: Number(body.distance),
      duration: Number(body.duration),
      // harga minimum armada
      basePrice: vehicle.basePrice,
      // tambahan jarak
      distancePrice,
      // FINAL TOTAL
      totalPrice,

      status: "PENDING",
    },
  });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Gagal simpan order" },
      { status: 500 }
    );
  }
}