/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";
