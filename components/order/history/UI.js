import { Search, Clock, Calendar } from "@/components/icons";
import { motion } from "framer-motion";

export const SkeletonCard = () => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-[220px] flex flex-col">
    <div className="flex justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-2">
          <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
          <div className="w-12 h-3 bg-gray-100 rounded-md"></div>
        </div>
      </div>
      <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <div className="w-10 h-2 bg-gray-100 rounded"></div>
        <div className="w-full h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2 border-l border-gray-100 pl-3">
        <div className="w-10 h-2 bg-gray-100 rounded"></div>
        <div className="w-full h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
      <div className="space-y-1"><div className="w-24 h-2 bg-gray-100 rounded"></div><div className="w-28 h-5 bg-gray-200 rounded"></div></div>
      <div className="w-14 h-5 bg-gray-100 rounded-lg"></div>
    </div>
  </div>
);

export const EmptyState = ({ filterDate, onReset }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden bg-white/50 backdrop-blur-md border-2 border-dashed border-gray-200 rounded-[40px] px-8 py-20 text-center">
    <div className="relative mx-auto w-24 h-24 mb-8">
      <div className="absolute inset-0 bg-gray-900 rounded-3xl -rotate-6 shadow-xl flex items-center justify-center text-white">
        <Search size={40} />
      </div>
    </div>
    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Data tidak ditemukan</h3>
    <p className="text-sm text-gray-500 mt-2">Coba ganti filter tanggal atau buat orderan baru.</p>
    {filterDate && (
      <button onClick={onReset} className="mt-8 text-xs font-black underline hover:text-gray-600">
        LIHAT SEMUA RIWAYAT
      </button>
    )}
  </motion.div>
);