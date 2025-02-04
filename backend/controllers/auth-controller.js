const OtpService = require("../services/otp-service");
const HashService = require("../services/hash-service");
const UserService = require("../services/user-service");
const TokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
    async sendOtp(req, res) {
        try {
            const { phone } = req.body;
            if (!phone) {
                return res.status(400).json({ success: false, message: "Phone field is required" });
            }

            // Generate OTP
            const otp = await OtpService.generateOtp();
            const ttl = 1000 * 60 * 2; // 2 minutes expiry
            const expires = Date.now() + ttl;
            const data = `${phone}.${otp}.${expires}`;
            const hash = HashService.hashOtp(data);

            // Send OTP (Uncomment if needed)
            // await OtpService.sendBySms(phone, otp);

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                data: { hash: `${hash}.${expires}`, phone, otp },
            });
        } catch (error) {
            console.error("Error in sendOtp:", error);
            return res.status(500).json({ success: false, message: "Failed to send OTP" });
        }
    }

    async verifyOtp(req, res) {
        try {
            const { otp, hash, phone } = req.body;
            if (!otp || !hash || !phone) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const [hashedOtp, expires] = hash.split(".");
            if (Date.now() > Number(expires)) {
                return res.status(400).json({ success: false, message: "OTP expired" });
            }

            if (!OtpService.verifyOtp(hashedOtp, `${phone}.${otp}.${expires}`)) {
                return res.status(400).json({ success: false, message: "Invalid OTP" });
            }

            // Check if user exists, otherwise create
            let user = await UserService.findUser({ phone });
            if (!user) user = await UserService.createUser({ phone });

            // Generate Tokens
            const { accessToken, refreshToken } = TokenService.generateTokens({ _id: user._id, activated: false });
            await TokenService.storeRefreshToken(refreshToken, user._id);

            // Set cookies
            res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });

            return res.status(200).json({
                success: true,
                message: "OTP verified successfully",
                data: { user: new UserDto(user), auth: true },
            });
        } catch (error) {
            console.error("Error in verifyOtp:", error);
            return res.status(500).json({ success: false, message: "OTP verification failed" });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken: refreshTokenFromCookie } = req.cookies;
            if (!refreshTokenFromCookie) {
                return res.status(401).json({ success: false, message: "No refresh token provided" });
            }

            const userData = await TokenService.verifyRefreshToken(refreshTokenFromCookie);
            if (!userData) {
                return res.status(401).json({ success: false, message: "Invalid refresh token" });
            }

            const tokenExists = await TokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if (!tokenExists) {
                return res.status(401).json({ success: false, message: "Refresh token not found in database" });
            }

            const user = await UserService.findUser({ _id: userData._id });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Generate new tokens
            const { refreshToken, accessToken } = TokenService.generateTokens({ _id: userData._id });
            await TokenService.updateRefreshToken(userData._id, refreshToken);

            // Update cookies
            res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });

            return res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                data: { user: new UserDto(user), auth: true },
            });
        } catch (error) {
            console.error("Error in refresh:", error);
            return res.status(500).json({ success: false, message: "Failed to refresh token" });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(400).json({ success: false, message: "No refresh token found" });
            }

            await TokenService.removeToken(refreshToken);
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");

            return res.status(200).json({
                success: true,
                message: "Logged out successfully",
                data: { user: null, auth: false },
            });
        } catch (error) {
            console.error("Error in logout:", error);
            return res.status(500).json({ success: false, message: "Failed to log out" });
        }
    }
}

module.exports = new AuthController();
