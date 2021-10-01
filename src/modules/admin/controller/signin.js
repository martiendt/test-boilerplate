import { constants } from "http2";
import { signNewToken } from "../middleware/auth/helper.js";
import { authenticate } from "../middleware/auth/local.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default async (req, res, next) => {
  try {
    if (req.body.username === undefined || req.body.password === undefined) {
      return next(ApiError.unprocessableEntity());
    }

    const user = await authenticate(req.body.username, req.body.password);

    if (user === undefined || !user) {
      return next(ApiError.unauthorized());
    }

    res.status(constants.HTTP_STATUS_OK).json({
      data: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: signNewToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};
