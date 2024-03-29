const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const Refrigerator = require("../models/Refrigerator");

const router = require("express").Router();

// 냉장고 생성
router.post("/", verifyToken, async (req, res) => {
    try {
        const checkRefrigerator = await Refrigerator.findOne({ userId: req.userId });

        if (checkRefrigerator) {
            return res.status(409).json("이미 사용자의 냉장고가 존재합니다.");
        }

        const newRefrigerator = new Refrigerator({ userId: req.userId });

        const savedRefrigerator = await newRefrigerator.save();
        res.status(200).json(savedRefrigerator);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 냉장고 식재료 추가
router.patch("/:id/add", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedRefrigerator = await Refrigerator.findOneAndUpdate(
            { userId: req.userId },
            {
                $push: {
                    ingredients: { $each: req.body.ingredients }
                },
            },
            { new: true }
        );

        if (updatedRefrigerator === null) {
            return res.status(404);
        }

        res.status(200).json(updatedRefrigerator);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// 냉장고 식재료 삭제 
router.patch("/:id/delete", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedRefrigerator = await Refrigerator.findOneAndUpdate(
            {userId: req.userId},
            {
                $pull: { ingredients: { _id: req.body.id } }
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
});

// 목록 수정
router.patch("/:id/update", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedRefrigerator = Refrigerator.updateOne({ 'ingredients._id': req.body.id },
            {
                '$set': {
            'ingredients.$.quantity': req.body.quantity,
            'ingredients.$.storage': req.body.storage,
            'ingredients.$.createdAt': req.body.createdAt,
            'ingredients.$.expirationAt': req.body.expirationAt
                }
            }, { new: true }).then(result => res.status(200).json(result));

        if (updatedRefrigerator === null) {
            return res.status(404);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// 사용자 냉장고 가져오기
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const refrigerator = await Refrigerator.findOne({ userId: req.userId })
            .populate('ingredients.ingredientId');

        res.status(200).json(refrigerator);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;