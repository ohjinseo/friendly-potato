const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const Refrigerator = require("../models/Refrigerator");

const router = require("express").Router();

// 냉장고 생성
router.post("/", verifyToken, async (req, res) => {
    try {
        const checkRefrigerator = await Refrigerator.findOne({ userId: req.user.id });

        if (checkRefrigerator) {
            return res.status(409).json("이미 사용자의 냉장고가 존재합니다.");
        }

        const newRefrigerator = new Refrigerator(req.body);

        const savedRefrigerator = await newRefrigerator.save();
        res.status(200).json(savedRefrigerator);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 냉장고 업데이트
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedRefrigerator = await Refrigerator.findOneAndUpdate(
            {userId: req.params.userId},
            {
                $set: req.body,
            },
            { new: true }
        );

        if (updatedRefrigerator === null) {
            return res.status(404);
        }

        res.status(200).json(updatedRefrigerator);
    } catch (err) {
        res.status(500).json(err);
    }
})

// 사용자 냉장고 가져오기
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const refrigerator = await Refrigerator.findOne({ userId: req.params.userId });
        res.status(200).json(refrigerator);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;