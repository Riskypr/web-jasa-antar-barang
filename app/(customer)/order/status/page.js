"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import OrderStatusClient from "@/components/order/OrderStatusClient";

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatusClient />
    </Suspense>
  );
}