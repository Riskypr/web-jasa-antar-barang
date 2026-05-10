import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      email,
      phone,
      currentPassword,
      newPassword,
    } = body;

    // =========================
    // CHECK USER
    // =========================
    const admin =
      await prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // CHECK DUPLICATE
    // =========================
    const duplicateUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              phone,
            },
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
            duplicateUser.email ===
            email
              ? "Email sudah digunakan"
              : "Nomor telepon sudah digunakan",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================
    let hashedPassword =
      admin.password;

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Password lama wajib diisi",
          },
          {
            status: 400,
          }
        );
      }

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          admin.password
        );

      if (!isMatch) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Password lama salah",
          },
          {
            status: 400,
          }
        );
      }

      hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );
    }

    // =========================
    // UPDATE USER
    // =========================
    const updatedAdmin =
      await prisma.user.update({
        where: {
          id,
        },

        data: {
          name,
          email,
          phone,
          password:
            hashedPassword,
        },
      });

    // =========================
    // ACTIVITY LOG
    // =========================
    await prisma.activityLog.create({
      data: {
        userId: updatedAdmin.id,

        action: "UPDATE_PROFILE",

        entityType: "USER",

        entityId:
          updatedAdmin.id,

        details: `${updatedAdmin.name} memperbarui profil admin`,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Profil berhasil diperbarui",

      user: updatedAdmin,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}