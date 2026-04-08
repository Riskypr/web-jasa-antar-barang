import { MapPin, Clock, ShieldCheck, HandCoins } from "@/icons";

export default function Features() {
  return (
    <section className="py-12 px-4 ">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          
          <div className="hidden lg:block">
            <img
              src="jasa-pengiriman.jpg"
              alt="jasa pengiriman"
              className="w-full rounded-2xl shadow-md"
            />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
              Kelebihan layanan kami
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Kenapa harus pakai layanan kami?
            </h2>

            <div className="mt-4 lg:hidden">
              <img
                src="jasa-pengiriman.jpg"
                alt="jasa-pengiriman Map"
                className="w-full rounded-2xl shadow-md"
              />
            </div>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Nikmati pengalaman kirim barang yang lebih praktis, cepat, dan transparan dengan berbagai keunggulan berikut.
            </p>

            <div className="mt-8 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <MapPin className="text-gray-600" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Tracking Lokasi Real-Time
                  </h3>
                  <p className="text-sm text-slate-600">
                    Pantau posisi driver langsung melalui peta secara akurat dan realtime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <Clock className="text-gray-600" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Proses Cepat & Praktis
                  </h3>
                  <p className="text-sm text-slate-600">
                    Pesan layanan hanya dalam beberapa langkah tanpa proses yang rumit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <ShieldCheck className="text-gray-600" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Aman & Terpercaya
                  </h3>
                  <p className="text-sm text-slate-600">
                    Driver terverifikasi dan sistem keamanan yang menjaga barang tetap aman.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <HandCoins className="text-gray-600" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Harga Transparan
                  </h3>
                  <p className="text-sm text-slate-600">
                    Estimasi biaya langsung terlihat tanpa biaya tersembunyi.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}