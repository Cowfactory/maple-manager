const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BossRun = require("../../db/models/BossRun");

router.post('/', (req, res) => {
    let lootIds = req.body.loot.map(loot => loot._id);
    let participantIds = req.body.participants.map(p => p._id);
    let gid = (req.body.group) ? req.body.group._id : "";
    let data = {
        organizer_id: req.body.organizer._id,
        loots: lootIds,
        participants: participantIds,
        date: req.body.date,
        boss: req.body.boss,
        group_id: gid,        
    }

    if(data.participants.length === 0 || !data.boss || !data.date || !data.organizer_id) {
        res.json({
            error: "Failed validation"
        })
    }
    
    BossRun.create(data)
        .then(response => {
            console.log(response)
            res.status(200);
        })
        .catch(err => res.send(err))
})

// Get all bossruns that match ids in query string
router.get('/', (req, res) => {
    let charIds = req.query.charIds;

    BossRun.find( { participants: { $in: charIds } } )
        .populate()   
        .exec((err, response) => {
            console.log(response);
            if(err) res.json({ err: "A server error has occured" });
            res.json({ bossruns: response })
        })
})

module.exports = router;