const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const AddIngredientList = require("../models/AddIngredientList");

const router = require("express").Router();

// 목록 생성
router.post("/", verifyToken, async (req, res) => {
    const newAddIngredientList = new AddIngredientList(req.body);

    try {
        const savedIngredientList = await newAddIngredientList.save();
        res.status(200).json(savedIngredientList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 목록 업데이트
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedIngredientList = await AddIngredientList.findOneAndUpdate(
            {userId: req.params.userId},
            {
                $set: req.body,
            },
            { new: true }
        );

        if (updatedIngredientList === null) {
            return res.status(404);
        }

        res.status(200).json(updatedIngredientList);
    } catch (err) {
        res.status(500).json(err);
    }
})

// 사용자 추가 목록 가져오기
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const addIngredientList = await AddIngredientList.findOne({ userId: req.params.userId });
        res.status(200).json(addIngredientList);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;