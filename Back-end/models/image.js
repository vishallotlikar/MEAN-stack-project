const mongoose = require('mongoose');

// image schema
const imageSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    });


// image model
mongoose.model('images', imageSchema);

// module exports
module.exports = mongoose.model('images');