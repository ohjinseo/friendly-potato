const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/dbConnect");

const authRoute = require('./routes/authRoute');
const ingredientRoute = require("./routes/ingredientRoute");

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

// routers
app.use("/api/auth", authRoute);
app.use("/api/ingredients", ingredientRoute);

app.listen(5000, () => {
    console.log("server is running");
})

