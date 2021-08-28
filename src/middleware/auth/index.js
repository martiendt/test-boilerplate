import passport from "passport";
import ApiError from "#src/utils/api-error.js";
import { signNewToken } from "#src/modules/admin/admin.model.js";

export const authAdminLocal = async function (req, res, next) {
  try {
    await passport.authenticate("admin-local", function (err, user) {
      if (err) return next(err);
      if (!user) return next(ApiError.unauthorized());
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
    throw new Error(error);
  }
};

export const authAdminJwt = async function (req, res, next) {
  try {
    await passport.authenticate("admin-jwt", function (err, user, info) {
      if (err) return next(err);
      if (user === undefined || !user) return next(ApiError.unauthorized());
      console.log(user === undefined);
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
    throw new Error(error);
  }
};
