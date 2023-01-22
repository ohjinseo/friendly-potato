const mongoose = require("mongoose");

const RefrigeratorSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        ingredients: [
            {
                ingredientId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Ingredient'
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
)

module.exports = mongoose.model("Refrigerator", RefrigeratorSchema);