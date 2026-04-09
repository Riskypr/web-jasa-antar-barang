export async function POST(req) {
  const { lat, lng } = await req.json();

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "jasa-antar-app (your@email.com)",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Gagal fetch");
    }

    const data = await res.json();

    const addr = data.address || {};

    //  format alamat lebih clean
    const jalan =
      addr.road ||
      addr.pedestrian ||
      addr.residential ||
      addr.neighbourhood ||
      "";

    const kota =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.county ||
      "";

    const hasil = [jalan, kota].filter(Boolean).join(", ");

    return Response.json({
      address: hasil || "Alamat tidak ditemukan",
    });

  } catch (err) {
    return Response.json({
      address: "Alamat tidak ditemukan",
    });
  }
}