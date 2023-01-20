const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middlewares/jwtMiddleware");
const Ingredient = require("../models/Ingredient");

// create (관리자만 접근 가능)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newIngredient = new Ingredient(req.body);

    try {
        const savedIngredient = await newIngredient.save();
        res.status(200).json(savedIngredient);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedIngredient);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Ingredient.findByIdAndDelete(req.params.id);
      res.status(200).json("식재료 삭제 성공");
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// 카테고리 별로 가져오기
router.get("/", async (req, res) => {
    const category = req.query.category;

    try {
        const ingredients = await Ingredient.find({ category });

        if (ingredients.length === 0) {
            return res.status(404).json("카테고리 찾을 수 없음");
        }

        res.status(200).json(ingredients);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;