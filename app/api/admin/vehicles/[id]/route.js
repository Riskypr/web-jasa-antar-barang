import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const { id } = await params; 
    
    const body = await req.json();

    const vehicle = await prisma.vehicle.update({
      where: { id: id },
      data: {
        name: body.name,
        type: body.type,
        description: body.description || null,
        icon: body.icon || null,
        basePrice: parseInt(body.basePrice) || 0,
        pricePerKm: parseInt(body.pricePerKm) || 0,
        maxWeight: body.maxWeight ? parseFloat(body.maxWeight) : null,
        isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("UPDATE_ERROR:", error);
    return NextResponse.json(
      { message: "Gagal update armada" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ message: "ID tidak ditemukan" }, { status: 400 });
    }

    await prisma.vehicle.delete({
      where: { id: id },
    });

    return NextResponse.json({
      message: "Armada berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus armada" },
      { status: 500 }
    );
  }
}