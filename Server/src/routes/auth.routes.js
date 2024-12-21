const express  = require("express");
const authRouter = express.Router();
const {signInUser, signOutUser, signUpUser} = require("../controllers/auth.controller");
const {verifyUser} = require('../middlewares/auth.middleware');

authRouter.post("/user/signup", signUpUser);

authRouter.post("/user/signin", signInUser);

authRouter.post("/user/signout",verifyUser,signOutUser);

module.exports = authRouter;
