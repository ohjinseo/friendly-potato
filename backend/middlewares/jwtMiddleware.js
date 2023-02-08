const { accessVerify } = require("../auth/jwtService");

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    console.log(token, "token");

    if (token && token.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        const result = accessVerify(token);

        if (result.ok) {
            req.userId = result.id;
            req.isAdmin = result.isAdmin;
            next();
        } else {
            // [Forbidden] 토큰이 있음을 이해했지만, 권한이 없어 요청을 거부한 것이므로 403
            res.status(403).json({
                message: result.message,
            })
        }
    } else {
        // [Unauthorized] 필요한 인증 정보가 없어 요청을 거부한 것이므로 401
        res.status(401).json("인증된 사용자가 아닙니다.");
        throw new Error("인증된 사용자가 아닙니다.");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.userId === req.params.id || req.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: "인증된 사용자가 아닙니다."
            })
        }
    })
}

// 관리자만 인가
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.isAdmin){
            next();
        }else{
            res.status(403).json("관리자만 허용 가능합니다.");
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
