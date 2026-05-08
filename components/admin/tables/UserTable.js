"use client";

import { useState } from "react";

import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Edit3,
  ChevronRight,
  Package,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useToast } from "@/hooks/useToast";

export default function UserTable({
  initialUsers,
}) {
  const [users, setUsers] =
    useState(initialUsers);

  const { success, error } = useToast();

  async function handleDelete(userId) {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus pelanggan ini?"
      )
    )
      return;

    try {
      const res = await fetch(
        `/api/admin/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok)
        throw new Error(
          "Gagal menghapus pelanggan"
        );

      setUsers(
        users.filter((u) => u.id !== userId)
      );

      success(
        "Pelanggan berhasil dihapus."
      );
    } catch (err) {
      error(err.message);
    }
  }

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
          px-6 md:px-8 py-6
          border-b border-black/5
          flex items-center justify-between
        "
      >
        <div>
          <h3 className="text-xl font-black tracking-tight">
            Daftar Pelanggan
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Seluruh data pelanggan JaBarin.
          </p>
        </div>

        <div
          className="
            hidden md:flex items-center gap-2
            px-4 py-2 rounded-2xl
            bg-zinc-100 text-xs font-bold
          "
        >
          {users.length} Data
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr
              className="
                border-b border-black/5
                text-left
              "
            >
              <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Pelanggan
              </th>

              <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Kontak
              </th>

              <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Order
              </th>

              <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Bergabung
              </th>

              <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
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
                    scale: 0.98,
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
                  {/* USER */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          w-14 h-14 rounded-2xl
                          bg-black text-white
                          flex items-center justify-center
                          font-black text-lg
                          shrink-0
                        "
                      >
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-bold text-[15px]">
                          {user.name}
                        </h4>

                        <p className="text-xs text-gray-400 mt-1">
                          ID:{" "}
                          {user.id.slice(0, 10)}
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
                          {user.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />

                        <span>
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ORDER */}
                  <td className="px-8 py-6">
                    <div
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2 rounded-2xl
                        bg-black text-white
                        text-sm font-bold
                      "
                    >
                      <Package size={14} />

                      {user._count.orders} Order
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={15} />

                      {new Date(
                        user.createdAt
                      ).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
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
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="
                          w-11 h-11 rounded-2xl
                          border border-red-100
                          hover:bg-red-50
                          text-red-500
                          transition-all
                          flex items-center justify-center
                        "
                      >
                        <Trash2 size={16} />
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
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}