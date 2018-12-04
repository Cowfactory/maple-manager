const express = require('express');
const router = express.Router();
const BossRun = require("../../db/models/BossRun");

router.post('/', (req, res) => {
    // let data = {
    //     participants: req.body.participants,
    //     group: req.body.group,
    //     loot: req.body.loot,
    //     boss: req.body.boss,
    //     date: req.body.date
    // }
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