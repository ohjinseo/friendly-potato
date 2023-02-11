const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const Visit = require("../models/Visit");
const router = require("express").Router();

// 유저 방문 시간 생성
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const newVisit = new Visit({
            recipeId: req.body.recipeId,
            userId: req.userId,
            timeSpent: req.body.timeSpent
        });

        const savedVisit = await newVisit.save();
        res.status(201).json(savedVisit);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;