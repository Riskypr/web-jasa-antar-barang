"use client";

import { Trash2, X, Loader2, } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function DeleteDriverModal({ open, onClose, driver, onDeleted, }) {
  const [loading, setLoading] =
    useState(false);

  if (!open || !driver) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/admin/drivers/${driver.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.message ||
            "Gagal menghapus driver"
        );

        return;
      }

      toast.success(
        data.message ||
          "Driver berhasil dihapus"
      );

      onDeleted?.(driver.id);

      onClose();
    } catch (error) {
      toast.error(
        "Terjadi kesalahan server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20,}}
            animate={{
              opacity: 1, scale: 1, y: 0,
            }}
            exit={{
              opacity: 0, scale: 0.95, y: 20,
            }}
            className="
              w-full max-w-md
              rounded-[28px]
              bg-white
              shadow-2xl
              overflow-hidden
            "
          >
            {/* HEADER */}
            <div className="relative p-8 text-center">
              <button
                onClick={onClose}
                className="
                  absolute top-5 right-5
                  w-10 h-10 rounded-xl
                  hover:bg-zinc-100
                  flex items-center justify-center
                "
              >
                <X size={18} />
              </button>

              <div
                className="
                  w-20 h-20 rounded-[26px]
                  bg-red-100 text-red-600
                  flex items-center justify-center
                  mx-auto
                "
              >
                <Trash2 size={34} />
              </div>

              <h2 className="text-2xl font-black mt-6">
                Hapus Driver
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed text-sm">
                Driver{" "}
                <span className="font-bold text-black">
                  {driver.name}
                </span>{" "}
                akan dihapus permanen dari sistem.
              </p>
            </div>

            {/* ACTION */}
            <div className="grid grid-cols-2 gap-3 p-6 pt-0">
              <button
                onClick={onClose}
                disabled={loading}
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
                disabled={loading}
                className="
                  h-12 rounded-2xl
                  bg-red-600 text-white
                  font-semibold
                  hover:bg-red-700
                  transition-all
                  flex items-center justify-center gap-2
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Menghapus...
                  </>
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}