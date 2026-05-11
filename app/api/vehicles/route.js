import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const vehicles =
      await prisma.vehicle.findMany({
        where: {
          isActive: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(
      vehicles
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error:
          "Gagal mengambil vehicle",
      },
      {
        status: 500,
      }
    );
  }
}