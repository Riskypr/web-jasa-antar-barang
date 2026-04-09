import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function PUT(req) {
  try {
    const cookie = req.headers.get("cookie");

    if (!cookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Token tidak valid' }, { status: 401 });
    }

    const { name, email, phone } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Nama dan email wajib diisi' },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: decoded.userId },
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email sudah digunakan' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name, email, phone },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    return NextResponse.json({
      message: 'Profile berhasil diupdate',
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}