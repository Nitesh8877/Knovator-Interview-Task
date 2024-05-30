const express = require('express');
const { createPostData, getAllPostData, getPostData, updatePostData, deletePostData, countPostActiveData, getAllPostByLocation } = require('./query');
const { InternalServerError, rm, badReq, noContent } = require('../../configs/common');
const { ObjectId } = require('mongodb');

const router = express.Router();

module.exports={
// Create a post
createPost: async (req, res) => {
  const { title, body, location } = req.body;
  console.log("post created")
  try {
    const newPost = {
      title,
      body,
      createdBy: req.user.id,
      location
    };
    console.log(req.user.id)
    const post = await createPostData(newPost)
    if(post) {
        return rm(res, 201, "Post created successfully",post);
    }
    return badReq(res)
  } catch (err) {
    console.error(err);
   return InternalServerError(res)
  }
},

// Get all posts by user
getAllPost: async (req, res) => {
  try {
    const posts = await getAllPostData({ createdBy:new ObjectId(req.user.id) });
    if(posts){
      return rm(res, 200, "Get all posts successfully", posts)
    }
    return noContent(res)
  } catch (err) {
    console.error(err);
    return InternalServerError(res)
  }
},

// Update a post
updatePost: async (req, res) => {
  const { title, body, status, location } = req.body;
  try {
    let post = await getPostData({_id:req.params.id});
    if (!post) {
      return noContent(res)
    }
    if (post.createdBy.toString() !== req.user.id) {
      return badReq(res,401, 'User not authorized');
    }
    let data={
      title : title || post.title,
      body :body || post.body,
      status : status || post.status,
      location: location || post.location,
    }
    let update=await updatePostData({_id:req.params.id}, data);
    if(update){
      return rm(res,200, "Post update successfully", update)
    }
    return badReq(res)
  } catch (err) {
    console.error(err);
    InternalServerError(res)
  }
},

// Delete a post
deletePost:  async (req, res) => {
  try {
    const post = await getPostData({_id:req.params.id});
    if (!post) {
      return badReq(res, 'Post not found' );
    }
    if (post.createdBy.toString() !== req.user.id) {
      return badReq(401, 'User not authorized');
    }
    let deleted=await deletePostData({_id:req.params.id});
    if(deleted){
      return rm(res, 200, "Post deleted successfully",);
    }
    return badReq(res)
  } catch (err) {
    console.error(err);
    InternalServerError(res)
  }
},

// Get posts by location
getPostByLocation: async (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude, {
      'location.latitude': latitude,
      'location.longitude': longitude
    })
    try {
      const posts = await getAllPostByLocation({
        'location.latitude': latitude,
        'location.longitude': longitude
      });
      if(posts){
        return rm(res, 200, "Post get successfully", posts);
      }
      return noContent(res)
    } catch (err) {
      console.error(err);
      InternalServerError(res)
    }
  },
  // Get count of active and inactive posts
getActiveAndInactivePost: async (req, res) => {
    try {
      let [active,inactive]=await Promise.all([countPostActiveData({ createdBy: req.user.id, status: "Active" }),countPostActiveData({ createdBy: req.user.id, status: "Inactive" })])
      return rm(res, 200,"Get active or inactive successfully",{ active: active, inactive: inactive });
    } catch (err) {
      InternalServerError(res)
    }
  }
  
  
}