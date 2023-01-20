const jwt = require("jsonwebtoken");

export const jwtMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (token && token.startsWith("Bearer")) {
        const originalToken = token.split(" ")[1];

        jwt.verify(originalToken, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403);
                throw new Error("토큰이 유효하지 않습니다.");
            }

            req.user = user;

            next();
        })
    } else {
        res.status(401);
        throw new Error("인증된 사용자가 아닙니다.");
    }
}

