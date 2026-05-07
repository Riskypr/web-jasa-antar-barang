import { Bike, Car, Truck } from "@/components/icons";

export const VEHICLE_CONFIG = {
  Motor: { icon: Bike, bg: "/gmap/g-map-sampit.png" },
  Mobil: { icon: Car, bg: "/gmap/g-map-pky.png" },
  Truck: { icon: Truck, bg: "/gmap/g-map-banjarmasin.png" },
};

export const STATUS_STYLE = {
  paid: "bg-emerald-50 text-emerald-600 border border-emerald-100/50",
  pending: "bg-yellow-50 text-yellow-600 border border-yellow-100/50",
  failed: "bg-red-50 text-red-600 border border-red-100/50",
  default: "bg-gray-50 text-gray-600 border border-gray-100/50",
};

export const formatGroupDate = (date) => {
  const today = new Date();
  const d = new Date(date);
  if (d.toDateString() === today.toDateString()) return "Hari ini";
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Kemarin";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

export const formatTime = (date) => 
  new Date(date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });