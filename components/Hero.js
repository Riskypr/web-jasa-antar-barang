'use client';

import { useRouter } from 'next/navigation';
import { Package, ArrowRight, MapPin, HandCoins, ShieldCheck } from "@/components/icons";
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

  // Varian animasi untuk efek mengambang (floating)
  const floatingVariant = (duration = 4) => ({
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  return (
    <section
      className="relative py-28 px-4 bg-cover bg-center bg-no-repeat h-[100vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero.jpg)',
      }}
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      <div className="relative z-10 mt-16 mx-auto max-w-6xl w-full">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center w-full">

          {/* Kolom Teks Kiri */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white border border-white/20 backdrop-blur-md">
              <Package size={16} />
              Jasa Antar Barang No. 1
            </span>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-7xl leading-[1.1]">
              Kirim barang <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Tanpa Ribet.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
              Kontrol pengiriman sepenuhnya di tangan Anda dengan MapPicker yang akurat dan harga transparan.
            </p>

            <div className="mt-10">
              <button
                onClick={handleOrder}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-black shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95 group"
              >
                Mulai Pengiriman
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Kolom Bubble Kanan */}
          <div className="relative hidden h-[400px] w-full sm:flex items-center justify-center">
            
            {/* Bubble 1*/}
            <motion.div 
              variants={floatingVariant(4)}
              animate="animate"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 right-10 md:right-0 z-20 backdrop-blur-xl bg-white border border-white/20 p-4 rounded-3xl shadow-2xl flex items-center gap-4 w-fit"
            >
              <div className="bg-emerald-500 text-white p-2.5 rounded-2xl shadow-lg">
                <HandCoins size={20} />
              </div>
              <div className="pr-4">
                <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Harga</p>
                <p className="text-sm font-bold text-gray-700">Transparan</p>
              </div>
            </motion.div>

            {/* Bubble 2*/}
            <motion.div 
              variants={floatingVariant(5)}
              animate="animate"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute bottom-10 left-10 md:left-0 z-10 backdrop-blur-xl bg-white border border-white/10 p-4 rounded-3xl shadow-2xl flex items-center gap-4 w-fit"
            >
              <div className="bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg">
                <MapPin size={20} />
              </div>
              <div className="pr-4">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Akurasi</p>
                <p className="text-sm font-bold text-gray-700">Map Picker</p>
              </div>
            </motion.div>

            {/* Bubble 3*/}
            <motion.div 
              variants={floatingVariant(3.5)}
              animate="animate"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 backdrop-blur-lg bg-white border border-white/5 p-3 rounded-2xl flex items-center gap-3 w-fit scale-90"
            >
              <div className="bg-gray-500 text-white p-2 rounded-xl">
                <ShieldCheck size={18} />
              </div>
              <p className="text-xs font-medium text-gray-500 pr-2">Safe Delivery</p>
            </motion.div>

            {/* Efek Cahaya Dekoratif di belakang Bubble */}
            <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}