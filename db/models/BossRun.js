const mongoose = require('mongoose');

const raidSchema = new mongoose.Schema({
    organizer_ign: {
        required: [true, 'A raid organizer is required'],
        type: mongoose.Schema.Types.ObjectId, ref: 'Character'
    },
    commonlyFoundLoots: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    ],
    loots: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    ],
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Character'}
    ],
    date: {
        type: String,
        required: [true, 'A date is required']
    }
}, {
    timestamps: true
})

const Raid = mongoose.model('Raid', raidSchema);

module.exports = Raid;