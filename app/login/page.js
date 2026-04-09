'use client';
import { Suspense } from 'react';
import LoginFormClient from '../../components/login/LoginFormClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="absolute w-[500px] h-[500px] bg-gray-800 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-gray-700 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-100px]" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white text-black p-3 rounded-full mb-3">
              <img src="/truck.png" alt="Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">JaBarin</h1>
            <p className="text-gray-400 text-sm">
              Jasa Antar Barang Cepat & Aman
            </p>
          </div>

          {/* FORM */}
          <LoginFormClient />
        </div>
      </div>
    </div>
    </Suspense>
  );
}