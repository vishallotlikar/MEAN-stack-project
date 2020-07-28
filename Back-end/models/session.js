const mongoose = require('mongoose');

// session schema
const sessionSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    login_at: {
        type: Date,
        default: Date.now
    },
    logout_at: {
        type: Date
    }
});


// session model
mongoose.model('sessions', sessionSchema);

// module exports
module.exports = mongoose.model('sessions');