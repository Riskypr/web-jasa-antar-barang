import { prisma } from "@/lib/prisma";
import FinancialDashboard from "@/components/admin/FinancialDashboard";
import {
  Wallet,
  TrendingUp,
  CircleDollarSign,
  Activity,
} from "lucide-react";

export default async function AdminReportsPage() {
  const now = new Date();

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const orders = await prisma.order.findMany({
    where: {
      payment_status: "paid",
      created_at: {
        gte: startOfYear,
      },
    },
    select: {
      price: true,
      vehicle: true,
      created_at: true,
    },
  });

  // =========================
  // REVENUE STATS
  // =========================

  const dailyRevenue = orders
    .filter((o) => o.created_at >= startOfDay)
    .reduce((acc, curr) => acc + curr.price, 0);

  const monthlyRevenue = orders
    .filter((o) => o.created_at >= startOfMonth)
    .reduce((acc, curr) => acc + curr.price, 0);

  const yearlyRevenue = orders.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  const totalTransactions = orders.length;

  // =========================
  // MONTHLY CHART
  // =========================

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

  const monthlyChart = months.map((month, index) => {
    const revenue = orders
      .filter(
        (o) => new Date(o.created_at).getMonth() === index
      )
      .reduce((acc, curr) => acc + curr.price, 0);

    return {
      month,
      revenue,
    };
  });

  // =========================
  // VEHICLE REVENUE
  // =========================

  const byVehicle = {
    motor: orders
      .filter((o) => o.vehicle.toLowerCase() === "motor")
      .reduce((acc, curr) => acc + curr.price, 0),

    mobil: orders
      .filter((o) => o.vehicle.toLowerCase() === "mobil")
      .reduce((acc, curr) => acc + curr.price, 0),

    truck: orders
      .filter((o) => o.vehicle.toLowerCase() === "truck")
      .reduce((acc, curr) => acc + curr.price, 0),
  };

  const statsCards = [
    {
      title: "Pendapatan Hari Ini",
      value: `Rp ${dailyRevenue.toLocaleString("id-ID")}`,
      icon: Wallet,
    },
    {
      title: "Pendapatan Bulan Ini",
      value: `Rp ${monthlyRevenue.toLocaleString("id-ID")}`,
      icon: TrendingUp,
    },
    {
      title: "Pendapatan Tahun Ini",
      value: `Rp ${yearlyRevenue.toLocaleString("id-ID")}`,
      icon: CircleDollarSign,
    },
    {
      title: "Total Transaksi",
      value: totalTransactions,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Financial Overview
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950">
            Financial Analytics
          </h1>

          <p className="text-gray-500 mt-3 text-base max-w-2xl">
            Pantau performa pendapatan JaBarin secara realtime
            berdasarkan transaksi, armada, dan pertumbuhan bisnis.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
            Last Update
          </p>

          <h3 className="text-sm font-bold text-gray-900 mt-1">
            {now.toLocaleString("id-ID")}
          </h3>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-[30px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">
                  {item.title}
                </p>

                <h3 className="text-2xl font-black tracking-tight text-gray-950 mt-4">
                  {item.value}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <item.icon
                  size={26}
                  className="text-gray-900"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DASHBOARD */}
      <FinancialDashboard
        chartData={monthlyChart}
        byVehicle={byVehicle}
        yearlyRevenue={yearlyRevenue}
      />
    </div>
  );
}