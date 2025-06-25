-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uomId` INTEGER NULL,
    `qty` DOUBLE NULL,
    `inventoryItemsId` INTEGER NULL,
    `consumptionItemsId` INTEGER NULL,
    `itemId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_uomId_fkey` FOREIGN KEY (`uomId`) REFERENCES `Uom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_inventoryItemsId_fkey` FOREIGN KEY (`inventoryItemsId`) REFERENCES `InventoryItems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_consumptionItemsId_fkey` FOREIGN KEY (`consumptionItemsId`) REFERENCES `ConsumptionItems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
