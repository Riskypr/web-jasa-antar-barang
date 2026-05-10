import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// UPDATE DRIVER
// =========================
export async function PUT(req, context) {
  try {
    // FIX NEXTJS PARAMS
    const { id } = await context.params;

    const body = await req.json();

    const {
      name,
      email,
      phone,
      status,

      vehicleType,

      licenseNumber,
      identityNumber,

      isOnline,
      isVerified,

      totalDeliveries,
    } = body;

    // =========================
    // CHECK DRIVER
    // =========================
    const existingDriver =
      await prisma.user.findUnique({
        where: {
          id,
        },

        include: {
          driverProfile: true,
        },
      });

    if (!existingDriver) {
      return NextResponse.json(
        {
          message: "Driver tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // =========================
    // VALIDATE UNIQUE EMAIL/PHONE
    // =========================
    const duplicateUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { phone },
          ],

          NOT: {
            id,
          },
        },
      });

    if (duplicateUser) {
      return NextResponse.json(
        {
          success: false,

          message:
            duplicateUser.email === email
              ? "Email sudah digunakan"
              : "Nomor telepon sudah digunakan",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // UPDATE USER + PROFILE
    // =========================
    await prisma.$transaction(async (tx) => {
      // UPDATE USER
      await tx.user.update({
        where: {
          id,
        },

        data: {
          name,
          email,
          phone,
          status,
        },
      });

      // UPDATE DRIVER PROFILE
      if (existingDriver.driverProfile) {
        await tx.driverProfile.update({
          where: {
            userId: id,
          },

          data: {
            vehicleType,
            licenseNumber,
            identityNumber,
            isOnline,
            isVerified,
            totalDeliveries:
              Number(totalDeliveries),
          },
        });
      }

      // ACTIVITY LOG
      await tx.activityLog.create({
        data: {
          userId: id,
          action: "UPDATE_DRIVER",

          details: `Driver ${name} berhasil diperbarui`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message:
        "Data driver berhasil diperbarui",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat update driver",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// DELETE DRIVER
// =========================
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.$transaction(async (tx) => {
      // =========================
      // GET DRIVER
      // =========================
      const driver = await tx.user.findUnique({
        where: { id },
      });

      if (!driver) {
        throw new Error("Driver tidak ditemukan");
      }

      // =========================
      // CREATE LOG DULU
      // =========================
      await tx.activityLog.create({
        data: {
          userId: driver.id,
          action: "DELETE_DRIVER",
          entityType: "USER",
          entityId: driver.id,
          details: `Driver ${driver.name} dihapus`,
        },
      });

      // =========================
      // DELETE DRIVER
      // =========================
      await tx.user.delete({
        where: { id },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Driver berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus driver",
      },
      {
        status: 500,
      }
    );
  }
}