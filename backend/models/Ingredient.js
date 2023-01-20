const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },
    }
)

module.exports = mongoose.model("Ingredient", IngredientSchema);
