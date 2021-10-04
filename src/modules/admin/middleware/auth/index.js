import jwt from "jsonwebtoken";
import passport from "passport";
import { update as updateAdmin } from "../../service/admin.service.js";
import ApiError from "#src/middleware/error-handler/api-error.js";
import "./passport.js";

export async function authAdminJwt(req, res, next) {
  try {
    await passport.authenticate("admin-jwt", async (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (user === undefined || !user) {
        return next(ApiError.unauthorized());
      }

      // update last online and user ip
      await updateAdmin(user._id, {
        lastOnline: new Date(),
        lastIp: req.ip,
      });

      // inject user into request
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
}
