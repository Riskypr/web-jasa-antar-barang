import { prisma } from "@/lib/prisma";
import { PAYMENT_STATUS } from "@/constants/paymentStatus";
import { ORDER_STATUS } from "@/constants/orderStatus";

export async function POST(req) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return Response.json(
        {
          error:
            "order_id wajib",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await prisma.order.findUnique({
        where: {
          id: order_id,
        },
      });

    if (!order) {
      return Response.json(
        {
          error:
            "Order tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const serverKey =
      process.env
        .MIDTRANS_SERVER_KEY;

    const res = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            "Basic " +
            Buffer.from(
              serverKey + ":"
            ).toString("base64"),
        },

        body: JSON.stringify({
          transaction_details: {
            order_id,
            gross_amount:
              order.totalPrice,
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

    const data =
      await res.json();

    if (data.error_messages) {
      return Response.json(
        {
          error:
            data.error_messages,
        },
        {
          status: 400,
        }
      );
    }

    await prisma.payment.upsert({
      where: {
        orderId: order_id,
      },

      update: {
        snapToken:
          data.token,

        paymentMethod:
          "MIDTRANS",

        status:
          PAYMENT_STATUS.PENDING,
      },

      create: {
        orderId: order_id,

        snapToken:
          data.token,

        paymentMethod:
          "MIDTRANS",

        status:
          PAYMENT_STATUS.PENDING,
      },
    });

    await prisma.order.update({
      where: {
        id: order_id,
      },

      data: {
        status:
          ORDER_STATUS.PENDING,
      },
    });

    return Response.json({
      redirect_url:
        data.redirect_url,
    });

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