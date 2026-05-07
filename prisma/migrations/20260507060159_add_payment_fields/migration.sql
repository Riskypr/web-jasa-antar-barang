-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_method" TEXT,
ADD COLUMN     "payment_type" TEXT,
ADD COLUMN     "snap_token" TEXT,
ADD COLUMN     "transaction_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
