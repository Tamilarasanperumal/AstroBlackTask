const express = require('express');
const item = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


item.post('/', async (req, res) => {
    const { itemName, code, uomId, thresholdQty } = req.body;
    try {
        const itemData = await prisma.item.create({
            data: {
                itemName, thresholdQty: parseFloat(thresholdQty),
                code, uomId: parseInt(uomId)
            },
        });
        res.status(200).json(itemData);

    } catch (error) {
        console.log("DB Error:", error);
        res.status(500).send('Item Save Error');
    }
});


item.get('/', async (req, res) => {
    try {
        const itemData = await prisma.item.findMany({
        });
        res.status(201).json(itemData);
    } catch (error) {

        res.status(500).send('Get Item Error');
    }
});


item.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const itemData = await prisma.item.findUnique({

            where: {
                id: parseInt(id),
            },
        });
        res.status(201).json(itemData);
    } catch (error) {
        res.status(500).send('Get Item Error');
    }
});




item.put('/:id', async (req, res) => {

    const { itemName, code, uomId, thresholdQty } = req.body;
    const id = req.params.id;

    try {
        const itemDataOld = await prisma.item.findUnique({

            where: {
                id: parseInt(id),
            },
        });

        if (!itemDataOld) return NoRecordFound("Item");

        const itemData = await prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                itemName, thresholdQty: parseFloat(thresholdQty),
                code, uomId: parseInt(uomId)
            },

        })
        res.status(201).json(itemData);
    } catch (error) {

        res.status(500).send('Error update user');
    }
});


item.delete("/:id", async (req, res) => {
    const id = req.params.id
    const itemData = await prisma.item.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.status(200).json(itemData);
})




module.exports = item

