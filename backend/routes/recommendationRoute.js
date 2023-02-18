const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const router = require("express").Router();
const redisClient = require("../config/redis");
const Visit = require("../models/Visit");
const Favorite = require("../models/Favorite");
const Like = require("../models/Like");

const publisher = redisClient;
const subscriber = redisClient;

router.get("/:userId", async (req, res) => {
    const recipeId = req.query.recipeId;

    try {
        const visits = await Visit.aggregate([
            {
              $group: {
                _id: {
                  userId: '$userId',
                  recipeId: '$recipeId'
                },
                timeSpent: { $sum: '$timeSpent' }
              }
            },
            {
              $project: {
                _id: 0,
                userId: '$_id.userId',
                recipeId: '$_id.recipeId',
                timeSpent: 1
              }
            }
          ]);
        const favorites = await Favorite.find({});
        const likes = await Like.find({});

        const data = {
            recipeId,
            visits,
            favorites,
            likes
        };

        publisher.publish("recommendation_request", JSON.stringify(data));

        subscriber.subscribe("recommendation_response");
        
        subscriber.on('message', (channel, message) => {
            if (channel === 'recommendation_response') {
                const recommendations = JSON.parse(message);
                console.log(recommendations);
                res.status(200).json(recommendations);
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;