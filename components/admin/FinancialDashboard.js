"use client";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Bike,
  Car,
  Truck,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

const vehicleConfig = [
  {
    key: "motor",
    label: "Motor",
    icon: Bike,
    color: "bg-amber-500",
  },
  {
    key: "mobil",
    label: "Mobil",
    icon: Car,
    color: "bg-blue-500",
  },
  {
    key: "truck",
    label: "Truck",
    icon: Truck,
    color: "bg-violet-500",
  },
];

export default function FinancialDashboard({
  chartData,
  byVehicle,
  yearlyRevenue,
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* CHART */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="xl:col-span-2 bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-black text-gray-950">
              Revenue Growth
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Pendapatan bulanan selama 1 tahun terakhir.
            </p>
          </div>

          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
            <TrendingUp size={16} />
            <span className="text-xs font-bold">
              Growth +18%
            </span>
          </div>
        </div>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#111827"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#111827"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
                formatter={(value) =>
                  `Rp ${value.toLocaleString("id-ID")}`
                }
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#111827"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* VEHICLE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-black text-gray-950">
              Armada Revenue
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Distribusi pemasukan armada.
            </p>
          </div>
        </div>

        <div className="space-y-7">
          {vehicleConfig.map((item, idx) => {
            const value = byVehicle[item.key];

            const percentage = yearlyRevenue
              ? ((value / yearlyRevenue) * 100).toFixed(1)
              : 0;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white`}
                    >
                      <item.icon size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        {item.label}
                      </h4>

                      <p className="text-xs text-gray-400">
                        {percentage}% kontribusi
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-black text-gray-950">
                      Rp{" "}
                      {value.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: idx * 0.2,
                    }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INSIGHT */}
        <div className="mt-10 rounded-3xl bg-gray-950 text-white p-6 relative overflow-hidden">
          <div className="absolute -right-5 -top-5 w-28 h-28 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <ArrowUpRight size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Smart Insight
              </span>
            </div>

            <h4 className="text-xl font-black leading-tight">
              Armada Truck menghasilkan revenue tertinggi
              bulan ini.
            </h4>

            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Disarankan meningkatkan slot pengiriman
              heavy-duty untuk memaksimalkan profit.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}