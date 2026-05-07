import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getPaymentState } from "@/lib/paymentStatus";

export async function POST(req) {
  try {
    // console.log("WEBHOOK HIT");

    const body = await req.json();

    // console.log("BODY:", body);

    const orderId = body.order_id;

    // console.log("ORDER ID:", orderId);

    // SIGNATURE VALIDATION
    const signatureKey = crypto
      .createHash("sha512")
      .update(
        orderId +
        body.status_code +
        body.gross_amount +
        process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    console.log("LOCAL SIGN:", signatureKey);
    console.log("MIDTRANS SIGN:", body.signature_key);

    if (signatureKey !== body.signature_key) {
      console.log("INVALID SIGNATURE");

      return Response.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    // console.log("FOUND ORDER:", existingOrder);

    if (!existingOrder) {
      return Response.json(
        {
          error: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    const statusData = getPaymentState(
      body.transaction_status
    );

    const paymentMethod =
      body.va_numbers?.[0]?.bank ||
      body.payment_type ||
      "unknown";

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        payment_status: statusData.payment_status,
        order_status: statusData.order_status,

        payment_method: paymentMethod,
        payment_type: body.payment_type,
        transaction_id: body.transaction_id,
        fraud_status: body.fraud_status || null,
      },
    });

    // console.log("UPDATED ORDER:", updatedOrder);

    return Response.json({
      success: true,
    });

  } catch (err) {
    // console.error("WEBHOOK ERROR:", err);

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