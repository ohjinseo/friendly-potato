const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
dotenv.config();
const dbConnect = require("./config/dbConnect");

// routes
const authRoute = require('./routes/authRoute');
const ingredientRoute = require("./routes/ingredientRoute");
const addIngredientListRoute = require("./routes/addIngredientListRoute");
const refrigeratorRoute = require("./routes/refrigeratorRoute");
const recipeRoute = require("./routes/recipeRoute");


dbConnect();
const app = express();

app.use(cookieParser());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());

// routers
app.use("/api/auth", authRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/addIngredients", addIngredientListRoute);
app.use("/api/refrigerators", refrigeratorRoute);
app.use("/api/recipes", recipeRoute);



app.listen(5000, () => {
    console.log("server is running");
})

