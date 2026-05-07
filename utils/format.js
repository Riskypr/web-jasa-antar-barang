export function formatDistance(distance) {
  return Number(distance).toFixed(1).replace(".0", "");
}

export function formatPrice(price) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}