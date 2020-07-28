// init code
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

// Connection code
mongoose.connect(db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // useFindAndModify: false
    },
    function (error, link) {
        // Check error
        if (error) {
            console.log('DB connection failed. Please restart the server...');
        } else if (link) {
            console.log('DB connection established...');
        }
    }
).catch(error => {
    // console.log('DB connection failed. Please restart the server...');
    console.log('failed');
});
