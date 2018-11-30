const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    ign: {
        type: String,
        required: [true, 'You must enter an IGN'],
        minlength: [4, 'Name must be between 4 and 12 characters'],
        maxlength: [12, 'Name must be between 4 and 12 characters'],
    },
    user_id: {
        type: String,
        required: true
    },
    level: Number,
    class: String

}, {
    timestamps: true
})

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;