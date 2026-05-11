"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Bike,
  Car,
  Truck,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CircleDollarSign,
  Package,
  User2,
} from "lucide-react";

import { useToast } from "@/hooks/useToast";

const VEHICLE_THEME = {
  motor: {
    icon: Bike,
    bg: "bg-amber-50",
    color: "text-amber-600",
    border: "border-amber-100",
  },

  mobil: {
    icon: Car,
    bg: "bg-blue-50",
    color: "text-blue-600",
    border: "border-blue-100",
  },

  truck: {
    icon: Truck,
    bg: "bg-violet-50",
    color: "text-violet-600",
    border: "border-violet-100",
  },
};

export default function OrderTable({
  initialOrders,
}) {
  const [orders, setOrders] =
    useState(initialOrders);

  const { success, error } = useToast();

  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const res = await fetch(
        `/api/admin/orders/${orderId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!res.ok)
        throw new Error(
          "Gagal update status"
        );

      setOrders(
        orders.map((o) =>
          o.id === orderId
            ? {
              ...o,
              order_status: newStatus,
            }
            : o
        )
      );

      success("Status order berhasil diperbarui");
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className="rounded-[32px] border border-black/5 bg-white shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-zinc-100 px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">
            Daftar Order
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Monitoring seluruh aktivitas
            pengiriman JaBarin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-700">
            {orders.length} Total Order
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/70">
              <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Customer
              </th>
              <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Pengiriman
              </th>
              <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Armada
              </th>
              <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Pembayaran
              </th>
              <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Status
              </th>
              {/* <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Action
              </th> */}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="popLayout">
              {orders.map((order, index) => {
                const vehicleType =
                  order.vehicle?.name
                    ?.toLowerCase();

                const vehicle =
                  VEHICLE_THEME[vehicleType] ||
                  VEHICLE_THEME.motor;

                return (
                  <motion.tr
                    key={order.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.03,
                    }}
                    className="border-b border-zinc-100 hover:bg-zinc-50/70 transition-all"
                  >
                    {/* CUSTOMER */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white font-black text-lg shadow-lg">
                          {order.customer?.name?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <User2
                              size={14}
                              className="text-zinc-400"
                            />

                            <p className="font-bold text-zinc-900">
                              {order.customer?.name}
                            </p>
                          </div>

                          <p className="text-sm text-zinc-500 mt-1">
                            {order.customer?.email}
                          </p>

                          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                            #
                            {order.id.slice(
                              0,
                              8
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ROUTE */}
                    <td className="px-8 py-6">
                      <div className="space-y-4 max-w-[320px]">
                        <div className="flex gap-3">
                          <div className="mt-1">
                            <MapPin
                              size={15}
                              className="text-emerald-500"
                            />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                              Pickup
                            </p>

                            <p className="text-sm font-medium text-zinc-700 leading-relaxed">
                              {
                                order.pickupAddress
                              }
                            </p>
                          </div>
                        </div>

                        <div className="pl-0.5">
                          <ArrowRight
                            size={15}
                            className="text-zinc-300"
                          />
                        </div>

                        <div className="flex gap-3">
                          <div className="mt-1">
                            <MapPin
                              size={15}
                              className="text-red-500"
                            />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                              Destination
                            </p>

                            <p className="text-sm font-semibold text-zinc-900 leading-relaxed">
                              {
                                order.destinationAddress
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* VEHICLE */}
                    <td className="px-8 py-6">
                      <div
                        className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-3 ${vehicle.bg} ${vehicle.border}`}
                      >
                        <vehicle.icon
                          size={18}
                          className={vehicle.color}
                        />

                        <span
                          className={`text-sm font-bold ${vehicle.color}`}
                        >
                          {order.vehicle?.name}
                        </span>
                      </div>
                    </td>

                    {/* PAYMENT */}
                    <td className="px-8 py-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CircleDollarSign
                            size={15}
                            className={
                              order.payment_status ===
                                "paid"
                                ? "text-emerald-500"
                                : "text-amber-500"
                            }
                          />

                          <span className="text-sm font-bold capitalize text-zinc-800">
                            {
                              order.payment_status
                            }
                          </span>
                        </div>

                        <p className="text-lg font-black tracking-tight text-zinc-900">
                          Rp{" "}
                          {order.totalPrice.toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-6">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${order.order_status ===
                            "selesai"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {order.order_status ===
                          "selesai" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Clock3 size={14} />
                        )}

                        {order.order_status}
                      </div>
                    </td>

                    {/* ACTION */}
                    {/* <td className="px-8 py-6 text-right">
                      {order.order_status !==
                        "selesai" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "selesai"
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-bold text-white hover:bg-black transition-all"
                          >
                            <CheckCircle2 size={16} />
                            Selesaikan
                          </button>
                        )}
                    </td> */}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}