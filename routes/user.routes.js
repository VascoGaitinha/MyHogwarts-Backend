const router = require("express").Router();
const User = require('../models/User.model')

router.get('/users',(req,res)=>{
    User.find()
    .populate("team")
    .then((users)=>{
        res.status(200).json(users)
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
})

router.get('/users/:userId', (req,res)=>{
    const {userId} = req.params;

    User.findById(userId)
    .populate("team")
    .then((user)=>{
        res.status(200).json(user);
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})

router.put('/users/:userId', async (req, res) => {

    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/users/:userId/addquizz', async (req, res) => {

    const userId = req.params.userId;
    const quizzId = req.body.quizzId;

    try {
 
        const updatedUser = await Team.findByIdAndUpdate(
            userId,
            { $push: { sovledQuizz: quizzId } },
            { new: true })
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router; 


