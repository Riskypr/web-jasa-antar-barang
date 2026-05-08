"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function OrderChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        barGap={8}
        margin={{
          top: 10,
          right: 0,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="#E5E7EB"
        />

        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "#6B7280",
            fontSize: 12,
            fontWeight: 600,
          }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "#9CA3AF",
            fontSize: 11,
          }}
        />

        <Tooltip
          cursor={{
            fill: "#F3F4F6",
            radius: 20,
          }}
          contentStyle={{
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            background: "#ffffff",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.08)",
            fontSize: "12px",
            padding: "14px",
          }}
        />

        <Bar
          dataKey="Motor"
          fill="#111111"
          radius={[10, 10, 0, 0]}
        />

        <Bar
          dataKey="Mobil"
          fill="#6B7280"
          radius={[10, 10, 0, 0]}
        />

        <Bar
          dataKey="Truck"
          fill="#D1D5DB"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}