const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserData, addUserData } = require('./query');
const { badReq, rm, InternalServerError }=require('../../configs/common')

module.exports={
    
register: async (req, res) => {
    let { name, email, password } = req.body;
    if(!name) {return badReq(res,400, "Name is required")}
    if(!email) {return badReq(res,400, "Email is required")}
    if(!password) {return badReq(res,400, "Password is required")}
    try {
      let user = await getUserData({ email });
      if (user) {
        return badReq(res,409,'Email already exists');
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      let userAdded = await addUserData({ name, email, password });
      if(userAdded){
          return rm(res, 201, "Register successfully", );
        }
    } catch (err) {
      console.error(err);
      return InternalServerError(res);
    }
  },
  
  // Login User
 login: async (req, res) => {
    let { email, password } = req.body;
   
    if(!email) {return badReq(res,400, "Email is required")}
    if(!password) {return badReq(res,400, "Password is required")}
    try {
      const user = await getUserData({ email });
      if (!user) {
        return badReq(res,400, 'Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return badReq(res,400, 'Invalid credentials');
      }
      const payload = { id: user.id };
      jwt.sign(
        payload,
        "JWT_SECRET",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return rm(res, 200,"Login successfully", {token:token, user:{name:user.name}} )
        }
      );
    } catch (err) {
      console.error(err);
      return InternalServerError(res)
    }
  }
}
