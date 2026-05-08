-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'DRIVER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';
