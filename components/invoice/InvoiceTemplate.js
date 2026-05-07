"use client";

import {
  MapPin,
  Navigation,
  Printer,
  CheckCircle,
} from "@/components/icons";

export default function InvoiceTemplate({ order }) {
  function handlePrint() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white">

      {/* ACTION */}
      <div className="max-w-3xl mx-auto mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="
            bg-gray-900 text-white
            px-5 py-3 rounded-2xl
            font-semibold flex items-center gap-2
          "
        >
          <Printer size={18} />
          Cetak Invoice
        </button>
      </div>

      {/* PAPER */}
      <div
        className="
          max-w-3xl mx-auto bg-white
          rounded-3xl shadow-xl
          p-10 print:shadow-none
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-6">

          <div>
            <h1 className="text-3xl font-black">
              JaBarin
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Bukti Pembayaran Pengiriman
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end text-emerald-600 font-bold">
              <CheckCircle size={18} />
              PAID
            </div>

            <p className="text-sm text-gray-400 mt-2">
              #{order.id}
            </p>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-b">

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">
              Detail Pengiriman
            </p>

            <div className="space-y-3">

              <div>
                <p className="text-xs text-gray-400">
                  Kendaraan
                </p>

                <p className="font-semibold">
                  {order.vehicle}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Metode Pembayaran
                </p>

                <p className="font-semibold capitalize">
                  {order.payment_type || "-"}
                </p>
              </div>

            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">
              Tanggal
            </p>

            <p className="font-semibold">
              {new Date(order.created_at).toLocaleString(
                "id-ID"
              )}
            </p>
          </div>

        </div>

        {/* ROUTE */}
        <div className="py-8 border-b space-y-6">

          <div className="flex gap-4">
            <div className="bg-emerald-100 p-3 rounded-full h-fit">
              <MapPin
                size={18}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Pickup
              </p>

              <p className="font-medium">
                {order.pickup_address}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-sky-100 p-3 rounded-full h-fit">
              <Navigation
                size={18}
                className="text-sky-600"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Destination
              </p>

              <p className="font-medium">
                {order.destination_address}
              </p>
            </div>
          </div>

        </div>

        {/* PAYMENT */}
        <div className="py-8">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-400">
                Total Pembayaran
              </p>

              <h2 className="text-4xl font-black mt-2">
                Rp {order.price.toLocaleString("id-ID")}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                Status Order
              </p>

              <p className="font-bold capitalize">
                {order.order_status}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}