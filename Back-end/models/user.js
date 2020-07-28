const mongoose = require('mongoose');

// user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    });


// user model
mongoose.model('users', userSchema);

// module exports
module.exports = mongoose.model('users');