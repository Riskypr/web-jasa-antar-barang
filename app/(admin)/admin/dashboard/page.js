export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  ArrowUpRight,
  Activity,
} from "lucide-react";

import StatsCard from "@/components/admin/cards/StatsCard";
import OrderChart from "@/components/admin/charts/OrderChart";

export default async function AdminDashboard() {
  const currentYear =
    new Date().getFullYear();

  const orders = await prisma.order.findMany({
    where: {
      payment: {
        status: "PAID",
      },

      createdAt: {
        gte: new Date(`${currentYear}-01-01`),
        lte: new Date(`${currentYear}-12-31`),
      },
    },

    select: {
      createdAt: true,

      vehicle: {
        select: {
          name: true,
          type: true,
          pricePerKm: true,
        },
      },
    },
  });

  const [
    totalCustomer,
    activeDrivers,
    completedOrders,
    revenueData,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.user.count({
      where: {
        role: "DRIVER",
      },
    }),

    prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.order.aggregate({
      where: {
        payment: {
          status: "PAID",
        },
      },

      _sum: {
        totalPrice: true,
      },
    }),
  ]);

  const recentLogs =
    await prisma.activityLog.findMany({
      take: 6,

      orderBy: {
        createdAt: "desc",
      },
    });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const chartData = months.map(
    (month, index) => {

      const monthlyOrders =
        orders.filter(
          (o) =>
            new Date(
              o.createdAt
            ).getMonth() === index
        );

      return {
        name: month,

        Motor: monthlyOrders.filter(
          (o) =>
            o.vehicle?.type === "MOTOR"
        ).length,

        Mobil: monthlyOrders.filter(
          (o) =>
            o.vehicle?.type === "MOBIL"
        ).length,

        Truck: monthlyOrders.filter(
          (o) =>
            o.vehicle?.type === "TRUCK"
        ).length,
      };
    }
  );

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section
        className="
          relative overflow-hidden
          rounded-[36px]
          bg-gradient-to-br from-black via-gray-900 to-gray-800
          p-8 md:p-10 text-white
          shadow-2xl
        "
      >
        <div
          className="
            absolute -top-20 -right-20
            w-72 h-72 rounded-full
            bg-white/5 blur-3xl
          "
        />

        <div className="relative z-10">
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/10 border border-white/10
              text-xs font-bold uppercase tracking-[0.2em]
            "
          >
            <Activity size={14} />
            Live Analytics
          </div>

          <div
            className="
              mt-6 flex flex-col
              lg:flex-row lg:items-end
              justify-between gap-8
            "
          >
            <div>
              <h1
                className="
                  text-4xl md:text-6xl
                  font-black tracking-tight
                  leading-none
                "
              >
                Dashboard
              </h1>

              <p
                className="
                  mt-5 text-gray-400
                  max-w-2xl text-sm md:text-base
                "
              >
                Pantau performa operasional,
                pemasukan, aktivitas admin,
                dan seluruh transaksi JaBarin
                secara real-time.
              </p>
            </div>

            <div
              className="
                bg-white/10 border border-white/10
                rounded-3xl p-6
                backdrop-blur-xl
                min-w-[260px]
              "
            >
              <p className="text-sm text-gray-400">
                Total Revenue
              </p>

              <h2
                className="
                  mt-3 text-4xl
                  font-black tracking-tight
                "
              >
                Rp{" "}
                {(
                  revenueData._sum.totalPrice || 0
                ).toLocaleString("id-ID")}
              </h2>

              <div
                className="
                  mt-5 flex items-center gap-2
                  text-emerald-400 text-sm font-semibold
                "
              >
                <ArrowUpRight size={16} />
                +18% dari bulan lalu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="
          grid grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <StatsCard
          title="Total Pelanggan"
          value={totalCustomer}
          icon="users"
          subtitle="User aktif"
        />

        <StatsCard
          title="Total Driver"
          value={activeDrivers}
          icon="truck"
          subtitle="Driver tersedia"
        />

        <StatsCard
          title="Order Selesai"
          value={completedOrders}
          icon="shopping"
          subtitle="Transaksi berhasil"
        />

        <StatsCard
          title="Pemasukan"
          value={`Rp ${(
            revenueData._sum.totalPrice || 0
          ).toLocaleString("id-ID")}`}
          icon="dollar"
          subtitle="Revenue keseluruhan"
          isBlack
        />
      </section>

      {/* CONTENT */}
      <section
        className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* CHART */}
        <div
          className="
            xl:col-span-2
            bg-white rounded-[32px]
            border border-gray-200/70
            p-7 md:p-8
            shadow-sm
          "
        >
          <div
            className="
              flex items-center justify-between
              mb-10
            "
          >
            <div>
              <h3
                className="
                  text-2xl font-black
                  tracking-tight
                "
              >
                Volume Armada
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Statistik pengiriman tahunan
              </p>
            </div>

            <div
              className="
                px-4 py-2 rounded-2xl
                bg-gray-100
                text-xs font-bold
                uppercase tracking-widest
              "
            >
              {currentYear}
            </div>
          </div>

          <div className="h-[380px]">
            <OrderChart data={chartData} />
          </div>
        </div>

        {/* ACTIVITY */}
        <div
          className="
            bg-white rounded-[32px]
            border border-gray-200/70
            p-7 md:p-8
            shadow-sm
          "
        >
          <div
            className="
              flex items-center justify-between
              mb-8
            "
          >
            <div>
              <h3
                className="
                  text-2xl font-black
                  tracking-tight
                "
              >
                Aktivitas
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Riwayat terbaru admin
              </p>
            </div>

            <div
              className="
                w-12 h-12 rounded-2xl
                bg-gray-100
                flex items-center justify-center
              "
            >
              <Activity size={20} />
            </div>
          </div>

          <div className="space-y-6">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="
                  flex gap-4
                  group
                "
              >
                <div
                  className="
                    flex flex-col items-center
                  "
                >
                  <div
                    className="
                      w-3 h-3 rounded-full
                      bg-black
                    "
                  />

                  <div
                    className="
                      w-[2px] flex-1
                      bg-gray-200 mt-2
                    "
                  />
                </div>

                <div className="pb-6">
                  <p
                    className="
                      font-semibold text-sm
                      text-gray-800
                    "
                  >
                    {log.details}
                  </p>

                  <p
                    className="
                      mt-2 text-xs
                      text-gray-400
                    "
                  >
                    {new Date(
                      log.createdAt
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}