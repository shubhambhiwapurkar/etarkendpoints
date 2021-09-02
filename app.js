const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const homeRoutes = require("./routes/auth");


//Db connections
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED")
    })
    //Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
// app.use("/api", homeRoutes)





app.listen(process.env.PORT, () => {
    // console.log(`app is running at ${port}`);
})