'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { CheckCircle, Package } from '@/components/icons';

export default function OrderSuccessClient() {
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get('order_id');
  const status = params.get('transaction_status');

  // 🔥 Cek login di client (opsional tapi bagus untuk UX)
  useEffect(() => {
    const hasToken = document.cookie.includes('token=');

    if (!hasToken) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 relative overflow-hidden px-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white border border-white rounded-2xl p-8 text-center shadow-2xl">

          {/* ICON SUCCESS */}
          <div className="flex justify-center mb-4">
            <CheckCircle size={60} className="text-green-400" />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-black">
            Pembayaran Berhasil
          </h1>

          <p className="text-gray-600 mt-2 text-sm">
            Terima kasih! Pesanan kamu sedang diproses
          </p>

          {/* INFO */}
          <div className="mt-6 bg-gray-100 rounded-xl p-4 text-left space-y-2 border border-gray-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-800 font-medium">Order ID</span>
              <span className="text-gray-500 font-medium text-[13px]">
                {orderId}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-6 space-y-3">

            {/* 🔥 HISTORY */}
            <button
              onClick={() => router.push('/history')}
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Package size={18} />
              Lihat Riwayat Pesanan
            </button>

            {/* 🔥 BERANDA */}
            <button
              onClick={() => router.push('/')}
              className="w-full border border-black text-black py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Kembali ke Beranda
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}