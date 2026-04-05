import { Package, ArrowRight, MapPin, HandCoins } from "@/components/icons";

export default function Hero() {
  return (
    <section
      className="relative py-20 px-4 mt-5 bg-cover bg-center bg-no-repeat h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/hero.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-center w-full">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/50 px-3 py-1 text-sm font-semibold text-slate-700 border border-white/20">
              <Package size={16} />
              Jasa antar Barang
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Kirim barang lebih mudah dengan kontrol peta yang jelas
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-200">
              Pilih titik jemput dan tujuan langsung di MapPicker, lihat estimasi jarak, dan selesaikan pesanan tanpa bingung.
            </p>

            <div className="mt-8 items-center">
              <a
                href="/order"
                className="inline-flex items-center justify-center gap-2 rounded-xl lg:rounded-full border border-white bg-white px-6 py-4 text-md shadow-md font-semibold text-black transition hover:bg-gray-200 group"
              >
                Mulai Pesan
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </a>

              {/* <p className="text-sm text-gray-200 hidden">
                Tampilan ringan, proses cepat, tanpa tampilan yang terlalu ramai.
              </p> */}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-slate/20 bg-slate/10 backdrop-blur-sm p-6 md:p-4 flex items-start gap-4">
              <div className="bg-white text-black p-3 rounded-xl">
                <HandCoins size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-200">
                  Transparan
                </p>
                <p className="text-md lg:text-lg font-semibold text-white">
                  Harga jelas, tanpa kejutan
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate/20 bg-slate/10 backdrop-blur-sm p-6 md:p-4 flex items-start gap-4">
              <div className="bg-white text-black p-3 rounded-xl">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-200">
                  Cepat & terpercaya
                </p>
                <p className="text-md lg:text-lg font-semibold text-white">
                  Estimasi ongkos langsung di peta
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}