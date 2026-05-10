"use client";

import {
  X,
  Mail,
  Phone,
  ShieldCheck,
  Bike,
  Car,
  Truck,
  Activity,
  Calendar,
  PackageCheck,
  BadgeCheck,
  User,
} from "lucide-react";

const VEHICLE_MAP = {
  MOTOR: {
    label: "Motor",
    icon: Bike,
    bg: "bg-amber-50",
    color: "text-amber-600",
  },

  MOBIL: {
    label: "Mobil",
    icon: Car,
    bg: "bg-sky-50",
    color: "text-sky-600",
  },

  TRUCK: {
    label: "Truck",
    icon: Truck,
    bg: "bg-violet-50",
    color: "text-violet-600",
  },
};

export default function DriverDetailModal({
  open,
  onClose,
  driver,
}) {
  if (!open || !driver) return null;

  const vehicle =
    VEHICLE_MAP[
      driver.driverProfile?.vehicleType
    ] || VEHICLE_MAP.MOTOR;

  const VehicleIcon = vehicle.icon;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          w-full max-w-2xl
          rounded-[32px]
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="relative px-8 pt-8 pb-6 border-b border-zinc-100">
          <button
            onClick={onClose}
            className="
              absolute top-6 right-6
              w-10 h-10 rounded-2xl
              hover:bg-zinc-100
              flex items-center justify-center
              transition-all
            "
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-5">
            {/* AVATAR */}
            <div
              className="
                w-20 h-20 rounded-[26px]
                bg-black text-white
                flex items-center justify-center
                text-3xl font-black
              "
            >
              {driver.name?.charAt(0)}
            </div>

            {/* INFO */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-black tracking-tight text-zinc-950">
                  {driver.name}
                </h2>

                {driver.driverProfile?.isVerified && (
                  <ShieldCheck
                    size={20}
                    className="text-sky-500"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                {/* ONLINE */}
                <div
                  className={`
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-xl
                    text-xs font-bold
                    ${
                      driver.driverProfile?.isOnline
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-zinc-100 text-zinc-500"
                    }
                  `}
                >
                  <Activity size={13} />

                  {driver.driverProfile?.isOnline
                    ? "Online"
                    : "Offline"}
                </div>

                {/* ROLE */}
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-xl
                    bg-zinc-100 text-zinc-700
                    text-xs font-bold
                  "
                >
                  <BadgeCheck size={13} />
                  DRIVER
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8">
          {/* GRID INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* EMAIL */}
            <div className="rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-start gap-3">
                <div
                  className="
                    w-11 h-11 rounded-xl
                    bg-zinc-100
                    flex items-center justify-center
                  "
                >
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Email
                  </p>

                  <p className="font-semibold text-zinc-900 mt-1 break-all">
                    {driver.email}
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-start gap-3">
                <div
                  className="
                    w-11 h-11 rounded-xl
                    bg-zinc-100
                    flex items-center justify-center
                  "
                >
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Nomor Telepon
                  </p>

                  <p className="font-semibold text-zinc-900 mt-1">
                    {driver.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-11 h-11 rounded-xl
                    flex items-center justify-center
                    ${vehicle.bg}
                    ${vehicle.color}
                  `}
                >
                  <VehicleIcon size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Armada
                  </p>

                  <p className="font-semibold text-zinc-900 mt-1">
                    {vehicle.label}
                  </p>
                </div>
              </div>
            </div>

            {/* JOIN DATE */}
            <div className="rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-start gap-3">
                <div
                  className="
                    w-11 h-11 rounded-xl
                    bg-zinc-100
                    flex items-center justify-center
                  "
                >
                  <Calendar size={18} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Bergabung
                  </p>

                  <p className="font-semibold text-zinc-900 mt-1">
                    {new Date(
                      driver.createdAt
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            {/* DELIVERY */}
            <div
              className="
                rounded-3xl
                bg-zinc-950 text-white
                p-6
              "
            >
              <div className="flex items-center justify-between">
                <PackageCheck
                  size={24}
                  className="text-zinc-400"
                />

                <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold">
                  Delivery
                </span>
              </div>

              <h3 className="text-4xl font-black mt-6">
                {driver.driverProfile
                  ?.totalDeliveries || 0}
              </h3>

              <p className="text-sm text-zinc-400 mt-2">
                Total Pengiriman
              </p>
            </div>

            {/* STATUS */}
            <div
              className="
                rounded-3xl
                border border-zinc-200
                p-6
              "
            >
              <div className="flex items-center justify-between">
                <User
                  size={24}
                  className="text-zinc-400"
                />

                <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                  Driver
                </span>
              </div>

              <h3 className="text-2xl font-black mt-6 text-zinc-950">
                {driver.status}
              </h3>

              <p className="text-sm text-zinc-500 mt-2">
                Status Akun Driver
              </p>
            </div>
          </div>

          {/* EXTRA */}
          <div className="rounded-3xl bg-zinc-50 p-5 space-y-4">
            <h3 className="text-sm font-black tracking-tight">
              Informasi Tambahan
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-400 mb-1">
                  Nomor SIM / Lisensi
                </p>

                <p className="font-semibold text-zinc-900">
                  {driver.driverProfile
                    ?.licenseNumber || "-"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 mb-1">
                  Nomor Identitas
                </p>

                <p className="font-semibold text-zinc-900">
                  {driver.driverProfile
                    ?.identityNumber || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}