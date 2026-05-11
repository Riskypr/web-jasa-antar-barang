import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")
        ?.value;

    if (!token) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch {
      return Response.json(
        {
          error:
            "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    const orders =
      await prisma.order.findMany({
        where: {
          customerId:
            decoded.userId,
        },

        include: {
          vehicle: true,

          payment: true,

          driver: {
            select: {
              id: true,
              name: true,
              phone: true,
              avatar: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(
      orders
    );

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error:
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}