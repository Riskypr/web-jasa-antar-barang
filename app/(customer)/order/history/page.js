"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar, X } from "@/components/icons";
import { AnimatePresence } from "framer-motion";

import { formatGroupDate } from "@/utils/history";

import {
  SkeletonCard,
  EmptyState,
} from "@/components/order/history/UI";

import { OrderCard } from "@/components/order/history/OrderCard";

import OrderDetailModal from "@/components/order/history/OrderDetailModal";

export default function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterDate, setFilterDate] = useState("");

  // 🔥 modal state
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("/api/order/history")
      .then((res) =>
        res.status === 401
          ? (window.location.href = "/login")
          : res.json()
      )
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    if (!filterDate) return orders;

    return orders.filter((o) =>
      o.created_at.startsWith(filterDate)
    );
  }, [orders, filterDate]);

  const groupedOrders = useMemo(() => {
    return filteredOrders.reduce((acc, order) => {
      const key = formatGroupDate(order.created_at);

      if (!acc[key]) acc[key] = [];

      acc[key].push(order);

      return acc;
    }, {});
  }, [filteredOrders]);

  return (
    <>
      <main className="min-h-screen bg-[#F9FAFB]">
        <div className="flex-1 px-4 lg:w-[950px] mx-auto mt-32 space-y-10 pb-20">

          <Header
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredOrders.length === 0 ? (
            <EmptyState
              filterDate={filterDate}
              onReset={() => setFilterDate("")}
            />
          ) : (
            <AnimatePresence>
              {Object.entries(groupedOrders).map(([date, items]) => (
                <section key={date} className="space-y-6">

                  <div className="flex items-center gap-2">
                    <Calendar
                      size={16}
                      className="text-gray-700"
                    />

                    <h2 className="text-sm font-medium text-gray-700 capitalize">
                      {date}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {items.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onClick={() => setSelectedOrder(order)}
                      />
                    ))}

                  </div>
                </section>
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const Header = ({ filterDate, setFilterDate }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md flex flex-col lg:flex-row justify-between gap-8">

    <div className="space-y-1.5">
      <h1 className="text-3xl font-bold tracking-tighter">
        Riwayat Pesanan
      </h1>

      <p className="text-[13px] text-gray-400 font-medium">
        Pantau aktivitas pengiriman Anda secara real-time.
      </p>
    </div>

    <div className="relative">
      <Calendar
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium"
      />

      {filterDate && (
        <button
          onClick={() => setFilterDate("")}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  </div>
);