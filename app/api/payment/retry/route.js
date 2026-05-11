import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { order_id } = await req.json();

  const order = await prisma.order.findUnique({
    where: {
      id: order_id,
    },
  });

  if (!order) {
    return Response.json({
      error: "Order tidak ditemukan",
    });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  try {
    const res = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(serverKey + ":").toString("base64"),
        },

        body: JSON.stringify({
          transaction_details: {
            order_id: order.id,
            gross_amount: Math.floor(
               order.totalPrice),
          },

          credit_card: {
            secure: true,
          },

          callbacks: {
            finish:
              `${process.env.NEXT_PUBLIC_BASE_URL}/order/status`,
          },
        }),
      }
    );

    const data = await res.json();

    return Response.json({
      redirect_url: data.redirect_url,
    });
  } catch (err) {
    console.error(err);

    return Response.json({
      error: "Server error",
    });
  }
}