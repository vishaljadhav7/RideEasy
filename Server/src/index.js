require('dotenv').config();

const app = require("./app")
const connectDB = require("./db/database")
const PORT = process.env.PORT || 4000

connectDB()
.then(()=> {
    app.listen(PORT, ()=> {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

