require('dotenv').config();
const port = process.env.PORT;
const app = require("./index");
const database = require('./database');

app.listen(
    port, () => {
        console.log('Server is running on port:', port, 'Please wait for DB to connect..');
    });