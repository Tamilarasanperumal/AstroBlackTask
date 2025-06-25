const userrouter = require('./src/user.service.js');
const item = require('./src/item.service.js');
const uom = require('./src/uom.service.js');
const inventory = require('./src/inventory.service.js');
const consumption = require('./src/consumption.service.js');
const express = require('express');
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", userrouter);
app.use("/item", item);
app.use("/uom", uom);
app.use("/inventory", inventory);
app.use("/consumption", consumption);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

