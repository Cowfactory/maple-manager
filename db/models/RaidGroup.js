const mongoose = require('mongoose');

const raidGroupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    raids: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Raid'}
    ]
}, {
    timestamps: true
})

const RaidGroup = mongoose.model('Raid', raidGroupSchema);

module.exports = RaidGroup;