const express = require('express');
const userrouter = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


userrouter.post('/', async (req, res) => {

    const { userName, password, login } = req.body;

    if (!userName || !password) {
        return res.status(200).json({ statusCode: 0, message: "Username and password are required" });
    }
    try {
        if (login) {
            console.log("kii")
            let userData = await prisma.user.findUnique({
                where: {
                    name: userName ? userName : undefined,
                },
            });

            if (!userData) {
                return res.status(200).json({ statusCode: 0, message: "Username doesn't exists" });

            };
            if ((userData?.password !== password)) {
                return res.status(200).json({ statusCode: 0, message: "Please Check Password" });
            }

            return res.status(201).json({
                ...userData,
                message: "Login success",
                statusCode: 1
            });

        }
        else {
            const user = await prisma.user.create({
                data: {
                    name: userName,
                    password, role
                },
            });

            res.status(200).json(user);
        }
    } catch (error) {

        res.status(500).send(' UserName and PassWord Must Be Unique');
    }
});


userrouter.get('/', async (req, res) => {
    try {
        const user = await prisma.user.findMany({
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});


userrouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({

            where: {
                id: parseInt(id),
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});




userrouter.put('/:id', async (req, res) => {


    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({

            where: {
                id: parseInt(id),
            },
        });

        if (!user) return NoRecordFound("user");

        const userData = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: req.body.userName,
                password: req.body.password
            },

        })
        res.status(201).json(userData);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error update user');
    }
});


userrouter.delete("/:id", async (req, res) => {
    const id = req.params.id

    console.log(id, "iddd")
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.status(200).json(user);
})




module.exports = userrouter

