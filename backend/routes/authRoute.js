const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/*
    legacy architecture
*/

// register
router.post("/register", async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save();
        res.status(200).json(newUser);
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

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;