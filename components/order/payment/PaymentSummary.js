"use client";

import { useState } from "react";

import PaymentHeader from "./PaymentHeader";
import VehicleCard from "./VehicleCard";
import RouteCard from "./RouteCard";
import PaymentDetailCard from "./PaymentDetailCard";
import PayButton from "./PayButton";
import { calculateOrderPrice }
from "@/utils/pricing";

export default function PaymentSummary({
  orderData,
  onBack,
  onConfirmPayment,
}) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    if (loading) return;

    try {
      setLoading(true);

      await onConfirmPayment?.();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex-1 mt-24 mb-12 px-4">
        <div className="max-w-2xl mx-auto">

          <PaymentHeader
            onBack={onBack}
            loading={loading}
          />

          <div className="space-y-4">

            <VehicleCard
              vehicle={orderData.vehicle}
            />

            <RouteCard
              pickup={orderData.pickup}
              destination={orderData.destination}
              distance={orderData.distance}
            />

            <PaymentDetailCard
              vehicle={orderData.vehicle}
              price={orderData.price}
              adminFee={orderData.adminFee}
            />

            <PayButton
              loading={loading}
              onClick={handlePayment}
            />

          </div>
        </div>
      </div>
    </main>
  );
}