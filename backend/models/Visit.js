const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema(
    {
        recipeId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        // 얼마 동안 사용자가 레시피 페이지에 체류했는지
        timeSpent: {
            type: Number,
            required: true,
        },
        visitTime: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Visit", VisitSchema);
