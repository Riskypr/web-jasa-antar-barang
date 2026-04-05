export async function POST(req) {
  const { amount } = await req.json();

  // Validate amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return Response.json({
      error: "Invalid amount. Amount must be a positive number.",
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
            order_id: "ORDER-" + Date.now(),
            gross_amount: Math.floor(amount),
          },
          credit_card: {
            secure: true,
          },
        }),
      }
    );

    const data = await res.json();

    // console.log("MIDTRANS RESPONSE:", data);
    // console.log(serverKey);

    // 🔥 HANDLE ERROR
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