export async function createOrder(data) {
  const res = await fetch("/api/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Gagal membuat order");
  }

  return result;
}