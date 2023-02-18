const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const Like = require("../models/Like");
const router = require("express").Router();

// 레시피 좋아요
router.post("/:userId", async (req, res) => {
    try {
        const existLike = await Like.findOne({
            userId: req.params.userId,
            recipeId: req.body.recipeId,
        })

        if (existLike) {
            return res.status(400).json("이미 좋아요된 레시피입니다.");
        }

        const newLike = new Like({
            recipeId: req.body.recipeId,
            userId: req.params.userId,
        });

        const savedLike = await newLike.save();
        res.status(201).json(savedLike);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 레시피 좋아요 취소
router.delete('/:userId', async (req, res) => {
    try {
        const existLike = await Like.findOneAndDelete({
            userId: req.params.userId,
            recipeId: req.query.recipeId
        });
    
        if (!existLike) {
          return res.status(400).json({ message: '좋아요가 없습니다.' });
        }
    
        return res.status(200).json({ message: '레시피 좋아요가 취소되었습니다.' });
      } catch (error) {
        return res.status(500).json({ message: '서버 오류입니다.' });
      }
})


module.exports = router;