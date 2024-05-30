const express = require('express');
const postRouter = require('../api/Post/route');

const apiRouter = express.Router();

apiRouter.use('/posts', postRouter)

module.exports=apiRouter;