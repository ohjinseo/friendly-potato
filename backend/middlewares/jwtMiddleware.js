const { verify } = require("../auth/auth-jwt");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        const result = verify(token);

        if (result.ok) {
            req.user.id = result.id;
            req.user.isAdmin = result.isAdmin;
            next();
        } else {
            res.status(401).json({
                message: result.message,
            })
        }
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
    verifyTokenAndAdmin,
};
