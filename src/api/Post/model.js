const { ObjectId } = require('mongodb');
const {Schema,model} = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdBy: { type:  ObjectId },
  status: { type: String, default: "Active" },
  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
  },
 
},{timestamps:true});
const Post= model('Post', PostSchema);
module.exports =Post
