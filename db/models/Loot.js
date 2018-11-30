const mongoose = require('mongoose');

const lootSchema = new mongoose.Schema({
    item_id: {
        required: [true, 'An Item id is required'],
        type: mongoose.Schema.Types.ObjectId, ref: 'Item'
    },
    sold_for_amt: Number,
    sell_date: Date
}, {
    timestamps: true
})

const Loot = mongoose.model('Loot', lootSchema);

module.exports = Loot;