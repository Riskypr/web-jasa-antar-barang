import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function InvoicePage({ params }) {
  const { id } = await params;

  if (!id) return notFound();

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!order) return notFound();

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-3 mb-5 print:hidden">
          <Link
            href="/order/history"
            className="px-5 py-3 rounded-2xl border bg-white hover:bg-gray-50 text-sm font-semibold"
          >
            Kembali
          </Link>

          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-2xl bg-black text-white hover:bg-gray-800 text-sm font-semibold"
          >
            Cetak Invoice
          </button>
        </div>

        {/* INVOICE */}
        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-black text-white p-10">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  INVOICE
                </h1>

                <p className="text-gray-300 mt-2 text-sm">
                  Bukti Pembayaran Pesanan
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">
                  ORDER ID
                </p>

                <p className="font-bold text-lg">
                  #{order.id}
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-10 space-y-10">

            {/* STATUS */}
            <div className="flex items-center justify-between bg-gray-50 rounded-3xl p-6 border">
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold">
                  Status Pembayaran
                </p>

                <h2 className="text-2xl font-bold mt-1 capitalize">
                  {order.payment_status}
                </h2>
              </div>

              <div
                className={`
                  px-5 py-2 rounded-2xl text-sm font-bold capitalize
                  ${
                    order.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.payment_status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {order.payment_status}
              </div>
            </div>

            {/* CUSTOMER + PAYMENT */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-3xl p-6">
                <p className="text-xs uppercase text-gray-400 font-bold mb-4">
                  Informasi Pemesan
                </p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Nama</p>
                    <p className="font-semibold">
                      {order.user?.name || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="font-semibold">
                      {order.user?.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Tanggal</p>
                    <p className="font-semibold">
                      {new Date(order.created_at).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-3xl p-6">
                <p className="text-xs uppercase text-gray-400 font-bold mb-4">
                  Informasi Pembayaran
                </p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Metode</p>
                    <p className="font-semibold capitalize">
                      {order.payment_method || "Midtrans"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Status Order</p>
                    <p className="font-semibold capitalize">
                      {order.order_status}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Armada</p>
                    <p className="font-semibold">
                      {order.vehicle}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ROUTE */}
            <div className="border rounded-3xl p-6">
              <p className="text-xs uppercase text-gray-400 font-bold mb-5">
                Detail Pengiriman
              </p>

              <div className="space-y-5">

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Titik Jemput
                  </p>

                  <p className="font-semibold">
                    {order.pickup_address}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Tujuan Pengiriman
                  </p>

                  <p className="font-semibold">
                    {order.destination_address}
                  </p>
                </div>

              </div>
            </div>

            {/* TOTAL */}
            <div className="bg-black text-white rounded-3xl p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">
                    Total Pembayaran
                  </p>

                  <h2 className="text-4xl font-black mt-2">
                    Rp {order.price.toLocaleString("id-ID")}
                  </h2>
                </div>

                <div className="text-right text-sm text-gray-400">
                  <p>Terima kasih telah menggunakan layanan kami.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}