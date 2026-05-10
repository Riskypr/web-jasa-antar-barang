// components/admin/fleet/DeleteFleetModal.js

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteFleetModal({ open, onClose, onSuccess, vehicle }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!vehicle?.id) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/admin/vehicles/${vehicle.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus armada");

      toast.success(`Armada ${vehicle.name} berhasil dihapus`);
      
      // Kirim ID ke parent untuk update state filter
      onSuccess(vehicle.id); 
      onClose();
    } catch (err) {
      toast.error(err.message);
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
          // KUNCI: Pastikan z-index tinggi (z-[1000])
          className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              
              <h3 className="text-2xl font-black mb-2">Hapus Armada?</h3>
              <p className="text-gray-500">
                Apakah Anda yakin ingin menghapus <b>{vehicle?.name}</b>? Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="h-12 rounded-2xl border border-black/10 font-bold hover:bg-zinc-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="h-12 rounded-2xl bg-red-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all"
                >
                  {loading ? "Menghapus..." : <><Trash2 size={18} /> Hapus</>}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}