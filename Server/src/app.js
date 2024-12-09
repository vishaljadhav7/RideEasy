
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json({limit : "16kb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes")

app.use("/api/v1/auth", authRouter)


module.exports = app