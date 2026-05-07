"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  X,
  MapPin,
  Navigation,
  CreditCard,
  Clock,
  Package,
} from "@/components/icons";

import {
  VEHICLE_CONFIG,
  STATUS_STYLE,
  formatTime,
} from "@/utils/history";

export default function OrderDetailModal({
  order,
  onClose,
}) {
  const { icon: Icon } =
    VEHICLE_CONFIG[order.vehicle] ||
    VEHICLE_CONFIG.Truck;

  const statusClass =
    STATUS_STYLE[order.payment_status] ||
    STATUS_STYLE.default;

  async function handleContinuePayment() {
    try {
      const res = await fetch("/api/payment/retry", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          order_id: order.id,
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err) {
      console.error(err);
      alert("Gagal melanjutkan pembayaran");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl"
      >
        {/* HEADER */}
        <div className="p-7 border-b border-gray-100 flex justify-between items-start">

          <div className="flex items-center gap-4">
            <div className="bg-gray-900 text-white p-4 rounded-2xl">
              <Icon size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Detail Pesanan
              </h2>

              <p className="text-sm text-gray-400">
                {formatTime(order.created_at)} WIB
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-7 space-y-6">

          {/* STATUS */}
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Status Pembayaran
              </p>

              <div
                className={`inline-flex px-4 py-2 rounded-full text-xs font-bold capitalize ${statusClass}`}
              >
                {order.payment_status}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">
                Status Order
              </p>

              <p className="font-bold capitalize">
                {order.order_status}
              </p>
            </div>
          </div>

          {/* ROUTE */}
          <div className="bg-gray-50 rounded-3xl p-5 space-y-5">

            <div className="flex gap-3">
              <MapPin className="text-emerald-500" />

              <div>
                <p className="text-xs text-gray-400">
                  Pickup
                </p>

                <p className="font-medium">
                  {order.pickup_address}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Navigation className="text-sky-500" />

              <div>
                <p className="text-xs text-gray-400">
                  Destination
                </p>

                <p className="font-medium">
                  {order.destination_address}
                </p>
              </div>
            </div>

          </div>

          {/* PAYMENT DETAIL */}
          <div className="space-y-4">

            <h3 className="font-bold">
              Rincian Pembayaran
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Metode Pembayaran
              </span>

              <span className="font-semibold capitalize">
                {order.payment_type || "Belum dipilih"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Total Pembayaran
              </span>

              <span className="font-bold text-lg">
                Rp {order.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Kendaraan
              </span>

              <span className="font-semibold">
                {order.vehicle}
              </span>
            </div>
          </div>

          {/* ACTION */}
          {order.payment_status === "pending" && (
            <button
              onClick={handleContinuePayment}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition"
            >
              Bayar Sekarang
            </button>
          )}
          
          {order.payment_status === "paid" && (
           <Link
              href={`/invoice/${order.id}`}
              // target="_blank"
              className="
                w-full border border-gray-900
                text-gray-900 py-4 rounded-2xl
                font-bold hover:bg-gray-100 transition
                flex items-center justify-center
              "
            >
              Cetak Bukti Pembayaran
            </Link>
        )}
        </div>
      </motion.div>
    </motion.div>
  );
}