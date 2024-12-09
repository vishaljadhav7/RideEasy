const express  = require("express");
const authRouter = express.Router();
const {signInUser, signOutUser, signUpUser} = require("../controllers/auth.controller");

authRouter.post("/signup", signUpUser);

authRouter.post("/signin", signInUser);

authRouter.post("/signout", signOutUser);

module.exports = authRouter;
