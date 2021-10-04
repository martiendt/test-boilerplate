import { getTokenFromHeader, verifyToken } from "./jwt.js";
import { authConfig } from "#src/config/auth.js";
import ApiError from "#src/middleware/error-handler/api-error.js";
import { readOne } from "#src/modules/admin/service/admin.service.js";

export async function authenticate(req, res, next) {
  // check if token is exists
  const token = getTokenFromHeader(req);
  if (token === undefined || token === null) {
    return next(ApiError.unauthorized());
  }

  // check if token is valid
  const result = verifyToken(token, authConfig.secret);
  if (!result) {
    return next(ApiError.unauthorized());
  }

  // check if user is exists in database
  const user = await readOne(result.sub);
  if (!user) {
    return next(ApiError.unauthorized());
  }

  req.user = user;

  next();
}

export async function refreshToken(req, res, next) {
  // check if token is exists
  const token = getTokenFromHeader(req);
  if (token === undefined || token === null) {
    return next(ApiError.unauthorized());
  }

  // check if token is valid
  const result = verifyToken(token, authConfig.secret);
  if (!result) {
    return next(ApiError.unauthorized());
  }

  // check if user is exists in database
  const user = await readOne(result.sub);
  if (!user) {
    return next(ApiError.unauthorized());
  }

  user.accessToken = generateAccessToken({ name: user.name });

  req.user = user;

  next();
}
