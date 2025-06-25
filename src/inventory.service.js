const express = require('express');
const inventory = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


inventory.post('/', async (req, res) => {

    const { docId, date, inventoryItems } = req.body;
    try {
        const inventoryData = await prisma.inventory.create({
            data: {
                docId,
                date: new Date(),
                inventoryItems: {
                    create: inventoryItems.map(item => ({
                        itemId: parseInt(item.itemId),
                        qty: parseFloat(item.qty),
                        thresholdQty: parseFloat(item.thresholdQty),
                        uomId: parseInt(item.uomId),
                        stock: {
                            create: {
                                itemId: parseInt(item.itemId),
                                qty: parseFloat(item.qty),
                                uomId: parseInt(item.uomId),
                            }
                        }
                    })),
                },

            },
        });

        res.status(200).json(inventoryData);

    } catch (error) {
        console.log("DB Error:", error);
        res.status(500).send('Inventory Save Error');
    }
});


async function reOrderDate(uomId, itemId, thresholdQty, stockQty) {

    try {
        let reOrderData = `select uomId, itemId,consumedQty, date  from consumptionItems  
where itemId=${itemId} and uomId=${uomId}`
        reOrderData = await prisma.$queryRawUnsafe(reOrderData);
        let lastConsumedQty = reOrderData?.[reOrderData?.length - 1]?.consumedQty
        let lastConsumedDate = reOrderData?.[reOrderData?.length - 1]?.date

        lastConsumedDate = new Date(lastConsumedDate)

        let today = new Date();
        let stockDays = parseInt(parseInt(stockQty) / parseInt(lastConsumedQty || 0))


        let reOrderDate
        if (lastConsumedDate) {
            lastConsumedDate.setDate(lastConsumedDate.getDate() + parseInt(stockDays || 0));
            const day = String(lastConsumedDate.getDate()).padStart(2, '0');
            const month = String(lastConsumedDate.getMonth() + 1).padStart(2, '0');
            const year = lastConsumedDate.getFullYear();

            reOrderDate = `${day}-${month}-${year}`;
        }
        reOrderDate = reOrderDate ? reOrderDate : ""
        return reOrderDate


    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw new Error('Failed to fetch stock data');
    }

}


async function getStockData() {

    try {
        let stockData = `select stock.uomId, stock.itemId,item.thresholdQty, sum(stock.qty) as qty  from stock  left join item on item.id=stock.itemid 
where itemId is not null group by uomId, itemId`
        stockData = await prisma.$queryRawUnsafe(stockData);

        let stockDataWithStatus = [];

        for (let i = 0; i < stockData.length; i++) {
            let item = stockData[i];
            let newObj = {
                ...item, isOutOfStock: parseFloat(item.qty) <= 0,
                isHighStock: parseFloat(item.qty) > parseFloat(item.thresholdQty),
                isLowStock: (parseFloat(item.qty) === parseFloat(item.thresholdQty) || ((parseFloat(item.qty) < parseFloat(item.thresholdQty)) && (parseFloat(item.qty) !== 0))),
                reOrderDate: await reOrderDate(item.uomId, item.itemId, item.thresholdQty, item.qty)
            }
            stockDataWithStatus.push(newObj);
        }
        return stockDataWithStatus;

    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw new Error('Failed to fetch stock data');
    }
}

inventory.get('/', async (req, res) => {
    try {
        let inventoryData = await prisma.inventory.findMany({
        });

        let inventoryWithStock = { inventoryData: inventoryData, stockData: await getStockData() };
        res.status(201).json(inventoryWithStock);
    } catch (error) {
        console.log("DB Error get:", error);
        res.status(500).send('Get Inventory Error');
    }
});


inventory.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const inventoryData = await prisma.inventory.findUnique({

            where: {
                id: parseInt(id),
            },
            include: {
                inventoryItems: {
                    include: {
                        Item: true,
                        Uom: true,
                    },
                },
            },
        });
        res.status(201).json(inventoryData);
    } catch (error) {

        console.log("DB Error get:", error);
        res.status(500).send('Get Inventory Error');
    }
});




inventory.put('/:id', async (req, res) => {

    const { docId, date, inventoryItems } = req.body;
    const id = req.params.id;

    try {
        const inventoryDataOld = await prisma.inventory.findUnique({

            where: {
                id: parseInt(id),
            },
        });

        if (!inventoryDataOld) return NoRecordFound("Inventory");

        const inventoryData = await prisma.inventory.update({
            where: {
                id: parseInt(id),
            },
            data: {
                docId,
                date: new Date(),
                inventoryItems: {
                    deleteMany: {},
                    create: inventoryItems.map(item => ({
                        itemId: parseInt(item.itemId),
                        qty: parseFloat(item.qty),
                        thresholdQty: parseFloat(item.thresholdQty),
                        uomId: parseInt(item.uomId),
                        stock: {
                            create: {
                                itemId: parseInt(item.itemId),
                                qty: parseFloat(item.qty),
                                uomId: parseInt(item.uomId),
                            }
                        }
                    })),
                },

            },

        })
        res.status(201).json(inventoryData);
    } catch (error) {

        res.status(500).send('Error update user');
    }
});


inventory.delete("/:id", async (req, res) => {
    const id = req.params.id
    const inventoryData = await prisma.inventory.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.status(200).json(inventoryData);
})




module.exports = inventory

