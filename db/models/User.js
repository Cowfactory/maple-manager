const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Character Schema subdocument
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
    class: String,
    level: Number

}, {
    timestamps: true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter a name'],
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
        minlength: [10, 'Password must be between 10 and 128 characters'],
        maxlength: [99, 'Password must be between 10 and 128 characters']
    },
    email: {
        type: String,
        required: [true, 'You must enter an email'],
        minlength: [5, 'Email must be between 5 and 99 characters'],
        maxlength: [99, 'Email must be between 5 and 99 characters']
    },
    characters: [characterSchema]
}, {
    timestamps: true
});


// This returns a user object without a password
userSchema.set('toObject', {
    transform: function (doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name,
            characters: ret.characters
        }
        return returnJson;
    }
});

// This checks the entered password against the hashed password
userSchema.methods.authenticated = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function (next) {
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;