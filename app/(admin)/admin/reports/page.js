// app/(admin)/admin/report/page.js

import { prisma } from "@/lib/prisma";

import {
  Truck,
  Bike,
  Car,
  Package,
  Activity,
  TrendingUp,
} from "lucide-react";

import ArmadaManagement from "@/components/admin/armada/ArmadaManagement";

export default async function AdminArmadaPage() {
  const vehicles =
    await prisma.vehicle.findMany({
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

  const totalArmada = vehicles.length;
  const motorCount = vehicles.filter(
    (v) => v.type === "MOTOR" ).length;
  const mobilCount = vehicles.filter(
    (v) => v.type === "MOBIL" ).length;
  const truckCount = vehicles.filter(
    (v) => v.type === "TRUCK" ).length;

  const statsCards = [
    {
      title: "Total Armada",
      value: totalArmada,
      icon: Package,
      color: "from-black to-gray-800",
    },
    {
      title: "Motor",
      value: motorCount,
      icon: Bike,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Mobil",
      value: mobilCount,
      icon: Car,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Truck",
      value: truckCount,
      icon: Truck,
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-5">
            <Truck size={14} />

            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Armada Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950">
            Management Armada
          </h1>

          <p className="text-gray-500 mt-3 text-base max-w-2xl">
            Kelola seluruh armada JaBarin,
            termasuk tambah, edit, dan hapus
            kendaraan dengan sistem modern.
          </p>
        </div>

        {/* SUMMARY CARD */}
        <div className=" relative overflow-hidden bg-gradient-to-br from-black to-gray-800 text-white rounded-3xl px-6 py-5 shadow-2xl min-w-[220px] " >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Total Kendaraan
          </p>

          <h3 className="text-4xl font-black mt-2">
            {totalArmada}
          </h3>

          <div className="flex items-center gap-2 mt-4 text-emerald-300 text-sm font-semibold">
            <TrendingUp size={16} />
            +12% bulan ini
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((item, idx) => (
          <div key={idx} className=" relative overflow-hidden bg-white border border-gray-200 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 " >
            {/* gradient bg */}
           <div className={` absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-2xl `} />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">
                  {item.title}
                </p>

                <h3 className="text-3xl font-black tracking-tight text-gray-950 mt-4">
                  {item.value}
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  aktif armada terdaftar
                </p>
              </div>
              
              <div className=" w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg " >
                <item.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <ArmadaManagement
        initialVehicles={vehicles}
      />
    </div>
  );
}