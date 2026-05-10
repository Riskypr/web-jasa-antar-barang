import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

// =========================
// CREATE DRIVER
// =========================
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      password,

      status,

      vehicleType,

      licenseNumber,
      identityNumber,

      isOnline,
      isVerified,
    } = body;

    // =========================
    // VALIDATION
    // =========================
    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { phone },
          ],
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,

          message:
            existingUser.email === email
              ? "Email sudah digunakan"
              : "Nomor telepon sudah digunakan",
        },
        {
          status: 400,
        }
      );
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // =========================
    // CREATE DRIVER
    // =========================
    const driver =
      await prisma.$transaction(
        async (tx) => {
          const newUser =
            await tx.user.create({
              data: {
                name,
                email,
                phone,

                password:
                  hashedPassword,

                role: "DRIVER",

                status,

                driverProfile: {
                  create: {
                    vehicleType,

                    licenseNumber,
                    identityNumber,

                    isOnline,
                    isVerified,
                  },
                },
              },

              include: {
                driverProfile: true,
              },
            });

          await tx.activityLog.create({
            data: {
              userId: newUser.id,

              action:
                "CREATE_DRIVER",

              details: `Menambahkan driver ${name}`,
            },
          });

          return newUser;
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Driver berhasil ditambahkan",

      data: driver,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal menambahkan driver",
      },
      {
        status: 500,
      }
    );
  }
}