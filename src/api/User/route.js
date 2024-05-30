const express = require('express');
const { login, register } = require('./controller');
const { validate } = require('../../configs/common.js');
const { registerJoi, loginJoi } = require('./joi.js');

const userRouter = express.Router();

userRouter.route('/login').post(validate(registerJoi), login)
userRouter.route('/register').post(validate(loginJoi),register)

module.exports=userRouter;