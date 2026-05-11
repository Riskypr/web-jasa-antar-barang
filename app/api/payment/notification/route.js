import crypto from "crypto";

import { prisma } from "@/lib/prisma";

import {
  getPaymentState,
} from "@/lib/paymentStatus";

export async function POST(req) {
  try {
    const body = await req.json();

    const orderId =
      body.order_id;

    // VALIDASI SIGNATURE
    const signatureKey =
      crypto
        .createHash("sha512")
        .update(
          orderId +
          body.status_code +
          body.gross_amount +
          process.env
            .MIDTRANS_SERVER_KEY
        )
        .digest("hex");

    if (
      signatureKey !==
      body.signature_key
    ) {
      return Response.json(
        {
          error:
            "Invalid signature",
        },
        {
          status: 403,
        }
      );
    }

    // CEK ORDER
    const existingOrder =
      await prisma.order.findUnique({
        where: {
          id: orderId,
        },

        include: {
          payment: true,
        },
      });

    if (!existingOrder) {
      return Response.json(
        {
          error:
            "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    // AMBIL STATUS
    const statusData =
      getPaymentState(
        body.transaction_status
      );

    // PAYMENT METHOD
    const paymentMethod =
      body.va_numbers?.[0]
        ?.bank ||
      body.payment_type ||
      "unknown";

    // UPDATE PAYMENT
    await prisma.payment.update({
      where: {
        orderId: orderId,
      },

      data: {
        status:
          statusData.payment_status,

        paymentMethod:
          paymentMethod,

        transactionId:
          body.transaction_id,

        fraudStatus:
          body.fraud_status ||
          null,
      },
    });

    // UPDATE ORDER
    await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status:
          statusData.order_status,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}