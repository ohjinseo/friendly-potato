const { verifyTokenAndAuthorization } = require("../middlewares/jwtMiddleware");
const router = require("express").Router();
const redisClient = require("../config/redis");

const publisher = redisClient;
const subscriber = redisClient;

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    publisher.publish("recommendation_request", JSON.stringify(req.body));
})

module.exports = router;