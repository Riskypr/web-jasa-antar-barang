export const ADMIN_FEE = 2000;

export function calculateVehiclePrice(distance, vehiclePrice) {
  return Math.round(distance * vehiclePrice);
}

export function calculateTotalPrice(distance, vehiclePrice) {
  return calculateVehiclePrice(distance, vehiclePrice) + ADMIN_FEE;
}