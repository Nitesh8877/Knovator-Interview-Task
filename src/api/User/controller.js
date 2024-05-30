const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserData, addUserData } = require('./query');
const { badReq, rm, InternalServerError }=require('../../configs/common')

module.exports={
    
register: async (req, res) => {
    let { name, email, password } = req.body;
  
    try {
      let user = await getUserData({ email });
      if (user) {
        return badReq(res,'Email already exists');
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
    console.log("name")
    try {
      const user = await getUserData({ email });
      if (!user) {
        return badReq(res, 'Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return badReq('Invalid credentials');
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