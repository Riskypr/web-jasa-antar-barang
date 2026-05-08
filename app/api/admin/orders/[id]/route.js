import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  try {
    // Jalankan dalam transaksi agar integritas data terjaga
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update status order
      const updatedOrder = await tx.order.update({
        where: { id },
        data: { order_status: status },
      });

      // 2. Catat aktivitas admin
      await tx.activityLog.create({
        data: {
          userId: "id-admin-anda", // Ambil dari session di aplikasi nyata
          action: "UPDATE_ORDER",
          details: `Mengubah status Order #${id.slice(0,5)} menjadi ${status}`,
        }
      });

      return updatedOrder;
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Gagal update order" }, { status: 500 });
  }
}