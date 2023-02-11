const mongoose = require("mongoose");
const { startCrawling } = require("../crawler/recipeApi");

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connected");
            //startCrawling();
        }).catch((err) => console.log(err));
}



module.exports = dbConnect;