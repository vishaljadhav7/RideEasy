
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.get("/", (req, res) => {
    res.send("hello there")
})

// app.listen(PORT , ()=>{ 
//     console.log(`Server listening on port ${PORT}`)
// })

module.exports = app