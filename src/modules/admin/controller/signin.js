import { constants } from "http2";
import { authConfig } from "#src/config/auth.js";
import { signNewToken, generateRefreshToken, tokenType } from "#src/middleware/auth/jwt.js";
import { authenticate } from "#src/middleware/auth/local.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default async (req, res, next) => {
  try {
    const user = await authenticate(req.body.username, req.body.password);

    if (user === undefined || !user) {
      return next(ApiError.unauthorized());
    }

    const accessToken = signNewToken(user._id, authConfig.secret);
    const refreshToken = generateRefreshToken(user._id, authConfig.secret);

    res.status(constants.HTTP_STATUS_OK).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tokenType: tokenType,
      accessToken: accessToken,
      expiresIn: "",
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
