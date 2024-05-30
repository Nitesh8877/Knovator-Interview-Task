const express = require('express');
const userRouter = require('../api/User/route');

const pubRouter = express.Router();

pubRouter.use('/users', userRouter)

module.exports=pubRouter;