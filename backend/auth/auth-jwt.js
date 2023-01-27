const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const secret = process.env.JWT_SEC;

module.exports = {
    // access token 발급
    sign: (user) => {
        const payload = {
            id: user._id,
            isAdmin: user.isAdmin,
        };

        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
    },

    // access token 검증
    verify: (token) => {
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
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn:'14d',
        })
    },

    // refresh token 검증
    refreshVerify: async (token, userId) => {
        const getAsync = promisify(redisClient.get).bind(redisClient);

        try {
            // userId key값을 이용해 refresh token을 가져옴
            const data = await getAsync(userId);

            if (token === data) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (error) {
                    return false;
                }
            }

            else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}