"use client";

import {
  Trash2,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { toast } from "react-toastify";

export default function DeleteUserModal({
  open,
  onClose,
  user,
  onDeleted,
}) {
  if (!open || !user) return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(
        "Pelanggan berhasil dihapus"
      );

      onDeleted?.(user.id);

      onClose();
    } catch (err) {
      toast.error(
        err.message ||
          "Gagal menghapus pelanggan"
      );
    }
  };

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
            scale: 0.95,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          className="
            w-full max-w-md
            rounded-2xl
            bg-white
            shadow-2xl
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div className="relative p-7 text-center">
            <button
              onClick={onClose}
              className="
                absolute top-5 right-5
                w-10 h-10 rounded-xl
                hover:bg-zinc-100
                transition-all
                flex items-center justify-center
              "
            >
              <X size={18} />
            </button>

            <div
              className="
                w-20 h-20 rounded-[28px]
                bg-red-100 text-red-600
                flex items-center justify-center
                mx-auto
              "
            >
              <Trash2 size={34} />
            </div>

            <h2 className="text-2xl font-bold text-red-600 mt-5">
              Hapus Pelanggan
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed text-sm">
              Yakin ingin menghapus pelanggan{" "}
              <span className="font-bold text-black">
                {user.name}
              </span>
              ?
            </p>
          </div>

          {/* FOOTER */}
          <div className="grid grid-cols-2 gap-3 p-7 pt-0">
            <button
              onClick={onClose}
              className="
                h-12 rounded-2xl
                border border-black/10
                font-semibold
                hover:bg-zinc-100
                transition-all
              "
            >
              Batal
            </button>

            <button
              onClick={handleDelete}
              className="
                h-12 rounded-2xl
                bg-red-600 text-white
                font-semibold
                hover:bg-red-700
                transition-all
              "
            >
              Hapus
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}