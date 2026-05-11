"use client";

import { useEffect, useState, useMemo, useRef } from "react"; 
import { Calendar, X } from "@/components/icons";
import { AnimatePresence } from "framer-motion";
import { formatGroupDate } from "@/utils/history";
import { SkeletonCard, EmptyState } from "@/components/order/history/UI";
import { OrderCard } from "@/components/order/history/OrderCard";
import OrderDetailModal from "@/components/order/history/OrderDetailModal";

export default function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);


  const dateInputRef = useRef(null);

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


  const handleContainerClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        dateInputRef.current.focus();
      }
    }
  };

const filteredOrders = useMemo(() => {
  if (!filterDate) return orders;

  return orders.filter((o) =>
    o.createdAt.startsWith(filterDate)
  );
}, [orders, filterDate]);

  const groupedOrders = useMemo(() => {
    return filteredOrders.reduce((acc, order) => {
      const key = formatGroupDate(order.createdAt);
      if (!acc[key]) acc[key] = [];
      acc[key].push(order);
      return acc;
    }, {});
  }, [filteredOrders]);

  return (
    <>
      <main className="min-h-screen bg-[#F9FAFB]">
        <div className="flex-1 px-4 lg:w-[950px] mx-auto pt-32 space-y-10 pb-20">
          
          <Header
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            handleContainerClick={handleContainerClick}
            dateInputRef={dateInputRef}
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
                    <Calendar size={16} className="text-gray-700" />
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


const Header = ({
  filterDate,
  setFilterDate,
  handleContainerClick,
  dateInputRef,
}) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tighter text-gray-900">
          Riwayat Pesanan
        </h1>

        <p className="text-[13px] text-gray-400 font-medium">
          Pantau aktivitas pengiriman Anda secara real-time.
        </p>
      </div>

      {/* DATE PICKER */}
      <div
        onClick={handleContainerClick}
        className="
          relative w-full md:w-72 h-[46px]
          flex items-center cursor-pointer
          group
        "
      >
        <input
          ref={dateInputRef}
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="sr-only"
        />

        <div
          className="
            w-full h-full
            pl-11 pr-12
            bg-gray-50
            border border-gray-100
            rounded-2xl
            text-sm font-medium
            flex items-center
            text-gray-700
            transition-all
            group-hover:border-gray-300
            group-hover:bg-white
          "
        >
          <Calendar
            size={16}
            className="absolute left-4 text-gray-400"
          />

          {filterDate ? (
            filterDate
          ) : (
            <span className="text-gray-400 font-normal text-xs">
              Pilih Tanggal
            </span>
          )}
        </div>

        {/* RESET */}
        {filterDate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFilterDate("");
            }}
            className="
              absolute right-3
              bg-gray-900 hover:bg-black
              text-white
              px-3 py-1
              text-ms
              font-medium
              rounded-xl
              transition-colors
              z-20
            "
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};