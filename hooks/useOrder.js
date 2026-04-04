import { useState, useEffect } from "react";
import { getDistance, getAddress } from "@/services/api";

export default function useOrder(points) {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (points.length < 2) return;

      try {
        // distance + ETA
        const res = await getDistance(points[0], points[1]);

        setDistance(res.data.distance);
        setDuration(res.data.duration);

        // alamat jemput
        const pickup = await getAddress(points[0].lat, points[0].lng);
        setPickupAddress(pickup.data.address);

        // delay waktu aman
        await new Promise((r) => setTimeout(r, 500));

        // alamat tujuan
        const dest = await getAddress(points[1].lat, points[1].lng);
        setDestinationAddress(dest.data.address);

      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [points]);

  return {
    distance,
    duration,
    pickupAddress,
    destinationAddress,
  };
}