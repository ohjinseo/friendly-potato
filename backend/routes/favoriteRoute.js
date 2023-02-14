const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const Favorite = require("../models/Favorite");
const router = require("express").Router();

// 레시피 즐겨찾기
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const existFavorite = await Favorite.findOne({
            userId: req.userId,
            recipeId: req.body.recipeId,
        })

        if (existFavorite) {
            return res.status(400).json("이미 즐겨찾기된 레시피입니다.");
        }

        const newFavorite = new Favorite({
            recipeId: req.body.recipeId,
            userId: req.userId,
        });

        const savedFavorite = await newFavorite.save();
        res.status(201).json(savedFavorite);
    } catch (err) {
        res.status(500).json(err);
    }
})

// 유저의 즐겨찾기 가져오기
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const favorites = await Favorite.find({userId:req.userId});
        res.status(201).json(favorites);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;