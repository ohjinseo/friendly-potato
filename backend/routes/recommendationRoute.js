const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const router = require("express").Router();
const redisClient = require("../config/redis");
const Visit = require("../models/Visit");
const Favorite = require("../models/Favorite");

const publisher = redisClient;
const subscriber = redisClient;

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const visits = await Visit.find({});
        const favorites = await Favorite.find({});

        const data = {
            userId:req.userId,
            visits,
            favorites
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