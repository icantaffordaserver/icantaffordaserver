/**
 * Created by AlexanderMann on 2016-10-13.
 */
const usersRouter = require('express').Router();
const verifyEmail = require('./verifyEmail');


// verify a users email
// GET
usersRouter.get('/verify', verifyEmail);

module.exports = usersRouter;