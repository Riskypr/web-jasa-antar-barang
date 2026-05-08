import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ambil data driver sebelum dihapus
      const driver = await tx.user.findUnique({ where: { id } });

      // 2. Hapus driver (role DRIVER)
      await tx.user.delete({ where: { id } });

      // 3. Catat ke Log Aktivitas
      await tx.activityLog.create({
        data: {
          userId: "admin-session-id", // Ganti dengan ID Admin dari session
          action: "DELETE_DRIVER",
          details: `Menonaktifkan driver: ${driver.name} (${driver.phone})`,
        }
      });
    });

    return NextResponse.json({ message: "Driver berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menghapus driver" }, { status: 500 });
  }
}