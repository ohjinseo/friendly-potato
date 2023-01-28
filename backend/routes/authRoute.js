const router = require("express").Router();
const refreshService = require("../auth/refreshService");
const jwtService = require("../auth/jwtService");
const redisClient = require("../config/redis");
const User = require("../models/User");
const { verifyToken } = require("../middlewares/jwtMiddleware");

/*
    legacy architecture
*/

// register
router.post("/register", async (req, res) => {
    const newUser = new User(req.body);

    try {
        const user = await newUser.save();

        const accessToken = jwtService.generateAccessToken(user);

        res.status(200).json({accessToken});
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        (!user || !user.isPasswordMatch(password)) &&
            res.status(401).json("이메일과 비밀번호를 다시 확인해주세요.");

        const accessToken = jwtService.generateAccessToken(user);
        const refreshToken = jwtService.generatorRefreshToken();

        /* 
        key : userId, value : refreshToken
        */
    
        redisClient.set(user._id.toString(), refreshToken);

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// accessToken을 재발급 받기 위한 router
router.get("/refresh", refreshService);

// 로그아웃
router.post("/logout", verifyToken, (req, res) => {
    redisClient.del(req.userId);
    res.status(200).json("로그아웃 성공");
})



module.exports = router;