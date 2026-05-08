export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import UserTable from "@/components/admin/tables/UserTable";

import {
  Search,
  Users,
  UserCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  const totalOrders = users.reduce(
    (acc, user) => acc + user._count.orders,
    0
  );

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] border border-black/5 bg-white p-8 md:p-10 shadow-sm">
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/80 via-white to-white" />

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-black/[0.03] rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              <Sparkles size={14} />
              Customer Management
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-black leading-none">
              Kelola Pelanggan
              <br />
              JaBarin.
            </h1>

            <p className="mt-5 text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              Pantau aktivitas pelanggan, jumlah order,
              serta kelola data pengguna dengan tampilan
              dashboard yang modern dan profesional.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto">
            <div className="bg-zinc-50 border border-black/5 rounded-3xl p-5 min-w-[180px]">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                  <Users size={20} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Total
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                {users.length}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Pelanggan
              </p>
            </div>

            <div className="bg-zinc-50 border border-black/5 rounded-3xl p-5 min-w-[180px]">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Orders
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                {totalOrders}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Total Pesanan
              </p>
            </div>

            <div className="bg-black text-white rounded-3xl p-5 min-w-[180px]">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <UserCheck size={20} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Active
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                {users.filter((u) => u._count.orders > 0).length}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Pelanggan Aktif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white border border-black/5 rounded-[28px] p-4 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Cari nama pelanggan, email, atau nomor telepon..."
            className="
              w-full h-14 rounded-2xl
              border border-black/5
              bg-zinc-50
              pl-14 pr-5
              text-sm
              outline-none
              focus:border-black
              transition-all
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <UserTable initialUsers={users} />
    </div>
  );
}