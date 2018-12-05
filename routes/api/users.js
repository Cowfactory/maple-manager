const express = require('express');
const router = express.Router();
const User = require("../../db/models/User");
 
// Get all username:id pairs
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.json({ 
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                characters: user.characters
            }))
        }))
        .catch(err => {
            res.status(500);
        })
})

// Get all user's characters
router.get('/:id/characters', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json({
                characters: user.characters
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.delete('/:id/characters/:cid', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $pull: {
            _id: req.params.cid
        }
    })
    .catch(err => {
        res.send("error occurred")
    })
    
})

// Add a character to user
router.post('/:id/characters', (req, res) => {
    // find the user
    User.findById(req.params.id) 
        .then(user => {
            let newCharacter = {
                ign: req.body.ign,
                user_id: user._id,
                class: req.body.class,
                level: req.body.level
            };
            user.characters.push(newCharacter);
            user.save();
            res.status(201).send('New character added to user')
        })
        .catch(err => {
            res.status(404).json(err);
        })
});

module.exports = router;