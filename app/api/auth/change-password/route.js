import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Token tidak valid' }, { status: 401 });
    }

    const { password } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // 🔥 hash password baru
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 update ke database
    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: 'Password berhasil diubah',
    });

  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}