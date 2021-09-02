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


//Db connections
mongoose.connect("mongodb+srv://bhivutech:Shubhampass>@mern.nfve1.mongodb.net/etarkdb?retryWrites=true&w=majority", {
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





app.listen(process.env.PORT, () => {
    // console.log(`app is running at ${port}`);
})