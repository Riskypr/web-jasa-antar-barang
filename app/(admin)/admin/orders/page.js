import { prisma } from "@/lib/prisma";
import OrderTable from "@/components/admin/tables/OrderTable";

import {
  PackageCheck,
  Clock3,
  CircleDollarSign,
  Package,
  TrendingUp,
} from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const stats = {
    total: orders.length,

    pending: orders.filter(
      (o) => o.order_status === "menunggu"
    ).length,

    completed: orders.filter(
      (o) => o.order_status === "selesai"
    ).length,

    revenue: orders
      .filter((o) => o.payment_status === "paid")
      .reduce((acc, curr) => acc + curr.price, 0),
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8 md:p-10 text-white">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-xl">
              <Package size={14} />
              Order Management
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.06em] leading-none">
              Kelola Seluruh
              <br />
              Order JaBarin
            </h1>

            <p className="mt-5 max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed">
              Pantau status pengiriman, pembayaran,
              aktivitas order, dan performa armada
              secara realtime.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                Total Revenue
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight">
                Rp{" "}
                {stats.revenue.toLocaleString("id-ID")}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                Order Aktif
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight">
                {stats.pending}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-bold">
                Total Order
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">
                {stats.total}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
              <Package
                size={24}
                className="text-zinc-900"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-amber-100 bg-amber-50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-bold">
                Menunggu
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight text-amber-700">
                {stats.pending}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <Clock3
                size={24}
                className="text-amber-700"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-bold">
                Selesai
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight text-emerald-700">
                {stats.completed}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <PackageCheck
                size={24}
                className="text-emerald-700"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-blue-600 font-bold">
                Pendapatan
              </p>

              <h3 className="mt-4 text-2xl font-black tracking-tight text-blue-700">
                Rp{" "}
                {stats.revenue.toLocaleString("id-ID")}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <TrendingUp
                size={24}
                className="text-blue-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <OrderTable initialOrders={orders} />
    </div>
  );
}