
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use(express.json({limit : "16kb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const driverRouter = require("./routes/driver.routes")
const mapsRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/ride.routes')


app.use("/auth", authRouter);
app.use("/auth", driverRouter);
app.use('/map', mapsRouter);
app.use('/ride', rideRouter)

module.exports = app