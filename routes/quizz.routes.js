const router = require("express").Router();
const mongoose = require('mongoose');
const Quizz = require("../models/Quizz.model");

router.get('/quizz', (req, res) => {
    Quizz.find()
        .populate('solvedBy')
        .then((quizzes) => {
            res.status(200).json(quizzes);
        })
        .catch((error) => {
            console.log(error); // Corrected typo here
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.get('/quizz/:quizzId', (req, res) => {
    const { quizzId } = req.params;
    Quizz.findById(quizzId)
        .populate('solvedBy')
        .then((quizz) => {
            if (!quizz) {
                return res.status(404).json({ message: 'quizz not found' });
            }
            res.status(200).json(quizz  );
        })
        .catch((error) => {
            console.log(error); // Corrected typo here
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post('/quizz', (req,res)=>{
    Quizz.create(req.body)
    .then((createdQuizz)=>{
        res.status(200).json(createdQuizz)
    })
    .catch((error)=>{
        console.log(error)
    })
})

router.put('/quizz/:quizzId/adduser', async (req, res) => {
    try {
      const quizzId = req.params.quizzId;
      const memberId = req.body.memberId
     
      const updatedQuizz = await Quizz.findByIdAndUpdate(
        quizzId,
        { $push: { solvedBy: memberId } },
        { new: true }
      );
  
      res.json(updatedQuizz);   
    } catch (error) {
      console.error('Error updating team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;