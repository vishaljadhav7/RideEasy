const express  = require("express");
const driverRouter = express.Router();

driverRouter.post("/driver/signup", ()=>{})

driverRouter.post("/driver/signin", ()=>{})

driverRouter.post("/driver/signout", ()=>{})

module.exports = driverRouter