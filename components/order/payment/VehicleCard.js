"use client";

import { Bike, Car, Truck } from "@/components/icons";

const VehicleIcon = {
  Motor: Bike,
  Mobil: Car,
  Truck: Truck,
};

export default function VehicleCard({ vehicle }) {
  const Icon = VehicleIcon[vehicle] || Car;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Jasa Transportasi
        </span>

        <span className="bg-blue-50 text-gray-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase">
          Terpilih
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="bg-gray-900 p-4 rounded-2xl text-white">
          <Icon size={32} />
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900">
            {vehicle}
          </h3>

          <p className="text-sm text-gray-500 font-medium">
            Layanan Pengiriman Standar
          </p>
        </div>
      </div>
    </div>
  );
}