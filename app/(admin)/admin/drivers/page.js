export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import DriverTable from "@/components/admin/tables/DriverTable";

import {
  Truck,
  Bike,
  Car,
  Activity,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default async function AdminDriversPage() {
  const drivers = await prisma.user.findMany({
    where: {
      role: "DRIVER",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      driverProfile: true,

      _count: {
        select: {
          driverOrders: true,
        },
      },
    },
  });

  // MOCK ARMADA DISTRIBUTION
  const motorCount = Math.ceil(
    drivers.length * 0.4
  );

  const mobilCount = Math.ceil(
    drivers.length * 0.35
  );

  const truckCount =
    drivers.length -
    motorCount -
    mobilCount;

  return (
    <div>
      {/* HERO */}
      <div
        className="
          relative overflow-hidden
          rounded-[36px]
          border border-black/5
          bg-white
          p-8 md:p-10
          shadow-sm mb-8
        "
      >
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/70 via-white to-white" />

        <div className="absolute -right-24 -top-24 w-72 h-72 bg-black/[0.03] rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-black text-white
                text-[11px]
                font-bold
                tracking-[0.2em]
                uppercase
                mb-6
              "
            >
              <Truck size={14} />
              Driver Management
            </div>

            <h1
              className="
                text-4xl md:text-5xl
                font-black
                tracking-[-0.04em]
                leading-none
              "
            >
              Kelola Driver &
              <br />
              Armada JaBarin.
            </h1>

            <p className="mt-5 text-gray-500 leading-relaxed max-w-xl">
              Pantau performa driver, aktivitas
              pengiriman, serta manajemen armada
              pengantaran barang secara realtime.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full xl:w-auto">
            {/* TOTAL */}
            <div
              className="
                bg-zinc-50 border border-black/5
                rounded-3xl p-5 min-w-[170px]
              "
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="
                    w-12 h-12 rounded-2xl
                    bg-black text-white
                    flex items-center justify-center
                  "
                >
                  <Truck size={20} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Driver
                </span>
              </div>

              <h2 className="text-3xl font-black">
                {drivers.length}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Total Driver
              </p>
            </div>

            {/* ACTIVE */}
            <div
              className="
                bg-black text-white
                rounded-3xl p-5 min-w-[170px]
              "
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="
                    w-12 h-12 rounded-2xl
                    bg-white/10
                    flex items-center justify-center
                  "
                >
                  <Activity size={20} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Active
                </span>
              </div>

              <h2 className="text-3xl font-black">
                {Math.floor(drivers.length * 0.8)}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Driver Aktif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <DriverTable initialDrivers={drivers} />
    </div>
  );
}