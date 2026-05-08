import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth'; // Sesuaikan sistem auth Anda

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // 1. Ambil info admin yang sedang login (Contoh menggunakan session)
    // const session = await getServerSession(authOptions);
    // const adminId = session.user.id;

    // 2. Ambil data user sebelum dihapus untuk detail log
    const targetUser = await prisma.user.findUnique({ where: { id } });

    if (!targetUser) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    // 3. Transaksi: Hapus User & Catat Log
    await prisma.$transaction([
      prisma.user.delete({ where: { id } }),
      prisma.activityLog.create({
        data: {
          userId: "id-admin-anda", // Ganti dengan ID Admin dari session
          action: "DELETE_USER",
          details: `Menghapus pelanggan: ${targetUser.name} (${targetUser.email})`,
        }
      })
    ]);

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}