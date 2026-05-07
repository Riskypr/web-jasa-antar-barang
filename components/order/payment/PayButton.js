"use client";

import { LoaderCircle, CreditCard } from "@/components/icons";

export default function PayButton({
  loading,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        w-full py-4 rounded-3xl font-bold text-lg
        transition-all active:scale-[0.98]
        shadow-xl shadow-gray-200
        flex items-center justify-center gap-3
        disabled:opacity-70 disabled:cursor-not-allowed
        bg-gray-900 hover:bg-black text-white
      "
    >
        
      {loading ? (
        <>
          <LoaderCircle
            size={22}
            className="animate-spin"
          />
          Memproses Pembayaran...
        </>
      ) : (
        <>
          <CreditCard size={25} />
          Bayar Sekarang
        </>
      )}
    </button>
  );
}