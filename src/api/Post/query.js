const Post=require('./model')

module.exports={
    createPostData:(data)=>Post.create(data),
    getAllPostData:(filter)=>Post.aggregate([
        {
            $match:filter,
        }, 
        {
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"createdBy"
            }
        },
        {
            $unwind:"$createdBy"
        },
        {
            $set:{
                createdBy:"$createdBy.name"
            }
        }
    ]),
    deletePostData:(filter)=>Post.findOneAndDelete(filter),
    updatePostData:(filter,update)=>Post.findOneAndUpdate(filter, update),
    getPostData:(filter)=>Post.findOne(filter),
    countPostActiveData:(filter)=>Post.countDocuments(filter),
    getAllPostByLocation:(filter)=>Post.aggregate([{
        $match:filter,
    }])
}