import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvoiceActions from "@/components/order/invoice/InvoiceActions";
import { VEHICLES } from "@/constants/vehicles";
import { ADMIN_FEE } from "@/utils/pricing";

export default async function InvoicePage({ params }) {
  const { id } = await params;

  if (!id) return notFound();

  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!order) return notFound();

  const selectedVehicle = VEHICLES.find(
    (v) => v.name.toLowerCase() === order.vehicle.toLowerCase()
  );

  const pricePerKm = selectedVehicle?.price || 0;

  const servicePrice = Math.round(Number(order.distance) * pricePerKm);

  const paymentStatus = {
    paid: "LUNAS",
    pending: "MENUNGGU PEMBAYARAN",
    failed: "GAGAL",
  };

  return (
    <>
      {/* CSS Khusus untuk Print */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { 
            size: A4; 
            margin: 10mm; /* Memberikan margin tipis agar tidak terpotong printer */
          }
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact; 
          }
          /* Memaksa elemen agar tidak terpotong ke halaman baru */
          .print-compact {
            page-break-inside: avoid;
          }
          /* Sembunyikan elemen global website */
          nav, footer, header, .no-print { 
            display: none !important; 
          }
        }
      `}} />

      <main className="min-h-screen bg-[#EEF2F7] py-10 px-4 print:bg-white print:py-0 print:px-0">
        <div className="max-w-4xl mx-auto mt-[54px] print:mt-0 print:max-w-none">

          <div className="print:hidden mb-6">
            <InvoiceActions />
          </div>

          <div className="relative bg-white overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200 print:shadow-none print:border-none print:rounded-none print-compact">

            {/* LAYER WATERMARK */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none overflow-hidden flex flex-wrap gap-4 justify-center items-center content-center rotate-[-25deg] scale-150 print:opacity-[0.05]">
              {Array.from({ length: 130 }).map((_, i) => (
                <span key={i} className="text-xl font-black uppercase tracking-[0.1em] text-slate-900 whitespace-nowrap">
                  JaBarin
                </span>
              ))}
            </div>

            {/* PAPER CONTAINER */}
            <div className="bg-white overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200 print:shadow-none print:border-none print:rounded-none print-compact">

              {/* HEADER */}
              <div className="bg-gray-900 text-white px-6 py-8 md:px-10 print:py-6 print:px-8 print:rounded-t-3xl">
                <div className="flex flex-col md:flex-row justify-between gap-6 print:flex-row print:justify-between">
                  <div>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-blue-100 font-semibold">
                      Jasa Antar Barang
                    </p>
                    <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight print:text-3xl print:mt-1">
                      INVOICE
                    </h1>
                    <p className="mt-2 text-xs md:text-sm text-blue-100 leading-relaxed max-w-xs print:text-[11px] print:mt-1">
                      Bukti resmi pembayaran dan detail pengiriman pesanan.
                    </p>
                  </div>

                  <div className="md:text-right space-y-2 md:space-y-4 print:space-y-1 print:text-right">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-blue-200 mb-1">Invoice Number</p>
                      <p className="font-bold text-sm md:text-lg break-all print:text-xs">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-blue-200 mb-1">Tanggal</p>
                      <p className="text-xs md:text-sm font-medium print:text-xs">
                        {new Date(order.created_at).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BODY */}
              <div className="p-6 md:p-10 space-y-8 md:space-y-10 print:p-8 print:space-y-5">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
                  <div>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-4 print:mb-2">
                      Ditagihkan Kepada
                    </p>
                    <div className="space-y-1">
                      <p className="text-xl md:text-2xl font-bold text-slate-900 print:text-lg">{order.user?.name || "-"}</p>
                      <p className="text-sm text-slate-500 print:text-xs">{order.user?.email || "-"}</p>
                      <p className="text-sm text-slate-600 pt-1 print:text-xs print:pt-0">{order.user?.phone || "-"}</p>
                    </div>
                  </div>

                  <div className="md:text-right print:text-right">
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-4 print:mb-2">
                      Informasi Pembayaran
                    </p>
                    <div className="space-y-3 print:space-y-1">
                      <div>
                        <p className="text-xs text-slate-400 mb-1 capitalize print:text-[9px]">Status Pembayaran</p>
                        <div className="inline-flex px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase print:bg-transparent print:border-none print:p-0 print:text-sm">
                          {paymentStatus[order.payment_status] || order.payment_status}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1 capitalize print:text-[9px]">Metode Pembayaran</p>
                        <p className="text-sm font-semibold text-slate-800 uppercase print:text-xs">{order.payment_method || "MIDTRANS"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 print:border-slate-100">
                  <div className="hidden md:grid grid-cols-12 bg-slate-50 px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b print:grid">
                    <div className="col-span-5">Deskripsi</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Jarak</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 px-6 py-6 items-center gap-4 md:gap-0 print:grid-cols-12 print:py-3 print:gap-0">
                    <div className="col-span-5">
                      <p className="font-bold text-slate-900 text-sm md:text-base print:text-sm">Pengiriman {order.vehicle}</p>
                      <p className="text-xs text-slate-500 mt-1 print:hidden">Layanan pengiriman paket cepat.</p>
                    </div>
                    <div className="col-span-2 text-left md:text-center text-sm font-semibold text-slate-700 print:text-center print:text-xs">
                      <span className="md:hidden print:hidden text-slate-400 font-normal">Qty: </span>1
                    </div>
                    <div className="col-span-2 text-left md:text-right text-sm font-semibold text-slate-700 print:text-right print:text-xs">
                      <span className="md:hidden print:hidden text-slate-400 font-normal">Jarak: </span>
                      {Number(order.distance).toFixed(1).replace(".0", "")} km
                    </div>
                    <div className="col-span-3 text-left md:text-right font-bold text-slate-900 text-lg print:text-base print:text-right">
                      <span className="md:hidden print:hidden text-slate-400 font-normal text-sm block mb-1 uppercase tracking-tighter text-[10px]">Total</span>
                      Rp {order.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                {/* ROUTE INFO - Diatur agar selalu 2 kolom saat print */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 print:bg-transparent print:p-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 print:mb-1">Titik Jemput</p>
                    <p className="text-xs leading-relaxed text-slate-700 print:text-[10px]">{order.pickup_address}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 print:bg-transparent print:p-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 print:mb-1">Tujuan Pengiriman</p>
                    <p className="text-xs leading-relaxed text-slate-700 print:text-[10px]">{order.destination_address}</p>
                  </div>
                </div>


                {/* CALCULATION */}
                <div className="border-t border-dashed border-slate-200 pt-6 print:pt-4">
                  <div className="max-w-[320px] md:max-w-sm ml-auto space-y-3 print:space-y-1">

                    {/* Rincian Jarak */}
                    <div className="flex justify-between text-sm text-slate-600 font-medium print:text-[12px]">
                      <span className="text-slate-400 text-xs print:text-[12px]">
                        Biaya Layanan ({Number(order.distance).toFixed(1)} km × Rp {pricePerKm.toLocaleString("id-ID")})
                      </span>
                      <span>Rp {servicePrice.toLocaleString("id-ID")}</span>
                    </div>

                    {/* Biaya Admin */}
                    <div className="flex justify-between text-sm text-slate-600 font-medium print:text-[12px]">
                      <span className="text-slate-400 text-xs print:text-[12px]">Biaya Admin & Aplikasi</span>
                      <span>Rp {ADMIN_FEE.toLocaleString("id-ID")}</span>
                    </div>

                    {/* Garis Pemisah Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200 print:pt-2">
                      <span className="text-sm md:text-base font-bold text-slate-900 print:text-sm">
                        Total Akhir
                      </span>
                      <div className="text-right">
                        <span className="text-2xl md:text-3xl font-black text-gray-800 print:text-xl block">
                          Rp {order.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider print:hidden">
                          Lunas Terbayar
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* FOOTER INVOICE */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4 text-center md:text-left print:flex-row print:pt-4 print:text-left">
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0 print:mx-0 print:text-[9px]">
                    Invoice ini sah secara elektronik dan berlaku sebagai bukti pembayaran resmi.
                  </p>
                  <div className="md:text-right print:text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Jasa Antar Barang</p>
                    <p className="text-xs font-semibold text-slate-700 print:text-[10px]">Reliable Delivery</p>
                  </div>
                </div>

              </div>
            </div>
            </div>
          </div>
      </main>
    </>
  );
}