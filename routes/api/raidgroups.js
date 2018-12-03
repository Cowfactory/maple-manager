const express = require('express');
const router = express.Router();
const RaidGroup = require("../../db/models/RaidGroup");
 
// Get all groups
router.get('/', (req, res) => {
    RaidGroup.find({})
        .then(raidGroups => res.json({
            groups: raidGroups 
        }))
        .catch(err => {
             res.json({
                 type: 'server_error',
                 status: 500,
                 message: 'A server error has occurred',
                 error: err
             })
        })
});

router.post('/', (req, res) => {
    // Look for an existing group w. the same name
    RaidGroup.find({ name: req.body.name })
        .then(response => {
            if(response.length >= 1) {
                res.json({
                    type: 'create_error',
                    status: 403,
                    message: "A raid group with same name already exists!",
                });
            }
            else {
                //  No name collision - create group
                RaidGroup.create({
                    name: req.body.name,
                    creator: req.body.creator_id
                });
                res.json({
                    type: 'success',
                    status: 201,
                    message: "Raid group created!"
                });
            }
        })
        .catch(err => {
            res.json({
                type: 'server_error',
                status: 500,
                message: 'A server error has occurred',
                error: err
            })
        })
});
    
module.exports = router;