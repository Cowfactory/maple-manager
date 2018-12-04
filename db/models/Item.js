const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    },
    subtype: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
}, {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;