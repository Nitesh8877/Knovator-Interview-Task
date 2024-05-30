const User=require('./model')

module.exports={
    addUserData:(data)=>User.create(data),
    getUserData:(filter)=>User.findOne(filter)
}