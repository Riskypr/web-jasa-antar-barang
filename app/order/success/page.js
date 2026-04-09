'use client';
export const dynamic = 'force-dynamic'; // hindari prerender -> build aman

import OrderSuccessClient from '@/components/OrderSuccessClient';
import { Suspense } from 'react';

export default function SuccessPage() {
  return (
    <Suspense>
      <OrderSuccessClient />
    </Suspense>
  );
}