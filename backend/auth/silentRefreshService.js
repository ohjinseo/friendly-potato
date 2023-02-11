const User = require("../models/User");
const { generateAccessToken, refreshVerify } = require("./jwtService");

const silentRefreshService = async (req, res) => {

    if (req.cookies.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        const userId = req.params.id;
        
        let refreshResult;
        refreshVerify(refreshToken, userId).then(res => refreshResult = res.ok);
        
        let user = null;
        
        try {
            user = await User.findById( userId );
        } catch (error) {
            return res.status(401).json({
                ok: false,
                message: error.message,
            })
        }
        
        const newAccessToken = generateAccessToken(user);
        
        
        if (refreshResult) {
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken
                
            });
        } else {
            res.status(401).json({
                ok: false,
            });
        }
    }
}

module.exports = silentRefreshService;