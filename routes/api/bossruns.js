const express = require('express');
const router = express.Router();
const BossRun = require("../../db/models/BossRun");

router.post('/', (req, res) => {
    let lootIds = req.body.loot.map(loot => loot._id);
    let participantIds = req.body.participants.map(p => p._id);

    let data = {
        organizer_id: req.body.organizer._id,
        loots: lootIds,
        participants: participantsIds,
        date: req.body.date,
        boss: req.body.boss,
        group: req.body.group._id,        
    }
    console.log(data);

    // BossRun.create({
    //     organizer_ign: {

    //     },
    //     loots: [
    //         {type: mongoose.Schema.Types.ObjectId, ref: 'Loot'}
    //     ],
    //     participants: [
          
    //     ]
    // }, {
    //     timestamps: true
    // })
    // })
    // res.send(data)
})

module.exports = router;