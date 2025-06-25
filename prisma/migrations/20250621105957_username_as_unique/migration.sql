/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Uom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uomName` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemName` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `uomId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` DOUBLE NULL,
    `thresholdQty` DOUBLE NULL,
    `uomId` INTEGER NULL,
    `itemId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consumption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uomId` INTEGER NULL,
    `itemId` INTEGER NULL,
    `consumedQty` DOUBLE NULL,
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consumption` ADD CONSTRAINT `consumption_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consumption` ADD CONSTRAINT `consumption_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
