import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return Response.json(orders);
}