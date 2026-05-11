"use client";

import { MapPin, Navigation } from "@/components/icons";
import { formatDistance } from "@/utils/format";

export default function RouteCard({
  pickup,
  destination,
  distance,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-6">
        Detail Rute
      </span>

      <div className="relative space-y-8">

        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-gray-200"></div>

        <div className="flex gap-4 relative z-10">
          <div className="bg-gray-800 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-emerald-50">
            <MapPin size={12} className="text-white" />
          </div>

          <div className="flex-1">
            <p className="text-[12px] font-bold text-gray-500">
              Titik Jemput
            </p>

            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {pickup}
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative z-10">
          <div className="bg-gray-900 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-indigo-50">
            <Navigation size={12} className="text-white" />
          </div>

          <div className="flex-1">
            <p className="text-[12px] font-bold text-gray-500">
              Tujuan Pengiriman
            </p>

            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {destination}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between">
        <span className="text-gray-400 font-medium">
          Estimasi Jarak
        </span>

        <span className="font-bold text-gray-900">
          {formatDistance(distance)} km
        </span>
      </div>
    </div>
  );
}