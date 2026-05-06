'use client';

import { useRouter } from 'next/navigation';
import { Package, ArrowRight, MapPin, HandCoins } from "@/components/icons";
import { motion } from 'framer-motion';

export default function Hero() {
  const router = useRouter();

  const handleOrder = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      router.push('/login');
    } else {
      router.push('/order');
    }
  };

  return (
    <section
      className="relative py-28 px-4 mt-16 bg-cover bg-center bg-no-repeat min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-center w-full">

          {/* Kolom Teks Kiri */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white border border-white/20 backdrop-blur-sm">
              <Package size={16} />
              Jasa Antar Barang
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              Kirim barang lebih mudah dengan kontrol peta yang jelas
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Pilih titik jemput dan tujuan langsung di MapPicker, lihat estimasi jarak, dan selesaikan pesanan tanpa bingung.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={handleOrder}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-gray-100 active:scale-95 group"
              >
                Pesan Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Kolom Fitur Kanan */}
          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 flex items-start gap-5 hover:bg-white/15 transition-all duration-300 group">
              <div className="bg-white text-black p-3.5 rounded-2xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
                <HandCoins size={22} />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
                  Transparan
                </p>
                <p className="text-base font-semibold text-white mt-0.5">
                  Harga jelas, tanpa kejutan
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 flex items-start gap-5 hover:bg-white/15 transition-all duration-300 group">
              <div className="bg-white text-black p-3.5 rounded-2xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
                  Cepat & Terpercaya
                </p>
                <p className="text-base font-semibold text-white mt-0.5">
                  Estimasi ongkos langsung di peta
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}