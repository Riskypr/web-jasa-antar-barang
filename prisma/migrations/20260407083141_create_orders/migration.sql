-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL,
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "order_status" TEXT NOT NULL DEFAULT 'menunggu',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
