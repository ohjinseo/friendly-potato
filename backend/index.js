const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/dbConnect");

// routes
const authRoute = require('./routes/authRoute');
const ingredientRoute = require("./routes/ingredientRoute");
const addIngredientListRoute = require("./routes/addIngredientListRoute");

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

// routers
app.use("/api/auth", authRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/add/ingredients", addIngredientListRoute);

app.listen(5000, () => {
    console.log("server is running");
})

