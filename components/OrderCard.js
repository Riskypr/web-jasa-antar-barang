export default function OrderCard({
  distance,
  duration,
  pickupAddress,
  destinationAddress,
  onPay,
}) {
  const tarif = 3000; // align with payment API
  const harga = distance ? Math.round(distance * tarif + 2000) : 0;

  return (
  <div className="bg-white rounded-t-2xl p-5 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:rounded-2xl md:shadow-lg">

      <h3 className="font-semibold mb-3">Perjalanan</h3>

      {/* Timeline */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex flex-col items-center">
          <img
            src="/pickup.png"
            alt="Jemput"
            className="w-6 h-6"
          />
          <div className="w-0.5 h-12 bg-gray-300"></div>
          <img
            src="/destination.png"
            alt="Tujuan"
            className="w-6 h-6"
          />
        </div>

        <div className="text-sm text-gray-700">
          <div>
            <p className="font-medium">Lokasi Penjemputan</p>
            <p className="text-gray-500 text-xs">
              {pickupAddress || "Menunggu lokasi..."}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-medium">Tujuan</p>
            <p className="text-gray-500 text-xs">
              {destinationAddress || "Menunggu lokasi..."}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="border-t pt-4">
        <div className="rounded-2xl border border-gray-400 bg-gray-100 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700/80">
                Jarak
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {distance ? distance.toFixed(2) : "-"} km
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700/80">
                Estimasi
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {duration ? duration.toFixed(0) : "-"} menit
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-4">
          {distance ? `Rp ${harga.toLocaleString()}` : "..."}
        </h2>
      </div>

      <button
        onClick={onPay}
        disabled={!distance}
        className="w-full mt-4 bg-black text-white font-poppins font-semibold py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-300"
      >
        Order JaBarin
      </button>
    </div>
  );
}