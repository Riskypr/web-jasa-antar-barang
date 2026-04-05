"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderCard from "@/components/OrderCard";
import useOrder from "@/hooks/useOrder";
import { createPayment } from "@/services/api";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function Home() {
  const [points, setPoints] = useState([]);

  const {
    distance,
    duration,
    pickupAddress,
    destinationAddress,
  } = useOrder(points);

  async function pay() {
    const amount = distance ? Math.round(distance * 3000 + 2000) : 0;

    if (!amount) {
      alert("Tidak ada jarak tersimpan, pilih titik lokasi terlebih dahulu");
      return;
    }

    const res = await createPayment(amount);

    if (!res.data.redirect_url) {
      alert("Gagal mendapatkan link pembayaran");
      return;
    }

    window.location.href = res.data.redirect_url;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-0">
        <MapPicker setPoints={setPoints} />
      </div>

      <div className="md:px-4 md:pb-6 relative z-[9999] -mt-24">
        <OrderCard
          distance={distance}
          duration={duration}
          pickupAddress={pickupAddress}
          destinationAddress={destinationAddress}
          onPay={pay}
        />
      </div>
      <Footer />
    </main>
  );
}