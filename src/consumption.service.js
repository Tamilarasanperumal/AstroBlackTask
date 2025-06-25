const express = require('express');
const consumption = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


consumption.post('/', async (req, res) => {

    const { docId, consumptionItems } = req.body;

    try {
        const consumptionData = await prisma.consumption.create({
            data: {
                docId,
                docDate: new Date(),
                consumptionItems: {
                    create: consumptionItems.map(item => ({
                        itemId: parseInt(item.itemId),
                        consumedQty: parseFloat(item.consumedQty),
                        uomId: parseInt(item.uomId),
                        date: new Date(item.date),
                        stock: {
                            create: {
                                itemId: parseInt(item.itemId),
                                qty: item?.consumedQty ? 0 - parseFloat(item.consumedQty) : undefined,
                                uomId: parseInt(item.uomId),
                            }
                        }
                    })),
                },

            },
        });

        res.status(200).json(consumptionData);

    } catch (error) {
        console.log("DB Error:", error);
        res.status(500).send('Consumption Save Error');
    }
});


consumption.get('/', async (req, res) => {
    try {
        const consumptionData = await prisma.consumption.findMany({
        });
        res.status(201).json(consumptionData);
    } catch (error) {

        res.status(500).send('Get consumption Error');
    }
});




consumption.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const consumptionData = await prisma.consumption.findUnique({

            where: {
                id: parseInt(id),
            },
            include: {
                consumptionItems: {
                    include: {
                        Item: true,

                    },
                },
            },
        });


        if (!consumptionData) return res.status(404).send('No Record Found');

        res.status(201).json(consumptionData);
    } catch (error) {

        console.log("DB Error get:", error);
        res.status(500).send('Get consumption Error');
    }
});




consumption.put('/:id', async (req, res) => {

    const { docId, consumptionItems } = req.body;
    const id = req.params.id;

    try {
        const consumptionDataOld = await prisma.consumption.findUnique({

            where: {
                id: parseInt(id),
            },
        });

        if (!consumptionDataOld) return NoRecordFound("Consumption");

        const consumptionData = await prisma.consumption.update({
            where: {
                id: parseInt(id),
            },
            data: {
                docId,
                docDate: new Date(),
                consumptionItems: {
                    deleteMany: {},
                    create: consumptionItems.map(item => ({
                        itemId: parseInt(item.itemId),
                        uomId: parseInt(item.uomId),
                        consumedQty: parseFloat(item.consumedQty),
                        date: new Date(item.date),
                        stock: {
                            create: {
                                itemId: parseInt(item.itemId),
                                qty: item?.consumedQty ? 0 - parseFloat(item.consumedQty) : undefined,
                                uomId: parseInt(item.uomId),
                            }
                        }
                    })),
                },

            },

        })
        res.status(201).json(consumptionData);
    } catch (error) {
        console.log("DB Error update:", error);
        res.status(500).send('Error update user');
    }
});


consumption.delete("/:id", async (req, res) => {
    const id = req.params.id
    const consumptionData = await prisma.consumption.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.status(200).json(consumptionData);
})




module.exports = consumption

