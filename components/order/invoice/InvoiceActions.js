"use client";
import { useRouter } from "next/navigation";

export default function InvoiceActions() {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-3 mb-6 print:hidden">

      <button
        onClick={() => router.back()}
        className="
          px-5 py-3 rounded-2xl
          bg-white border border-slate-200
          hover:bg-slate-50
          text-sm font-semibold
          transition-all
        "
      >
        Kembali
      </button>

      <button
        onClick={() => window.print()}
        className="
          px-5 py-3 rounded-2xl
          bg-gray-800 text-white
          hover:opacity-90
          text-sm font-semibold
          transition-all
        "
      >
        Cetak Invoice
      </button>

    </div>
  );
}