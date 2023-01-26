const { getIngredientInfo, getAPI } = require("../crawler/recipeApi");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const title = req.query.title;
    const page = req.query.page;

    try {
        let arr = [];

        const data = await getAPI(title, parseInt(page));

        for (let i = 0; i < data.length; i++) {
            arr.push({
                recipe: data[i],
            });
        }

        res.status(200).json(arr);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/ingredients", async (req, res) => {
    const recipeId = req.query.id;

    try {
        const ingredients = await getIngredientInfo(recipeId);
        res.status(200).json(ingredients);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;