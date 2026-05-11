"use client";

import { MapPin, Clock, Navigation } from "@/components/icons";
import { vehicleIcons } from "@/utils/vehicleIcons";
import { ADMIN_FEE, calculateVehiclePrice, calculateTotalPrice, } from "@/utils/pricing";

export default function OrderCard({
  distance,
  duration,
  pickupAddress,
  destinationAddress,
  onPay,
  vehicle,
  paymentStatus,
}) {

  if (!vehicle) {
    return (
      <div className="bg-white rounded-2xl p-5 border text-center text-sm text-gray-500">
        Pilih armada terlebih dahulu
      </div>
    );
  }

  const Icon =
    vehicle
      ? vehicleIcons[vehicle.type]
      : null;

const harga = distance
  ? calculateTotalPrice(
      distance,
      vehicle.pricePerKm,
      vehicle.basePrice
    )
  : 0;



  return (
    <div className="bg-white rounded-2xl p-5 ">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Detail Order
          </h3>
          <p className="text-xs text-gray-400">
            Cek kembali sebelum pembayaran
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-gray-100 px-3 py-1.5 rounded-full">
          {Icon && (
            <Icon
              size={14}
              className="text-gray-600"
            />
          )}
          <span className="text-gray-700 font-medium">
            {vehicle.name}
          </span>
        </div>
      </div>

      <div className="space-y-4 text-sm mb-5">

        {/* PICKUP */}
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <MapPin size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Jemput</p>
            <p className="text-gray-800 line-clamp-2">
              {pickupAddress || "-"}
            </p>
          </div>
        </div>

        {/* DESTINATION */}
        <div className="flex items-start gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <Navigation size={14} className="text-red-600" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Tujuan</p>
            <p className="text-gray-800 line-clamp-2">
              {destinationAddress || "-"}
            </p>
          </div>
        </div>

      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-5">

        <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
          <Navigation size={16} className="text-gray-500" />
          <div>
            <p className="text-gray-400 text-xs">Jarak</p>
            <p className="text-gray-700 font-medium">
              {distance ? distance.toFixed(2) : "-"} km
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <div>
            <p className="text-gray-400 text-xs">Durasi</p>
            <p className="text-gray-700 font-medium">
              {duration ? duration.toFixed(0) : "-"} menit
            </p>
          </div>
        </div>

      </div>

      {/*  HARGA */}
      <div className="mb-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            Estimasi Pembayaran
          </p>
          <h2 className="text-xl font-bold text-gray-900">
            Rp {harga.toLocaleString("id-ID")}
          </h2>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={onPay}
        className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Pesan Sekarang
      </button>
    </div>
  );
}