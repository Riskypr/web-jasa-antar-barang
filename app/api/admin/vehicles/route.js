import { NextResponse } from "next/server";

import {prisma} from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const vehicle =
      await prisma.vehicle.create({
        data: {
          name: body.name,

          type: body.type,

          description:
            body.description || null,

          icon: body.icon || null,

          basePrice: Number(
            body.basePrice
          ),

          pricePerKm: Number(
            body.pricePerKm
          ),

          maxWeight:
            body.maxWeight
              ? Number(
                  body.maxWeight
                )
              : null,

          isActive:
            body.isActive ?? true,
        },
      });

    return NextResponse.json(
      vehicle,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal menambahkan armada",
      },
      {
        status: 500,
      }
    );
  }
}