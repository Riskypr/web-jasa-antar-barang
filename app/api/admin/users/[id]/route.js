import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// DELETE USER
// =========================
export async function DELETE(
  req,
  context
) {
  try {
    // FIX NEXTJS PARAMS
    const { id } = await context.params;

    // =========================
    // CHECK USER
    // =========================
    const targetUser =
      await prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pelanggan tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // TRANSACTION
    // =========================
    await prisma.$transaction(
      async (tx) => {
        // ACTIVITY LOG
        await tx.activityLog.create({
          data: {
            // sementara pakai target user
            // nanti ganti admin session id
            userId: targetUser.id,

            action: "DELETE_USER",

            entityType: "USER",

            entityId: targetUser.id,

            details: `Menghapus pelanggan ${targetUser.name} (${targetUser.email})`,
          },
        });

        // DELETE USER
        await tx.user.delete({
          where: {
            id,
          },
        });
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Pelanggan berhasil dihapus",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat menghapus pelanggan",
      },
      {
        status: 500,
      }
    );
  }
}