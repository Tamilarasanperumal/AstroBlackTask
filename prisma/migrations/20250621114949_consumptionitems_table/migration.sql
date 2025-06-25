/*
  Warnings:

  - You are about to drop the column `consumedQty` on the `consumption` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `consumption` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `consumption` table. All the data in the column will be lost.
  - You are about to drop the column `uomId` on the `consumption` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdQty` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `uomId` on the `inventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `consumption` DROP FOREIGN KEY `consumption_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `consumption` DROP FOREIGN KEY `consumption_uomId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_uomId_fkey`;

-- AlterTable
ALTER TABLE `consumption` DROP COLUMN `consumedQty`,
    DROP COLUMN `date`,
    DROP COLUMN `itemId`,
    DROP COLUMN `uomId`,
    ADD COLUMN `docDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `itemId`,
    DROP COLUMN `qty`,
    DROP COLUMN `thresholdQty`,
    DROP COLUMN `uomId`,
    ADD COLUMN `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `InventoryItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` DOUBLE NULL,
    `thresholdQty` DOUBLE NULL,
    `uomId` INTEGER NULL,
    `itemId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consumptionItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uomId` INTEGER NULL,
    `itemId` INTEGER NULL,
    `consumedQty` DOUBLE NULL,
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consumptionItems` ADD CONSTRAINT `consumptionItems_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consumptionItems` ADD CONSTRAINT `consumptionItems_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
