require('dotenv').config();

const app = require("./app");
const http = require('http');
const connectDB = require("./db/database");
const {createSocketConnection} = require('./socket');
const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

createSocketConnection(httpServer);

connectDB()
.then(()=> {
    httpServer.listen(PORT, ()=> {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

  