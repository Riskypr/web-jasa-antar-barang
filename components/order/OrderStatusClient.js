"use client";

import { useSearchParams, useRouter } from "next/navigation";

import {
  CheckCircle,
  Clock3,
  CircleX,
  Package,
  AlertTriangle,
} from "@/components/icons";

import { MIDTRANS_STATUS } from "@/constants/midtransStatus";

export default function OrderStatusClient() {
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("order_id");
  const status = params.get("transaction_status");

  const statusConfig = {
    success: {
      title: "Pembayaran Berhasil",
      description: "Pesanan kamu sedang diproses 🚚",
      icon: <CheckCircle size={70} className="text-green-500" />,
      bg: "bg-green-50",
      button: "bg-green-600 hover:bg-green-700",
    },

    pending: {
      title: "Menunggu Pembayaran",
      description:
        "Pembayaran belum selesai. Silakan lanjutkan pembayaran.",
      icon: <Clock3 size={70} className="text-yellow-500" />,
      bg: "bg-yellow-50",
      button: "bg-yellow-500 hover:bg-yellow-600",
    },

    failed: {
      title: "Pembayaran Gagal",
      description:
        "Pembayaran gagal atau telah dibatalkan.",
      icon: <CircleX size={70} className="text-red-500" />,
      bg: "bg-red-50",
      button: "bg-red-500 hover:bg-red-600",
    },

    default: {
      title: "Status Pembayaran",
      description:
        "Terjadi perubahan status pembayaran.",
      icon: <AlertTriangle size={70} className="text-gray-500" />,
      bg: "bg-gray-50",
      button: "bg-gray-800 hover:bg-black",
    },
  };

  // DETECT TYPE
  let config = statusConfig.default;

  // SUCCESS
  if (
    status === MIDTRANS_STATUS.SETTLEMENT ||
    status === MIDTRANS_STATUS.CAPTURE
  ) {
    config = statusConfig.success;
  }

  // PENDING
  else if (status === MIDTRANS_STATUS.PENDING) {
    config = statusConfig.pending;
  }

  // FAILED
  else if (
    status === MIDTRANS_STATUS.DENY ||
    status === MIDTRANS_STATUS.CANCEL ||
    status === MIDTRANS_STATUS.EXPIRE ||
    status === MIDTRANS_STATUS.FAILURE
  ) {
    config = statusConfig.failed;
  }

  return (
    <main className={`min-h-screen flex items-center justify-center px-4 ${config.bg}`}>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          {config.icon}
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-900">
          {config.title}
        </h1>

        {/* DESC */}
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          {config.description}
        </p>

        {/* ORDER INFO */}
        <div className="mt-6 bg-gray-50 border rounded-2xl p-4 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Order ID
            </span>

            <span className="font-semibold text-gray-800">
              {orderId || "-"}
            </span>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span className="text-gray-500">
              Status
            </span>

            <span className="font-semibold uppercase text-gray-800">
              {status || "-"}
            </span>
          </div>
        </div>

        {/* ACTION */}
        <div className="mt-6 space-y-3">

          <button
            onClick={() => router.push("/order/history")}
            className={`w-full text-white py-3 rounded-2xl font-semibold transition ${config.button}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package size={18} />
              Lihat Pesanan
            </div>
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border border-gray-300 py-3 rounded-2xl font-medium hover:bg-gray-50 transition"
          >
            Kembali ke Beranda
          </button>

        </div>
      </div>
    </main>
  );
}