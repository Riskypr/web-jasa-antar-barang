import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // 🔥 ambil token dari cookie
    const cookie = req.headers.get("cookie");

    if (!cookie) {
      // return Response.json([], { status: 401 });
        return Response.redirect(new URL('/login', req.url));
    }

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      // return Response.json([], { status: 401 });
        return Response.redirect(new URL('/login', req.url));
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return Response.json([], { status: 401 });
    }

    const userId = decoded.userId;

    // console.log("USER ID:", userId); //  DEBUG

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { created_at: "desc" },
    });

    return Response.json(orders);
  } catch (err) {
    console.error(err);
    return Response.json([], { status: 500 });
  }
}