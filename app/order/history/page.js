"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Bike,
  Car,
  Truck,
  MapPin,
  Navigation,
  CreditCard,
  Clock,
} from "@/components/icons";

export default function HistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("/api/order/history")
    .then(async (res) => {
      if (res.status === 401) {
        window.location.href = "/login";
        return [];
      }
      return res.json();
    })
    .then((data) => {
      setOrders(Array.isArray(data) ? data : []);
      });
  }, []);

  //  ICON ARMADA
  function getIcon(vehicle) {
    switch (vehicle) {
      case "Motor":
        return Bike;
      case "Mobil":
        return Car;
      case "Truck":
        return Truck;
      default:
        return Bike;
    }
  }

  //  STATUS STYLE (FIX HIJAU PAID)
  function statusStyle(status) {
    if (status === "paid")
      return "bg-green-100 text-green-600";
    if (status === "pending")
      return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-600";
  }

  //  FORMAT TANGGAL GROUP
  function formatGroupDate(date) {
    const today = new Date();
    const d = new Date(date);

    const isToday =
      d.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday =
      d.toDateString() === yesterday.toDateString();

    if (isToday) return "Hari ini";
    if (isYesterday) return "Kemarin";

    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  //  FORMAT JAM
  function formatTime(date) {
    return new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  //  GROUPING
  const groupedOrders = Array.isArray(orders)
    ? orders.reduce((acc, order) => {
        const key = formatGroupDate(order.created_at);

        if (!acc[key]) acc[key] = [];
        acc[key].push(order);

        return acc;
      }, {})
    : {};

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className=" flex-1 px-8 lg:w-[800px] mx-auto mt-24 space-y-6 pb-10">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Riwayat Order
          </h1>
          <p className="text-sm text-gray-500">
            Semua transaksi pengiriman kamu
          </p>
        </div>

        {/* EMPTY */}
        {orders.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-10 bg-slate-200 p-4 rounded-xl lg:w-80 mx-auto">
            Belum ada order yang dibuat.
          </div>
        )}

        {/* 🔥 GROUPED LIST */}
        {Object.keys(groupedOrders).map((date) => (
          <div key={date} className="space-y-3">

            {/* 📅 DATE HEADER */}
            <h2 className="text-sm font-semibold text-gray-600">
              {date}
            </h2>

            {/* LIST PER TANGGAL */}
            {groupedOrders[date].map((order) => {
              const Icon = getIcon(order.vehicle);

              return (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Icon size={18} className="text-gray-700" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {order.vehicle}
                        </p>

                        {/* 🕒 TIME */}
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />
                          {formatTime(order.created_at)}
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle(
                        order.payment_status
                      )}`}
                    >
                      {order.payment_status}
                    </div>
                  </div>

                  {/* ROUTE */}
                  <div className="space-y-2 text-sm mb-3">

                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-green-500 mt-1" />
                      <p className="text-gray-600 line-clamp-1">
                        {order.pickup_address}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Navigation size={14} className="text-red-500 mt-1" />
                      <p className="text-gray-600 line-clamp-1">
                        {order.destination_address}
                      </p>
                    </div>

                  </div>

                  {/* BOTTOM */}
                  <div className="flex justify-between items-center pt-3 border-t">

                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <CreditCard size={16} />
                      Rp {order.price.toLocaleString()}
                    </div>

                    <div className="text-xs text-gray-500">
                      {order.order_status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}