import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { readOne as readOneAdmin } from "../../service/admin.service.js";
import { authAdminConfig } from "#src/config/auth.js";

/**
 * Authenticate using passport jwt strategy
 */
passport.use(
  "admin-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authAdminConfig.secret,
    },
    async (payload, done) => {
      try {
        // payload.sub is admin_id from jwt token
        let admin = await readOneAdmin(payload.sub);

        done(null, Object.keys(admin).length > 0 ? admin : false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
