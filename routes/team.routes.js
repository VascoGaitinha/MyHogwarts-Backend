const router = require("express").Router();
const Team = require("../models/Team.model");
const mongoose = require('mongoose');

router.get('/teams', (req, res) => {
    Team.find()
        .populate('members')
        .then((teams) => {
            res.status(200).json(teams);
        })
        .catch((error) => {
            console.log(error); // Corrected typo here
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.get('/teams/:teamId', (req, res) => {
    const { teamId } = req.params;
    Team.findById(teamId)
        .populate('members')
        .then((team) => {
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        })
        .catch((error) => {
            console.log(error); // Corrected typo here
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post('/teams', (req,res)=>{
    Team.create(req.body)
    .then((createdTeam)=>{
        res.status(200).json(createdTeam)
    })
    .catch((error)=>{
        console.log(error)
    })
})

router.put('/teams/:teamsId/adduser', async (req, res) => {
    try {
      const teamId = req.params.teamsId;
      const memberId = req.body.memberId
     
      const updatedTeam = await Team.findByIdAndUpdate(
        teamId,
        { $push: { members: memberId } },
        { new: true }
      );
  
      res.json(updatedTeam);
    } catch (error) {
      console.error('Error updating team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;