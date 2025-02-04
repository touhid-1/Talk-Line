const TokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            console.log('No access Token in Cookies')
            throw new Error();
        }
        const userData = await TokenService.verifyAccessToken(accessToken);

        if (!userData) {
            console.log('No user Data')
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}