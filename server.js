const mongoose=require("mongoose");
const express=require('express');
const auth=require('./src/middleware/auth.js')
const dbConfig=require("./src/configs/db.js");
const pubRouter = require("./src/routes/pubRoutes.js");
const apiRouter = require("./src/routes/apiRoutes.js");
const app=express();

app.use(express.json());
mongoose.connect(dbConfig.DB_URL);
const db=mongoose.connection
db.on("error",()=>console.log("Can't connect to DB"));
db.once("open",()=>
{
    console.log("Connected to mongo DB");

})

app.use('/pub/api',pubRouter)
app.use('/api',auth,apiRouter)
app.listen(7500,()=>console.log("server is started port number: 7500"))
