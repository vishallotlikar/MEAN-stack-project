// init code
const express = require('express');
const path = require('path');
var fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const userController = require('./controllers/user/user_controller');


// middleware seup
app.use(morgan('common', { // log all requests to access.log
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'))
  }))
app.use(cors());
app.use('/api/user', userController);

// default routes
app.all('/', (req, res) => {
    return res.json({
        status: true,
        message: 'Welcome...'
    });
});

// Serve static frontend files in test and production server.
app.use('*', (req, res, next) => {
    res.sendfile(path.join(__dirname, '../Front-end/selfie-shoot/dist/selfie-shoot/index.html'));
});

module.exports = app;