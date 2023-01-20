const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (token && token.startsWith("Bearer")) {
        const originalToken = token.split(" ")[1];

        jwt.verify(originalToken, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403).json("토큰이 유효하지 않습니다.");
                throw new Error("토큰이 유효하지 않습니다.");
            }

            req.user = user;

            next();
        })
    } else {
        res.status(401).json("인증된 사용자가 아닙니다.");
        throw new Error("인증된 사용자가 아닙니다.");
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("관리자만 허용 가능합니다.");
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin
};
