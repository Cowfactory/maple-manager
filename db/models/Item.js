const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        required: [true, 'A name is required'],
        type: String
    },
    type: String,
    img_url: String,
}, {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;