import { createPayment } from "@/services/api";

export async function createOrderPayment(amount, orderId) {
  const res = await createPayment(amount, orderId);

  if (!res?.data?.redirect_url) {
    throw new Error("Gagal membuat pembayaran");
  }

  return res.data.redirect_url;
}