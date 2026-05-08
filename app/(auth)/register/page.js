'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import RegisterFormClient from '@/components/auth/RegisterFormClient';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-medium tracking-widest uppercase text-xs">Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4 py-12">
        
        {/* ANIMATED BACKGROUND BLOBS */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -top-48 -right-48" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] -bottom-32 -left-32" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-[480px]"
        >
          {/* GLASS CARD */}
          <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* LOGO SECTION */}
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="bg-gradient-to-br from-white to-gray-300 p-4 rounded-2xl mb-5 shadow-xl"
              >
                <img src="/truck.png" alt="Logo" className="w-7 h-7 object-contain" />
              </motion.div>
              
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                Bergabung
              </h1>
              <p className="text-gray-500 text-sm font-medium text-center leading-relaxed">
                Mulai perjalanan logistik Anda dengan<br/>layanan tercepat di JaBarin.
              </p>
            </div>

            {/* FORM COMPONENT */}
            <RegisterFormClient />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
             <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">Jasa Antar Barang • 2026</p>
          </motion.div>
        </motion.div>
      </div>
    </Suspense>
  );
}