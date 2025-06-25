const express = require('express');
const uom = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


uom.post('/', async (req, res) => {

    const { uomName, code } = req.body;

    try {
        const uomData = await prisma.uom.create({
            data: {
                uomName,
                code,
            },
        });

        res.status(200).json(uomData);

    } catch (error) {

        res.status(500).send('uom Save Error');
    }
});


uom.get('/', async (req, res) => {
    try {
        const uomData = await prisma.uom.findMany({
        });
        res.status(201).json(uomData);
    } catch (error) {

        res.status(500).send('Get uom Error');
    }
});


uom.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const uomData = await prisma.uom.findUnique({

            where: {
                id: parseInt(id),
            },
        });
        res.status(201).json(uomData);
    } catch (error) {
        res.status(500).send('Get uom Error');
    }
});




uom.put('/:id', async (req, res) => {

    const { uomName, code } = req.body;
    const id = req.params.id;

    try {
        const uomDataOld = await prisma.uom.findUnique({

            where: {
                id: parseInt(id),
            },
        });

        if (!uomDataOld) return NoRecordFound("uom");

        const uomData = await prisma.uom.update({
            where: {
                id: parseInt(id),
            },
            data: {
                uomName,
                code
            },

        })
        res.status(201).json(uomData);
    } catch (error) {

        res.status(500).send('Error update user');
    }
});


uom.delete("/:id", async (req, res) => {
    const id = req.params.id
    const uomData = await prisma.uom.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.status(200).json(uomData);
})




module.exports = uom

