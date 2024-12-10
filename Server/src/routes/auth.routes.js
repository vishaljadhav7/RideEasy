const express  = require("express");
const authRouter = express.Router();
const {signInUser, signOutUser, signUpUser} = require("../controllers/auth.controller");

authRouter.post("/user/signup", signUpUser);

authRouter.post("/user/signin", signInUser);

authRouter.post("/user/signout", signOutUser);

module.exports = authRouter;
