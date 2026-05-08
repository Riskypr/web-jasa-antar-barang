'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import LoginFormClient from '@/components/auth/LoginFormClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-medium tracking-widest uppercase">Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
        
        {/* ANIMATED BACKGROUND BLOBS */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] -top-48 -left-48" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] -bottom-32 -right-32" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-[440px]"
        >
          {/* GLASS CARD */}
          <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* LOGO SECTON */}
            <div className="flex flex-col items-center mb-10">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-gradient-to-br from-white to-gray-300 p-4 rounded-2xl mb-5 shadow-xl"
              >
                <img src="/truck.png" alt="Logo" className="w-8 h-8 object-contain" />
              </motion.div>
              
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                JaBarin
              </h1>
              <p className="text-gray-500 text-sm font-medium text-center leading-relaxed">
                Logistik Cepat, Aman, dan Terpercaya.<br/>Silakan masuk ke akun Anda.
              </p>
            </div>

            {/* FORM COMPONENT */}
            <LoginFormClient />
          </div>

          {/* ADDITIONAL FOOTER OUTSIDE CARD */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
             <p className="text-gray-600 text-xs uppercase tracking-[0.2em]">© 2026 JaBarin Logistics</p>
          </motion.div>
        </motion.div>
      </div>
    </Suspense>
  );
}