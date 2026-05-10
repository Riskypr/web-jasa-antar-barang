"use client";

import {
  X,
  Mail,
  Phone,
  Calendar,
  Package,
  ShieldCheck,
  User2,
  Hash,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function UserDetailModal({
  open,
  onClose,
  user,
}) {
  if (!open || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed inset-0 z-[999]
          bg-black/40 backdrop-blur-sm
          flex items-center justify-center
          p-4
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          className="
            w-full max-w-3xl
            rounded-2xl
            bg-white
            shadow-2xl
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div
            className="
              relative
              px-8 py-7
              border-b border-black/5
            "
          >
            <button
              onClick={onClose}
              className="
                absolute top-6 right-6
                w-11 h-11 rounded-xl
                hover:bg-zinc-200
                transition-all
                flex items-center justify-center
              "
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-5">
              <div
                className="
                  w-24 h-24 rounded-xl
                  bg-black text-white
                  flex items-center justify-center
                  text-4xl font-black
                  shadow-lg
                "
              >
                {user.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-black tracking-tight">
                    {user.name}
                  </h2>

                  <ShieldCheck
                    size={20}
                    className="text-zinc-500"
                  />
                </div>

                <p className="text-gray-500 mt-2">
                  Pelanggan JaBarin
                </p>

                <div
                  className="
                    mt-4 inline-flex items-center gap-2
                    px-4 py-2 rounded-2xl
                    bg-zinc-100
                    text-xs font-bold
                  "
                >
                  <Hash size={14} />

                  {user.id.slice(0, 12)}
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-5">
              <InfoCard
                icon={User2}
                label="Nama Lengkap"
                value={user.name}
              />

              <InfoCard
                icon={Mail}
                label="Email"
                value={user.email}
              />

              <InfoCard
                icon={Phone}
                label="Nomor Telepon"
                value={user.phone}
              />

              <InfoCard
                icon={Package}
                label="Total Order"
                value={`${user._count.orders} Order`}
              />

              <InfoCard
                icon={Calendar}
                label="Tanggal Bergabung"
                value={new Date(
                  user.createdAt
                ).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              />

              <InfoCard
                icon={ShieldCheck}
                label="Status Akun"
                value={user.status || "ACTIVE"}
              />
            </div>
          </div>

          {/* FOOTER */}
          {/* <div className="px-8 pb-8">
            <button
              onClick={onClose}
              className="
                w-full h-13 rounded-2xl
                bg-black text-white
                font-semibold
                hover:opacity-90
                transition-all
              "
            >
              Tutup Detail
            </button>
          </div> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl
        border border-black/5
        bg-zinc-50
        p-5
        flex items-start gap-4
        hover:bg-zinc-100
        transition-all
      "
    >
      <div
        className="
          w-12 h-12 rounded-xl
          bg-white border border-black/5
          flex items-center justify-center
          shrink-0
        "
      >
        <Icon
          size={18}
          className="text-gray-700"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
          {label}
        </p>

        <h4
          className="
            mt-2 font-bold text-[15px]
            text-black break-words
          "
        >
          {value || "-"}
        </h4>
      </div>
    </div>
  );
}