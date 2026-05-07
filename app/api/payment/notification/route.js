import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getPaymentState } from "@/lib/paymentStatus";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("MIDTRANS BODY:", body);
    const orderId = body.order_id;

    // VALIDATE SIGNATURE
    const signatureKey = crypto
      .createHash("sha512")
      .update(
        orderId +
        body.status_code +
        body.gross_amount +
        process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (signatureKey !== body.signature_key) {
      return Response.json(
        {
          error: "Invalid signature",
        },
        {
          status: 403,
        }
      );
    }

    // PAYMENT STATUS MAPPING
    const statusData = getPaymentState(
      body.transaction_status
    );

    // PAYMENT METHOD DETECTION
    const paymentMethod =
      body.va_numbers?.[0]?.bank ||
      body.payment_type ||
      "unknown";

    // UPDATE ORDER
    await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        payment_status: statusData.payment_status,
        order_status: statusData.order_status,

        payment_method: paymentMethod,
        payment_type: body.payment_type,

        transaction_id: body.transaction_id,

        // OPTIONAL EXTRA DATA
        fraud_status: body.fraud_status || null,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error("MIDTRANS WEBHOOK ERROR:", err);

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