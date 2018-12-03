const mongoose = require('mongoose');

const raidGroupSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    raids: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Raid'}
    ]
}, {
    timestamps: true
})

const RaidGroup = mongoose.model('RaidGroup', raidGroupSchema);

module.exports = RaidGroup;