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
    <div className="bg-white rounded-2xl shadow-lg p-5 mt-4">

      <h3 className="font-semibold mb-3">Perjalanan</h3>

      {/* Timeline */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full">
            
          </div>
          <div className="w-0.5 h-12 bg-gray-300"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>

        <div className="text-sm text-gray-700">
          <div>
            <p className="font-medium">Jemput</p>
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
        <p className="text-sm text-gray-500">
          Tarif: Rp 3.000 / km
        </p>

        <p className="text-sm text-gray-500">
          Jarak: {distance ? distance.toFixed(2) : "-"} km
        </p>

        <p className="text-sm text-gray-500">
          Estimasi: {duration ? duration.toFixed(0) : "-"} menit
        </p>

        <h2 className="text-xl font-bold mt-2">
          {distance ? `Rp ${harga.toLocaleString()}` : "Menunggu titik..."}
        </h2>
      </div>

      <button
        onClick={onPay}
        disabled={!distance}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-300"
      >
        Bayar Sekarang
      </button>
    </div>
  );
}