const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
    {
        recipeId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },{timestamps:true}
)

module.exports = mongoose.model("Like", LikeSchema);
