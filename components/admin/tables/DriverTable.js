"use client";

import { useState } from "react";

import {
  Bike,
  Car,
  Truck,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  ShieldCheck,
  Activity,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const VEHICLE_MAP = {
  MOTOR: {
    label: "Motor",
    icon: Bike,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },

  MOBIL: {
    label: "Mobil",
    icon: Car,
    bg: "bg-sky-100",
    color: "text-sky-600",
  },

  TRUCK: {
    label: "Truck",
    icon: Truck,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
};

export default function DriverTable({
  initialDrivers,
}) {
  const [drivers] =
    useState(initialDrivers);

  return (
    <div
      className="
        bg-white
        border border-black/5
        rounded-[32px]
        overflow-hidden
        shadow-sm
      "
    >
      {/* HEADER */}
      <div
        className="
          px-8 py-6
          border-b border-black/5
          flex items-center justify-between
        "
      >
        <div>
          <h3 className="text-2xl font-black tracking-tight">
            Driver JaBarin
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Daftar seluruh pekerja dan armada
            pengiriman.
          </p>
        </div>

        <div
          className="
            hidden md:flex items-center gap-2
            px-4 py-2 rounded-2xl
            bg-zinc-100 text-xs font-bold
          "
        >
          {drivers.length} Driver
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-black/5">
              <th className="px-8 py-5 text-left text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Driver
              </th>

              <th className="px-8 py-5 text-left text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Kontak
              </th>

              <th className="px-8 py-5 text-left text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Armada
              </th>

              <th className="px-8 py-5 text-left text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Order
              </th>

              <th className="px-8 py-5 text-left text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Status
              </th>

              <th className="px-8 py-5 text-center text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {drivers.map((driver, index) => {
                // MOCK VEHICLE
                const type =
                  index % 3 === 0
                    ? "TRUCK"
                    : index % 2 === 0
                    ? "MOBIL"
                    : "MOTOR";

                const vehicle =
                  VEHICLE_MAP[type];

                const VehicleIcon =
                  vehicle.icon;

                return (
                  <motion.tr
                    key={driver.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className="
                      border-b border-black/5
                      hover:bg-zinc-50
                      transition-all
                      group
                    "
                  >
                    {/* DRIVER */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div
                            className="
                              w-14 h-14 rounded-2xl
                              bg-black text-white
                              flex items-center justify-center
                              font-black text-lg
                            "
                          >
                            {driver.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div
                            className="
                              absolute -bottom-1 -right-1
                              w-4 h-4 rounded-full
                              bg-emerald-500
                              border-[3px] border-white
                            "
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[15px]">
                              {driver.name}
                            </h4>

                            <ShieldCheck
                              size={15}
                              className="text-sky-500"
                            />
                          </div>

                          <p className="text-xs text-gray-400 mt-1">
                            Driver JaBarin
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CONTACT */}
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />

                          <span>
                            {driver.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />

                          <span>
                            {driver.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* VEHICLE */}
                    <td className="px-8 py-6">
                      <div
                        className={`
                          inline-flex items-center gap-2
                          px-4 py-2 rounded-2xl
                          ${vehicle.bg}
                          ${vehicle.color}
                        `}
                      >
                        <VehicleIcon size={15} />

                        <span className="text-xs font-bold">
                          {vehicle.label}
                        </span>
                      </div>
                    </td>

                    {/* ORDER */}
                    <td className="px-8 py-6">
                      <div
                        className="
                          inline-flex flex-col
                        "
                      >
                        <span className="font-black text-lg">
                          {
                            driver._count
                              .orders
                          }
                        </span>

                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                          Selesai
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-6">
                      <div
                        className="
                          inline-flex items-center gap-2
                          px-4 py-2 rounded-2xl
                          bg-emerald-50
                          text-emerald-600
                        "
                      >
                        <Activity size={14} />

                        <span className="text-xs font-bold">
                          Online
                        </span>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="
                            w-11 h-11 rounded-2xl
                            border border-black/5
                            hover:bg-zinc-100
                            transition-all
                            flex items-center justify-center
                          "
                        >
                          <MoreHorizontal
                            size={18}
                          />
                        </button>

                        <button
                          className="
                            w-11 h-11 rounded-2xl
                            bg-black text-white
                            hover:scale-105
                            transition-all
                            flex items-center justify-center
                          "
                        >
                          <ChevronRight
                            size={18}
                          />
                        </button>
                      </div>
                    </td>
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