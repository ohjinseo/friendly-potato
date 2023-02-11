const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
    {
        recipeId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Favorite", FavoriteSchema);
