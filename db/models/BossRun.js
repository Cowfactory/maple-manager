const mongoose = require('mongoose');

const bossRunSchema = new mongoose.Schema({
    organizer_id: {
        required: [true, 'A raid organizer is required'],
        type: mongoose.Schema.Types.ObjectId, ref: 'Character'
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'RaidGroup'
    },
    loots: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    ],
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Character'}
    ],
    date: {
        type: String,
        required: [true, 'A date is required']
    },
    boss: {
        type: String,
        required: [true, 'A Boss is required']
    },
    commonlyFoundLoots: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    ],
}, {
    timestamps: true
})

const BossRun = mongoose.model('BossRun', bossRunSchema);

module.exports = BossRun;