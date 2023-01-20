const mongoose = require("mongoose");

const AddIngredientListSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        ingredients: [
            {
                ingredientId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Ingredient',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                storage: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                expirationAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    }
);

module.exports = mongoose.model("AddIngredientList", AddIngredientListSchema);