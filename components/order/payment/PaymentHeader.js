"use client";

import { ArrowLeft } from "@/components/icons";

export default function PaymentHeader({ onBack, loading }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={onBack}
        disabled={loading}
        className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 disabled:opacity-50"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-xl font-bold text-gray-900">
        Konfirmasi Pembayaran
      </h1>
    </div>
  );
}