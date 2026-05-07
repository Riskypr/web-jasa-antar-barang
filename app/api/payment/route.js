import { prisma } from "@/lib/prisma";
import { PAYMENT_STATUS } from "@/constants/paymentStatus";
import { ORDER_STATUS } from "@/constants/orderStatus";

export async function POST(req) {
  try {
    const { amount, order_id } = await req.json();

    if (!amount || !order_id) {
      return Response.json(
        { error: "Amount & order_id wajib" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!order) {
      return Response.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

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
            order_id,
            gross_amount: Math.floor(amount),
          },

          credit_card: {
            secure: true,
          },

          callbacks: {
            finish: `${process.env.NEXT_PUBLIC_BASE_URL}/order/status`,
            pending: `${process.env.NEXT_PUBLIC_BASE_URL}/order/status`,
            error: `${process.env.NEXT_PUBLIC_BASE_URL}/order/status`,
          },
        }),
      }
    );

    const data = await res.json();

    if (data.error_messages) {
      return Response.json(
        {
          error: data.error_messages,
        },
        { status: 400 }
      );
    }

    // SAVE PAYMENT DATA
    await prisma.order.update({
      where: {
        id: order_id,
      },

      data: {
        snap_token: data.token,
        // redirect_url: data.redirect_url,

        payment_status: PAYMENT_STATUS.PENDING,
        order_status: ORDER_STATUS.WAITING_PAYMENT,
      },
    });

    return Response.json({
      redirect_url: data.redirect_url,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Server error",
      },
      { status: 500 }
    );
  }
}