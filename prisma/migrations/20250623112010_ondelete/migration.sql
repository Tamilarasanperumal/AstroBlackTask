-- DropForeignKey
ALTER TABLE `consumptionitems` DROP FOREIGN KEY `ConsumptionItems_consumptionId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryitems` DROP FOREIGN KEY `InventoryItems_inventoryId_fkey`;

-- AddForeignKey
ALTER TABLE `InventoryItems` ADD CONSTRAINT `InventoryItems_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumptionItems` ADD CONSTRAINT `ConsumptionItems_consumptionId_fkey` FOREIGN KEY (`consumptionId`) REFERENCES `Consumption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
