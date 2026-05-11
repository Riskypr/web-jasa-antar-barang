"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/order/OrderCard";
import PaymentSummary from "@/components/order/payment/PaymentSummary";
import useOrder from "@/hooks/useOrder";
import { getCurrentUser } from "@/services/auth";
import { vehicleIcons } from "@/utils/vehicleIcons";

import {
  ADMIN_FEE,
  calculateVehiclePrice,
  calculateTotalPrice,
} from "@/utils/pricing";

import { createOrder } from "@/services/orderService";
import { createOrderPayment } from "@/services/paymentService";

const MapPicker = dynamic(
  () => import("@/components/MapPicker"),
  { ssr: false }
);


export default function OrderPage() {
  const router = useRouter();
  const [vehicles, setVehicles] =
    useState([]);
  const [points, setPoints] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const {
    distance,
    duration,
    pickupAddress,
    destinationAddress,
  } = useOrder(points);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch(
          "/api/vehicles"
        );

        const data = await res.json();

        setVehicles(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchVehicles();
  }, []);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  function handleProceedToPayment() {
    if (!distance || !selectedVehicle) {
      return;
    }

    setShowPayment(true);
  }

  async function handleFinalPay() {
    try {
      const order = await createOrder({
        vehicleId: selectedVehicle.id,

        pickupAddress,
        destinationAddress,

        distance,
        duration,
      });

      const redirectUrl = await createOrderPayment(
        order.totalPrice,
        order.id
      );

      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
    }
  }

  if (showPayment) {
    return (
      <PaymentSummary
        orderData={{
          vehicle: selectedVehicle.name,
          pickup: pickupAddress,
          destination: destinationAddress,
          distance,
          price: calculateVehiclePrice(
            distance,
            selectedVehicle.pricePerKm,
            selectedVehicle.basePrice
          ),
          adminFee: ADMIN_FEE,
        }}
        onBack={() => setShowPayment(false)}
        onConfirmPayment={handleFinalPay}
      />
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">

      <div className="flex-1 px-4 lg:px-12 py-8 mt-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 h-[500px] rounded-2xl overflow-hidden border bg-white shadow-inner">
            <MapPicker setPoints={setPoints} />
          </div>

          <div className="space-y-4 md:sticky md:top-24 h-fit">

            <div className="bg-white rounded-2xl p-4 border shadow-sm">

              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Pilih Armada
              </h2>

              <div className="space-y-2">

                {vehicles.map((vehicle) => {
                  const Icon =
                    vehicleIcons[vehicle.type];

                  const isSelected =
                    selectedVehicle?.id ===
                    vehicle.id;

                  return (
                    <button
                      key={vehicle.id}
                      onClick={() =>
                        setSelectedVehicle(vehicle)
                      }
                      className={`
        w-full flex items-center justify-between
        p-3 rounded-xl transition-all duration-200
        ${isSelected
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }
      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
            p-2 rounded-full
            ${isSelected
                              ? "bg-white/20"
                              : "bg-white"
                            }
          `}
                        >
                          {Icon && <Icon size={18} />}
                        </div>

                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            {vehicle.name}
                          </p>

                          <p
                            className={`
              text-xs
              ${isSelected
                                ? "text-gray-300"
                                : "text-gray-500"
                              }
            `}
                          >
                            {vehicle.description}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold">
                        Rp{" "}
                        {vehicle.pricePerKm.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </button>
                  );
                })}

              </div>
            </div>

            <div className="bg-white rounded-2xl border p-4 shadow-sm">
              <OrderCard
                distance={distance}
                duration={duration}
                pickupAddress={pickupAddress}
                destinationAddress={destinationAddress}
                onPay={handleProceedToPayment}
                vehicle={selectedVehicle}
              />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}