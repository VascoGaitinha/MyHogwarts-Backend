const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

const {isAuthenticated} = require('../middleware/jwt.middleware');

const router = express.Router();


const saltRounds = 10; 

// POST '/auth/signup' - Creates a new user in the database
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, team, image } = req.body;

        // Validate required fields
        if (!email || !password || !name || !team) {
            return res.status(400).json({ message: "Provide email, password, name and team." });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Provide a valid email.' });
        }

        // Validate password format
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: `Password must have at least 6 characters and contain: \\n 1 lowercase letter, 1 uppercase letter, 1 number` });
        }

        // Check if user already exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user
        const createdUser = await User.create({ password: hashedPassword, email, name, team, image });

        const { _id, email: createdEmail, name: createdName, team: createdTeam, image: createdImage } = createdUser;

        const user = { _id, email: createdEmail, name: createdName, team: createdTeam, image: createdImage };

        return res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


// POST '/auth/login' - Verifies email and password and returns a JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    /* What if email and password were left blank? */
    if (email === '' || password === '') {
        res.status(400).json({ message: 'Provide email and password.' });
        return;
    }

    try {
        const foundUser = await User.findOne({ email });

        /* What if the user was not found? */
        if (!foundUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        /* What if the password is not correct? */
        const passwordCorrect = await bcrypt.compare(password, foundUser.password);

        if (passwordCorrect) {
            const { _id, email, name } = foundUser;

            const payload = { _id, email, name };

            const authToken = jwt.sign(
                payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '6h' }
            );
            return res.status(200).json({ authToken: authToken });
        }
        /* What if the password is not correct? */
        else {
            return res.status(400).json({ message: 'Wrong password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// GET '/auth/verify' - Used to verify JWT 
router.get('/verify', isAuthenticated, (req,res)=>{
    res.status(200).json(req.payload);
})



module.exports = router; 