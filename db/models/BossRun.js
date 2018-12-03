const mongoose = require('mongoose');

const bossRunSchema = new mongoose.Schema({
    organizer_ign: {
        required: [true, 'A run organizer is required'],
        type: mongoose.Schema.Types.ObjectId, ref: 'Character'
    },
    loots: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    ],
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Character'}
    ]
}, {
    timestamps: true
})

const BossRun = mongoose.model('BossRun', bossRunSchema);

module.exports = BossRun;