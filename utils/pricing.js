export const ADMIN_FEE = 2000;

export function calculateVehiclePrice(
  distance,
  pricePerKm,
  basePrice
) {
  if (!distance) return 0;

  // jika dibawah 1 km
  if (distance < 1) {
    return basePrice;
  }

  return Math.round(
    distance * pricePerKm
  );
}

export function calculateTotalPrice(
  distance,
  pricePerKm,
  basePrice
) {
  return (
    calculateVehiclePrice(
      distance,
      pricePerKm,
      basePrice
    ) + ADMIN_FEE
  );
}