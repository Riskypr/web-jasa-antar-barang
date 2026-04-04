"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import OrderCard from "@/components/OrderCard";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});
export default function OrderPage() {
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  // 🔥 realtime hitung
  useEffect(() => {
    async function fetchData() {
      if (points.length < 2) return;

      // distance + ETA
      const res = await axios.post("/api/distance", {
        from: points[0],
        to: points[1],
      });

      setDistance(res.data.distance);
      setDuration(res.data.duration);

      // alamat jemput
      const pickup = await axios.post("/api/geocode", {
        lat: points[0].lat,
        lng: points[0].lng,
      });

      setPickupAddress(pickup.data.address);

      // alamat tujuan
      const dest = await axios.post("/api/geocode", {
        lat: points[1].lat,
        lng: points[1].lng,
      });

      setDestinationAddress(dest.data.address);
    }

    fetchData();
  }, [points]);

  async function pay() {
    const amount = distance ? Math.round(distance * 3000 + 2000) : 0;

    if (!amount) {
      alert("Tidak ada jarak tersimpan, pilih titik lokasi terlebih dahulu");
      return;
    }

    const res = await axios.post("/api/payment", { amount });

    if (!res.data.redirect_url) {
      alert("Gagal mendapatkan link pembayaran");
      return;
    }

    window.location.href = res.data.redirect_url;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">

      <h1 className="text-xl font-bold mb-4">
        🚚 Order Antar Barang
      </h1>

      <MapPicker setPoints={setPoints} />

      <OrderCard
        distance={distance}
        duration={duration}
        pickupAddress={pickupAddress}
        destinationAddress={destinationAddress}
        onPay={pay}
      />

    </main>
  );
}