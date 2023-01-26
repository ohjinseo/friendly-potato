const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/dbConnect");

// routes
const authRoute = require('./routes/authRoute');
const ingredientRoute = require("./routes/ingredientRoute");
const addIngredientListRoute = require("./routes/addIngredientListRoute");
const refrigeratorRoute = require("./routes/refrigeratorRoute");
const { getAPI, getIngredientInfo } = require("./crawler/api/recipeApi");


dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

// routers
app.use("/api/auth", authRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/addIngredients", addIngredientListRoute);
app.use("/api/refrigerators", refrigeratorRoute);

getAPI("가지", 5).then((data) => {
    console.log(data);
 })


app.listen(5000, () => {
    console.log("server is running");
})

