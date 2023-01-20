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
                    type: Schema.Types.ObjectId,
                    ref:'Ingredient'
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    }
)

module.exports = mongoose.model("Refrigerator", RefrigeratorSchema);