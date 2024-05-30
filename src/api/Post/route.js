
const express = require('express');
const { createPost,updatePost,getActiveAndInactivePost,getAllPost,getPostByLocation,deletePost } = require('./controller.js');
const { validate } = require('../../configs/common.js');
const { createPostSchema, updatePostSchema } = require('./joi.js');

const postRouter = express.Router();

postRouter.route('/').post(validate(createPostSchema),createPost).get(getAllPost);
postRouter.route('/acive-and-inactive').get(getActiveAndInactivePost);
postRouter.route('/location').get(getPostByLocation)
postRouter.route('/:id').put(validate(updatePostSchema),updatePost).delete(deletePost);


module.exports=postRouter;