import passport from "passport";
import { signNewToken } from "./helper.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export function authAdminLocal() {
  return async function (req, res, next) {
    try {
      if (req.body.username === undefined || req.body.password === undefined) {
        return next(ApiError.unprocessableEntity());
      }

      await passport.authenticate("admin-local", function (error, user) {
        if (error) {
          return next(error);
        }
        if (user === undefined || !user) {
          return next(ApiError.unauthorized());
        }

        req.user = {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: signNewToken(user._id),
        };

        next();
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function authAdminJwt() {
  return async function (req, res, next) {
    try {
      await passport.authenticate("admin-jwt", function (error, user, info) {
        if (error) {
          return next(error);
        }
        if (user === undefined || !user) {
          return next(ApiError.unauthorized());
        }

        req.user = {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        next();
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
