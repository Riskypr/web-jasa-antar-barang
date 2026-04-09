// // app/order/route.js
// import { prisma } from "@/lib/prisma";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     const cookie = req.headers.get("cookie");

//     if (!cookie) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     const token = cookie
//       .split("; ")
//       .find((c) => c.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     const userId = decoded.userId;

//     const orders = await prisma.order.findMany({
//       where: { userId },
//       orderBy: { created_at: "desc" },
//     });

//     return NextResponse.json(orders);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json([], { status: 500 });
//   }
// }