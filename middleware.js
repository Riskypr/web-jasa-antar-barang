import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  // PUBLIC ROUTES
  const publicRoutes = [
    "/login",
    "/register",
  ];

  // ALLOW PUBLIC ROUTE
  if (
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // NO TOKEN
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  try {
    // VERIFY TOKEN
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(
      token,
      secret
    );

    // =========================
    // ROLE GUARD
    // =========================

    // ADMIN ONLY
    if (
      pathname.startsWith("/admin") &&
      payload.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    // DRIVER ONLY
    if (
      pathname.startsWith("/driver") &&
      payload.role !== "DRIVER"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    // CUSTOMER BLOCK ADMIN PAGE
    if (
      pathname.startsWith("/admin") &&
      payload.role === "CUSTOMER"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    return NextResponse.next();

  } catch (err) {
    console.error("Middleware Error:", err);

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/driver/:path*",
    "/order/:path*",
    "/profile/:path*",
  ],
};