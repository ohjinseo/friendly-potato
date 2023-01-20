const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
dotenv.config();

dbConnect();
const app = express();

app.listen(process.env.PORT, () => {
    console.log("server is running");
})

