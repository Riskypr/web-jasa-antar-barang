import { useState } from 'react';
import { Package, Truck, ShieldCheck, Home, Utensils, Music } from "@/components/icons";

const Features = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      name: "Barang Ukuran Kecil",
      image: "barang-kecil.jpg",
      icon: Package,
      description: "Kirim barang kecil seperti dokumen, surat, aksesoris, dan paket ringan lainnya.",
      details: [
        "Ideal untuk pengiriman cepat dalam kota.",
        "Biaya terjangkau dan aman.",
        "Dilacak secara real-time.",
        "Asuransi dasar tersedia."
      ]
    },
    {
      name: "Barang Besar & Banyak",
      image: "barang-besar.jpg",
      icon: Truck,
      description: "Pengiriman barang besar seperti furniture, peralatan rumah tangga, atau kargo dalam jumlah banyak.",
      details: [
        "Layanan khusus untuk item berukuran besar.",
        "Tim profesional untuk handling.",
        "Pengiriman antar kota tersedia.",
        "Packing dan wrapping aman."
      ]
    },
    {
      name: "Barang Pecah Belah",
      image: "barang-pecah-belah.jpg",
      icon: ShieldCheck,
      description: "Kirim barang rapuh dengan perlindungan maksimal.",
      details: [
        "Packaging anti-pecah.",
        "Asuransi penuh.",
        "Tracking real-time.",
        "Penanganan profesional."
      ]
    },
    {
      name: "Jasa Pindah",
      image: "jasa-pindah.jpg",
      icon: Home,
      description: "Layanan pindahan rumah atau kantor lengkap.",
      details: [
        "Packing & unpacking.",
        "Transportasi aman.",
        "Tim berpengalaman.",
        "Asuransi penuh."
      ]
    },
    {
      name: "Makanan & Bahan Baku",
      image: "bahan-baku.jpg",
      icon: Utensils,
      description: "Pengiriman makanan segar dengan kontrol suhu.",
      details: [
        "Kendaraan suhu terkontrol.",
        "Pengiriman express.",
        "Kemasan aman.",
        "Food grade certified."
      ]
    },
    {
      name: "Hobi & Hiburan",
      image: "alat-musik.jpg",
      icon: Music,
      description: "Kirim alat musik & koleksi dengan aman.",
      details: [
        "Packaging khusus.",
        "Asuransi koleksi.",
        "Prioritas event.",
        "Door-to-door."
      ]
    }
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        <h2 className="text-2xl md:text-[50px] font-bold text-center mb-8 md:mb-16 md:mt-2 text-slate-900">
          Apa yang bisa kami antar untukmu?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-900">
                    Layanan
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-black transition">
                      <Icon className="text-black group-hover:text-white" size={18} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 text-sm font-medium text-black">
                    Lihat detail →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL */}
        {selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative animate-fadeIn">

            {/* CLOSE BUTTON */}
            <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-black hover:text-white transition w-10 h-10 rounded-full flex items-center justify-center text-lg shadow"
            >
                ✕
            </button>

            {/* IMAGE + OVERLAY */}
            <div className="relative">
                <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* TITLE DI ATAS GAMBAR */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                <h3 className="text-2xl font-semibold font-family-sans tracking-tight">
                    {selectedItem.name}
                </h3>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
                <p className="text-gray-900 mb-6 leading-relaxed">
                {selectedItem.description}
                </p>

                {/* LIST KELEBIHAN */}
                <div className="space-y-2 text-sm">
                {selectedItem.details.map((detail, idx) => (
                    <div
                    key={idx}
                    className="flex items-start gap-3 group"
                    >
                    <div className=" flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs group-hover:scale-110 transition">
                        ✓
                        </div>
                    </div>

                    <p className="text-gray-700 group-hover:text-black transition">
                        {detail}
                    </p>
                    </div>
                ))}
                </div>

                {/* BUTTON ACTION */}
                <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
                    Pesan Sekarang
                </button>
                <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                    Tutup
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Features;