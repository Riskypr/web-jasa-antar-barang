import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  console.log("CALLBACK:", body);

  const orderId = body.order_id;
  const status = body.transaction_status;

  if (status === "settlement") {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        payment_status: "paid",
        order_status: "diproses",
      },
    });
  }

  return Response.json({ success: true });
}