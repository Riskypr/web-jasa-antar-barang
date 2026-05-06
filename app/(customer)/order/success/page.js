'use client';
export const dynamic = 'force-dynamic'; 

import OrderSuccessClient from '@/components/order/OrderSuccessClient';
import { Suspense } from 'react';

export default function SuccessPage() {
  return (
    <Suspense>
      <OrderSuccessClient />
    </Suspense>
  );
}