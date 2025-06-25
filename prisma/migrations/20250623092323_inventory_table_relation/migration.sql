-- DropForeignKey
ALTER TABLE `consumptionitems` DROP FOREIGN KEY `consumptionItems_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `consumptionitems` DROP FOREIGN KEY `consumptionItems_uomId_fkey`;

-- AlterTable
ALTER TABLE `consumptionitems` ADD COLUMN `consumptionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `inventoryitems` ADD COLUMN `inventoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumptionItems` ADD CONSTRAINT `ConsumptionItems_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumptionItems` ADD CONSTRAINT `ConsumptionItems_consumptionId_fkey` FOREIGN KEY (`consumptionId`) REFERENCES `Consumption`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumptionItems` ADD CONSTRAINT `ConsumptionItems_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_name_key` TO `User_name_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_password_key` TO `User_password_key`;
