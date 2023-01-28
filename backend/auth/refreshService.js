const { refreshVerify, accessVerify, generateAccessToken } = require("./jwtService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const refresh = async (req, res) => {
    if (req.headers.authorization && req.headers.refresh) {
        const accessToken = req.headers.authorization.split(" ")[1];
        const refreshToken = req.headers.refresh;

        // accessToken 검증
        const accessResult = accessVerify(accessToken);

        // refreshToken을 가져오기 위해 accessToken 디코딩하여 유저 정보를 가져옴
        const decoded = jwt.decode(accessToken);

        if (decoded === null) {
            res.status(401).json({
                ok: false,
                message: '인가된 사용자가 아닙니다.'
            })
        }

        let user = null;
        try {
            user = await User.findById(decoded.id);
        } catch (error) {
            return res.status(401).json({
                ok: false,
                message: error.message,
            })
        }

        const refreshResult = refreshVerify(refreshToken, decoded.id);

        if (accessResult.ok === false && authResult.message === "jwt expired") {
            // 1. accessToken이 만료되고, refreshToken도 만료된 경우 -> 새로 로그인
            if (refreshResult.ok === false) {
                return res.status(refreshResult.code).json({
                    ok: false,
                    message: refreshResult.message
                });
            }
            
            
            // 2.accessToken이 만료되고, refreshToken은 만료되지 않은 경우 -> 새로운 accessToken 발급
            else {
                const newAccessToken = generateAccessToken(user);

                return res.status(200).json({
                    ok: true,
                    data: {
                        accessToken: newAccessToken,
                        refreshToken
                    }
                })
            }
        }
        // 3. accessToken이 만료되지 않은 경우
        else {
            res.status(400).json({
                ok: false,
            });
        }
    }
}

module.exports = refresh;