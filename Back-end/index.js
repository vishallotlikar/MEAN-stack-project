// init code
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const database = require('./database');
const userController = require('./controllers/user_controller');


// middleware seup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', userController);
// Front-end/selfie-shoot/dist/selfie-shoot

// default routes
// app.all('/', (req, res) => {
//     return res.json({
//         status: true,
//         message: 'Index page working...'
//     });
// });


app.use('*', (req, res, next) => {
    res.sendfile(path.join(__dirname, '../Front-end/selfie-shoot/dist/selfie-shoot/index.html'));
});

// Start server
app.listen(
    port, () => {
        console.log('Server is running on port:', port);
    }
);