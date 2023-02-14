const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const secret = process.env.JWT_SEC;

module.exports = {
    // access token 발급
    generateAccessToken: (user) => {
        const payload = {
            id: user._id,
            isAdmin: user.isAdmin,
        };

        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
    },

    // access token 검증
    accessVerify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                ok: true,
                id: decoded.id,
                isAdmin: decoded.isAdmin,
            };
        } catch (error) {
            return {
                ok: false,
                message: error.message,
            }
        }
    },

    // refresh token 발급
    generatorRefreshToken: () => {
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn:'14d',
        })
    },

    // refresh token 검증
    refreshVerify: async (refreshToken, userId) => {
        const getAsyncRedis = promisify(redisClient.get).bind(redisClient);

        try {
            // userId key값을 이용해 refresh token을 가져옴
            const data = await getAsyncRedis(userId);

            // refreshToken과 DB에 저장된 refreshToken 비교
            if (refreshToken === data) {
                try {
                    jwt.verify(refreshToken, secret);
                    return {
                        ok: true
                    };
                } catch (error) {
                    return {
                        ok: false,
                        code: 403,
                        message: error.message
                    }
                }
            }

            else {
                return {
                    ok: false,
                    code: 401,
                    message: '인가된 사용자가 아닙니다.'
                };
            }
        } catch (error) {
            return {
                ok: false,
                code: 500,
                message: error.message
            }
        }
    }
}