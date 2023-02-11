const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
    {
        recipe_id: {
            type: String,
            unique: true,
            required: true
        },
        recipe_name: {
            type: String,
            required: true
        },
        ingredients: [
            { type: String }
        ],
        rating: {
            type: Number,
            default: 0
        }
    }
)

module.exports = mongoose.model("Recipe", RecipeSchema);
