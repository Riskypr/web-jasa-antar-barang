"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderCard from "@/components/OrderCard";
import useOrder from "@/hooks/useOrder";
import { createPayment } from "@/services/api";
import { Truck, Car, Bike } from "@/components/icons";
import { getCurrentUser } from "@/services/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function OrderPage() {
  const user = getCurrentUser();
  const [points, setPoints] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const {
    distance,
    duration,
    pickupAddress,
    destinationAddress,
  } = useOrder(points);

  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/login"); 
    }
  }, []);

  //  DATA ARMADA
  const vehicles = [
    {
      name: "Motor",
      price: 5000,
      icon: Bike,
      desc: "Cocok untuk barang kecil",
    },
    {
      name: "Mobil",
      price: 20000,
      icon: Car,
      desc: "Favorit untuk pengiriman sedang",
    },
    {
      name: "Truck",
      price: 50000,
      icon: Truck,
      desc: "Untuk barang besar & banyak",
    },
  ];

  //  CREATE ORDER
  async function createOrder(amount) {
    try {

      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle: selectedVehicle?.name,
          pickup_address: pickupAddress,
          destination_address: destinationAddress,
          distance,
          duration,
          price: amount,
        }),
      });

      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  //  PAYMENT
  async function pay() {
    if (!distance || !selectedVehicle) {
      alert("Lengkapi data terlebih dahulu!");
      return;
    }

    try {
      const amount = Math.round(distance * selectedVehicle.price + 2000);

      const order = await createOrder(amount);

      if (!order?.id) {
        alert("Gagal membuat order");
        return;
      }

      const res = await createPayment(amount, order.id);

      if (res?.data?.redirect_url) {
        window.location.href = res.data.redirect_url;
      } else {
        alert("Gagal redirect pembayaran");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 px-4 lg:px-12 py-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 🗺️ MAP */}
          <div className="md:col-span-2 h-[500px] rounded-2xl overflow-hidden border bg-white">
            <MapPicker setPoints={setPoints} />
          </div>

          {/* 👉 RIGHT PANEL */}
          <div className="space-y-4 md:sticky md:top-24 h-fit">

            {/* 🚗 ARMADA */}
            <div className="bg-white rounded-2xl p-4 border shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Pilih Armada
              </h2>

              <div className="space-y-2">
                {vehicles.map((v, i) => {
                  const Icon = v.icon;
                  const isSelected = selectedVehicle?.name === v.name;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVehicle(v)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                        ${isSelected
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isSelected ? "bg-white/20" : "bg-white"
                          }`}
                        >
                          <Icon size={18} />
                        </div>

                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            {v.name}
                          </p>
                          <p
                            className={`text-xs ${
                              isSelected
                                ? "text-gray-300"
                                : "text-gray-500"
                            }`}
                          >
                            {v.desc}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          Rp {v.price.toLocaleString()}
                        </p>

                        {v.name === "Mobil" && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white text-gray-900"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            Favorit
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 📦 ORDER CARD */}
            <div className="bg-white rounded-2xl border p-4 shadow-sm">
              <OrderCard
                distance={distance}
                duration={duration}
                pickupAddress={pickupAddress}
                destinationAddress={destinationAddress}
                onPay={pay}
                vehicle={selectedVehicle}
                paymentStatus={paymentStatus}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}