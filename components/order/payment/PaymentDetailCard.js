"use client";

import { CreditCard, Info } from "@/components/icons";
import { formatPrice } from "@/utils/format";

export default function PaymentDetailCard({
  vehicle,
  price,
  adminFee,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">

      <div className="absolute top-0 right-0 p-4">
        <CreditCard size={40} className="text-gray-50" />
      </div>

      <h2 className="text-sm font-bold text-gray-800 mb-4">
        Rincian Pembayaran
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 text-xs">
            Biaya Layanan ({vehicle})
          </span>

          <span className="font-bold text-gray-800">
            {formatPrice(price)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 text-xs">
            Biaya Aplikasi
          </span>

          <span className="font-bold text-gray-800">
            {formatPrice(adminFee)}
          </span>
        </div>

        <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">
            Total Bayar
          </span>

          <span className="text-2xl font-bold text-gray-800">
            {formatPrice(price + adminFee)}
          </span>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 p-4 rounded-2xl flex gap-3">
        <Info size={18} className="text-amber-600 mt-0.5" />

        <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
          Pastikan pesanan sudah benar sebelum membayar.
        </p>
      </div>
    </div>
  );
}