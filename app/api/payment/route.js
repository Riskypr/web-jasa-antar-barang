export async function POST(req) {
  const { amount, order_id } = await req.json();

  if (!amount || !order_id) {
    return Response.json({
      error: "Amount & order_id wajib",
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
            "Basic " + Buffer.from(serverKey + ":").toString("base64"),
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: order_id, //  Pastikan order_id unik untuk setiap transaksi
            gross_amount: Math.floor(amount),
          },
          credit_card: {
            secure: true,
          },

    
          callbacks: {
            finish: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success`,
          },
        }),
      }
    );

    const data = await res.json();

    if (data.error_messages) {
      return Response.json({
        error: data.error_messages,
      });
    }

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
