const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let planId = req.body.planId;

    // Check for empty username field
    if (!username || username.trim().length === 0) {
        console.log('Invalid INPUT - Username');
        return res.status(400).json({ message: 'Invalid username.' });
    }

    // Check for empty password field
    if (!password || password.trim().length === 0) {
        console.log('Invalid INPUT - Password');
        return res.status(400).json({ message: 'Invalid password.' });
    }

    User.findOne({ username: username })
        .then((userDoc) => {
            if (userDoc) {
                console.log('User already exists.');
                return res
                    .status(400)
                    .json({ message: 'User already registered.' });
            }

            bcrypt.hash(password, 12).then((hashedPassword) => {
                if (!planId || planId.trim().length === 0) {
                    planId = '';
                }
                const user = new User({
                    username: username,
                    password: hashedPassword,
                    planId: planId,
                });

                try {
                    user.save();
                    res.status(201).json({
                        message: 'User Created!',
                        user: {
                            id: user.id,
                            username: username,
                            planId: planId,
                        },
                    });
                    console.log('CREATED USER!');
                } catch (err) {
                    console.error('ERROR CREATING USER');
                    console.error(err.message);
                    res.status(500).json({
                        message: 'Failed to register user.',
                    });
                }
            });
        })
        .catch((err) => {
            console.log('Failed creating user.');
            return res.status(400).json({ message: err });
        });
});

router.post('/login', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check for empty username field
    if (!username || username.trim().length === 0) {
        console.log('Invalid INPUT - Username');
        return res.status(400).json({ message: 'Invalid username.' });
    }

    // Check for empty password field
    if (!password || password.trim().length === 0) {
        console.log('Invalid INPUT - Password');
        return res.status(400).json({ message: 'Invalid password.' });
    }

    User.findOne({ username: username })
        .then((userDoc) => {
            if (!userDoc) {
                return res
                    .status(400)
                    .json({ message: 'Invalid Username or Password.' });
            }
            bcrypt
                .compare(password, userDoc.password)
                .then((doMatch) => {
                    if (doMatch) {
                        return res.status(200).json({
                            message: 'User Authenticated!',
                            user: {
                                id: userDoc.id,
                                username: username,
                                planId: userDoc.planId,
                            },
                        });
                    } else {
                        return res
                            .status(400)
                            .json({ message: 'Invalid Password.' });
                    }
                })
                .catch((err) => {
                    console.log('ERROR AUTHENTICATING USER');
                    return res.status(400).json({ message: err });
                });
        })
        .catch((err) => {
            console.log('Failed authenticating user.');
            return res.status(400).json({ message: err });
        });
});

router.post('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const planId = req.body.planId;

    // Check for empty plan ID field
    if (!planId || planId.trim().length === 0) {
        console.log('Invalid INPUT - PlanID');
        return res.status(400).json({ message: 'Invalid Plan ID.' });
    }

    User.findOne({ id: userId })
        .then((userDoc) => {
            if (!userDoc) {
                return res.status(400).json({ message: 'User not Found.' });
            }

            userDoc.planId = planId;

            try {
                userDoc.save();
                res.status(201).json({
                    message: 'User Plan Updated!',
                    user: {
                        id: userId,
                        username: userDoc.username,
                        planId: planId,
                    },
                });
                console.log('USER PLAN UPDATED!');
            } catch (err) {
                console.error('ERROR UPDATING USER PLAN');
                console.error(err.message);
                res.status(500).json({
                    message: 'Failed to update user plan.',
                });
            }
        })
        .catch((err) => {
            console.log('Failed updating user.');
            return res.status(400).json({ message: err });
        });
});

module.exports = router;
