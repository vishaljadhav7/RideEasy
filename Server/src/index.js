
require('dotenv').config();

const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000


app.get("/", (req, res) => {
    res.send("hello there")
})

app.listen(PORT , ()=>{ 
    console.log(`Server listening on port ${PORT}`)
})