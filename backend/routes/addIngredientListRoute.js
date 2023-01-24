const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const AddIngredientList = require("../models/AddIngredientList");

const router = require("express").Router();

// 목록 생성
router.post("/", verifyToken, async (req, res) => {
    
    try {
        const checkAddIngredientList = await AddIngredientList.findOne({ userId: req.user.id });

        if (checkAddIngredientList) {
            return res.status(409).json("이미 사용자의 식재료 추가 목록이 존재합니다.");
        }


        const newAddIngredientList = new AddIngredientList(req.body);
        const savedIngredientList = await newAddIngredientList.save();
        res.status(200).json(savedIngredientList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 목록 비우기
router.patch("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedIngredientList = await AddIngredientList.findOneAndUpdate(
            {userId: req.params.userId},
            {
                $set: {ingredients: []},
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

// 목록 추가
router.patch("/add/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedIngredientList = await AddIngredientList.findOneAndUpdate(
            {userId: req.params.userId},
            {
                $push: {ingredients:req.body}
            },
            { new: true }
        );


        if (updatedIngredientList === null) {
            return res.status(404);
        }

        res.status(200).json(updatedIngredientList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// 목록 삭제
router.patch("/delete/:userId", verifyTokenAndAuthorization, async (req, res) => {
    
    try {
        const updatedIngredientList = await AddIngredientList.findOneAndUpdate(
            {userId: req.params.userId},
            {
                $pull: { ingredients: { _id: req.body.id } }
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
});

// 목록 수정
router.patch("/update/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedIngredientList = AddIngredientList.updateOne({ 'ingredients._id': req.body.id },
            {
                '$set': {
            'ingredients.$.quantity': req.body.quantity,
            'ingredients.$.storage': req.body.storage,
            'ingredients.$.createdAt': req.body.createdAt,
            'ingredients.$.expirationAt': req.body.expirationAt
                }
            }, { new: true }).then(result => res.status(200).json(result));

        if (updatedIngredientList === null) {
            return res.status(404);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


// 사용자 추가 목록 가져오기
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const addIngredientList = await AddIngredientList.findOne({ userId: req.params.userId })
            .populate('ingredients.ingredientId');
        
        res.status(200).json(addIngredientList);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;